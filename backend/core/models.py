from django.db import models


class Course(models.Model):
    name = models.CharField(max_length=255)
    duration_years = models.IntegerField()
    degree_type = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Branch(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='branches'
    )
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name} - {self.course.name}"


class AdmissionDetail(models.Model):
    branch = models.ForeignKey(
        Branch,
        on_delete=models.CASCADE,
        related_name='admissions'
    )
    process = models.TextField()
    eligibility = models.TextField()

    def __str__(self):
        return f"Admission - {self.branch.name}"


class Fee(models.Model):
    branch = models.ForeignKey(
        Branch,
        on_delete=models.CASCADE,
        related_name='fees'
    )
    tuition_fee = models.DecimalField(max_digits=10, decimal_places=2)
    hostel_fee = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True
    )
    other_fees = models.TextField(blank=True)

    def __str__(self):
        return f"Fee - {self.branch.name}"


class HostelFacility(models.Model):
    accommodation_type = models.CharField(max_length=100)
    amenities = models.TextField()
    description = models.TextField()

    def __str__(self):
        return "Hostel Facility"


class Facility(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name


class Scholarship(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    eligibility = models.TextField()
    amount = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Curriculum(models.Model):
    branch = models.ForeignKey(
        Branch,
        on_delete=models.CASCADE,
        related_name='curriculum'
    )
    semester = models.IntegerField()
    subjects = models.TextField()

    def __str__(self):
        return f"Curriculum - {self.branch.name} - Sem {self.semester}"


class Placement(models.Model):
    year = models.IntegerField()
    average_package = models.DecimalField(max_digits=10, decimal_places=2)
    highest_package = models.DecimalField(max_digits=10, decimal_places=2)
    top_recruiters = models.TextField()

    def __str__(self):
        return f"Placement {self.year}"


class FAQ(models.Model):
    question = models.TextField()
    answer = models.TextField()

    def __str__(self):
        return "FAQ"


class Alumni(models.Model):
    name = models.CharField(max_length=255)
    batch = models.CharField(max_length=50)
    current_position = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    notable_achievement = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Contact from {self.name} on {self.submitted_at}"
