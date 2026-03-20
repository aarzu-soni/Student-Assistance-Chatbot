from django.contrib import admin
from .models import (
    Course,
    Branch,
    AdmissionDetail,
    Fee,
    HostelFacility,
    Facility,
    Scholarship,
    Curriculum,
    Placement,
    FAQ,
    Alumni,
    Contact,
)

# Register your models here
admin.site.register(Course)
admin.site.register(Branch)
admin.site.register(AdmissionDetail)
admin.site.register(Fee)
admin.site.register(HostelFacility)
admin.site.register(Facility)
admin.site.register(Scholarship)
admin.site.register(Curriculum)
admin.site.register(Placement)
admin.site.register(FAQ)
admin.site.register(Alumni)
admin.site.register(Contact)
