from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.conf import settings
from openai import OpenAI

from .models import (
    Course, Branch, AdmissionDetail, Fee,
    HostelFacility, Facility, Scholarship, Curriculum,
    Placement, FAQ, Alumni, Contact
)
from .serializers import (
    CourseSerializer, BranchSerializer, AdmissionDetailSerializer, FeeSerializer,
    HostelFacilitySerializer, FacilitySerializer, ScholarshipSerializer, CurriculumSerializer,
    PlacementSerializer, FAQSerializer, AlumniSerializer, ContactSerializer
)

# Initialize OpenAI client once
t_client = OpenAI(api_key=settings.OPENAI_API_KEY)

class ChatbotAPIView(APIView):
    """
    1. Queries DB for keywords, returns precise bulleted answers without markdown bold.
    2. Falls back to OpenAI if no DB results.
    """

    def post(self, request):
        user_message = request.data.get("message", "").strip().lower()
        if not user_message:
            return Response(
                {"error": "Message is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Override for Contact Information
        contact_keywords = ["contact", "address", "email", "phone", "hours"]
        if any(kw in user_message for kw in contact_keywords):
            contact_info = (
                "Contact Information\n"
                "Address: Makhupura, Nasirabad Road, Ajmer - 305001, Rajasthan, India\n"
                "Phone: +0145-2695195\n"
                "Email: gpc.ajmer@rajasthan.gov.in\n"
                "Hours: Mon – Fri: 9:00 AM – 5:00 PM"
            )
            return Response({"response": contact_info}, status=status.HTTP_200_OK)

        # Helper functions and branch data
        branches = list(Branch.objects.all())
        branch_names = [b.name.lower() for b in branches]

        def extract_branches(msg):
            return [b.name for b in branches if b.name.lower() in msg]

        # DB query configurations
        models_config = [
            {
                "keywords": ["course", "program", "degree", "study"],
                "queryset": Course.objects.all(),
                "serializer": CourseSerializer,
                "template": lambda data: (
                    "Courses Offered:\n" +
                    "\n".join(
                        f"- {i['name']} ({i['degree_type']}): {i['duration_years']} years"
                        for i in data
                    )
                ),
            },
            {
                "keywords": ["branch", "department", "specialization"],
                "queryset": Branch.objects.all(),
                "serializer": BranchSerializer,
                "template": lambda data: (
                    "Branches Available:\n" +
                    "\n".join(f"- {i['name']}" for i in data)
                ),
            },
            {
                "keywords": ["admission", "apply", "process"],
                "queryset": AdmissionDetail.objects.select_related("branch"),
                "serializer": AdmissionDetailSerializer,
                "template": lambda data: (
                    "Admission Processes:\n" +
                    "\n".join(f"- {i['branch']['name']}: {i['process']}" for i in data)
                ),
            },
            {
                "keywords": ["fee", "fees", "tuition", "cost"],
                "queryset": Fee.objects.select_related("branch"),
                "serializer": FeeSerializer,
                "query_proc": lambda msg: (
                    Fee.objects.select_related("branch").filter(
                        branch__name__in=extract_branches(msg)
                    ) if any(b in msg for b in branch_names)
                    else Fee.objects.select_related("branch").all()
                ),
                "template": lambda data: (
                    "Fee Structure:\n" +
                    "\n".join(f"- {i['branch']['name']}: ₹{i['tuition_fee']}/year" for i in data)
                ),
            },
            {
                "keywords": ["hostel", "accommodation", "stay"],
                "queryset": HostelFacility.objects.all(),
                "serializer": HostelFacilitySerializer,
                "template": lambda data: (
                    "Hostel Facilities:\n" +
                    "\n".join(f"- {i['description']}" for i in data)
                ),
            },
            {
                "keywords": ["facility", "lab", "library", "sports"],
                "queryset": Facility.objects.all(),
                "serializer": FacilitySerializer,
                "template": lambda data: (
                    "Facilities:\n" +
                    "\n".join(f"- {i['name']}: {i['description']}" for i in data)
                ),
            },
            {
                "keywords": ["scholarship", "financial aid"],
                "queryset": Scholarship.objects.all(),
                "serializer": ScholarshipSerializer,
                "template": lambda data: (
                    "Scholarships:\n" +
                    "\n".join(f"- {i['name']}: {i['description']}" for i in data)
                ),
            },
            {
                "keywords": ["placement", "job", "recruitment"],
                "queryset": Placement.objects.order_by("-year"),
                "serializer": PlacementSerializer,
                "template": lambda data: (
                    "Placement Records:\n" +
                    "\n".join(
                        f"- {i['year']}: Avg {i['average_package']} LPA, "
                        f"Highest {i['highest_package']} LPA"
                        for i in data
                    )
                ),
            },
            {
                "keywords": ["faq", "question", "answer"],
                "queryset": FAQ.objects.all(),
                "serializer": FAQSerializer,
                "template": lambda data: (
                    "The FAQ section covers a wide range of common queries and responses. "
                    "For detailed information, please visit our FAQ page on the website."
                ),
            },
            {
                "keywords": ["curriculum", "syllabus", "subjects"],
                "queryset": Curriculum.objects.select_related("branch"),
                "serializer": CurriculumSerializer,
                "template": lambda data: (
                    "Curriculum details are comprehensive and extensive. "
                    "Please refer to the Curriculum section on our website for full information."
                ),
            },
            {
                "keywords": ["alumni", "graduate", "past student"],
                "queryset": Alumni.objects.all(),
                "serializer": AlumniSerializer,
                "template": lambda data: (
                    "Alumni Profiles:\n" +
                    "\n".join(
                        f"- {i['name']}: {i.get('batch', '')}, {i.get('current_position', '')}" for i in data
                    )
                ),
            },
        ]

        # Search DB first
        response_sections = []
        for cfg in models_config:
            if not any(kw in user_message for kw in cfg["keywords"]):
                continue
            qs = cfg.get("query_proc", lambda _: cfg["queryset"])(user_message)
            if getattr(qs, "exists", lambda: bool(qs))():
                data = cfg["serializer"](qs, many=True).data
                response_sections.append(cfg["template"](data))

        if response_sections:
            return Response(
                {"response": "\n\n".join(response_sections)},
                status=status.HTTP_200_OK
            )

        # Fallback to OpenAI
        try:
            ai_resp = t_client.responses.create(
                model="gpt-4o",
                instructions=(
                    "You are a concise assistant for Government Polytechnic College, Ajmer. "
                    "No paragraphs, no markdown, just plain text. Keep it clear and simple. "
                    "If no data is found, use general knowledge briefly."
                ),
                input=user_message,
                timeout=20,
            )
            return Response(
                {"response": ai_resp.output_text},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": f"Error processing your request: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

#viewsets
class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer

class AdmissionDetailViewSet(viewsets.ModelViewSet):
    queryset = AdmissionDetail.objects.select_related('branch').all()
    serializer_class = AdmissionDetailSerializer

class FeeViewSet(viewsets.ModelViewSet):
    queryset = Fee.objects.select_related('branch').all()
    serializer_class = FeeSerializer

class HostelFacilityViewSet(viewsets.ModelViewSet):
    queryset = HostelFacility.objects.all()
    serializer_class = HostelFacilitySerializer

class FacilityViewSet(viewsets.ModelViewSet):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer

class ScholarshipViewSet(viewsets.ModelViewSet):
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer

class CurriculumViewSet(viewsets.ModelViewSet):
    queryset = Curriculum.objects.select_related('branch').all()
    serializer_class = CurriculumSerializer

class PlacementViewSet(viewsets.ModelViewSet):
    queryset = Placement.objects.all()
    serializer_class = PlacementSerializer

class FAQViewSet(viewsets.ModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

class AlumniViewSet(viewsets.ModelViewSet):
    queryset = Alumni.objects.all()
    serializer_class = AlumniSerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
