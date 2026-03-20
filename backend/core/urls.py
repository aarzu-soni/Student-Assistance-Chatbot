from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    ChatbotAPIView,
    CourseViewSet,
    BranchViewSet,
    AdmissionDetailViewSet,
    FeeViewSet,
    HostelFacilityViewSet,
    FacilityViewSet,
    ScholarshipViewSet,
    CurriculumViewSet,
    PlacementViewSet,
    FAQViewSet,
    AlumniViewSet,
    ContactViewSet,
)

router = DefaultRouter()
router.register(r"courses", CourseViewSet)
router.register(r"branches", BranchViewSet)
router.register(r"admission-details", AdmissionDetailViewSet)
router.register(r"fees", FeeViewSet)
router.register(r"hostel-facilities", HostelFacilityViewSet)
router.register(r"facilities", FacilityViewSet)
router.register(r"scholarships", ScholarshipViewSet)
router.register(r"curriculums", CurriculumViewSet)
router.register(r"placements", PlacementViewSet)
router.register(r"faqs", FAQViewSet)
router.register(r"alumni", AlumniViewSet)
router.register(r"contacts", ContactViewSet)

urlpatterns = [
    path("api/chatbot/", ChatbotAPIView.as_view()),
    path("api/", include(router.urls)),
]
