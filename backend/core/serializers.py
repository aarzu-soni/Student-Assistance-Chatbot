from rest_framework import serializers
from .models import (
    Course, Branch, AdmissionDetail, Fee,
    HostelFacility, Facility, Scholarship, Curriculum,
    Placement, FAQ, Alumni, Contact
)


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = "__all__"


class AdmissionDetailSerializer(serializers.ModelSerializer):
    branch = BranchSerializer()

    class Meta:
        model = AdmissionDetail
        fields = "__all__"


class FeeSerializer(serializers.ModelSerializer):
    branch = BranchSerializer()

    class Meta:
        model = Fee
        fields = "__all__"


class HostelFacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = HostelFacility
        fields = "__all__"


class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = "__all__"


class ScholarshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scholarship
        fields = "__all__"


class CurriculumSerializer(serializers.ModelSerializer):
    branch = BranchSerializer()

    class Meta:
        model = Curriculum
        fields = "__all__"


class PlacementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Placement
        fields = "__all__"


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = "__all__"


class AlumniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumni
        fields = "__all__"


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"
