from django.db import models

from appointments.models import Appointment
from restmain.models import Service

# Create your models here.
class Review(models.Model):
    review_id = models.AutoField(primary_key=True)

    appointment_id = models.ForeignKey(Appointment, models.CASCADE)
    rating = models.IntegerField()
    title = models.TextField(max_length=100)
    content = models.TextField(max_length=2000)
    date = models.DateField()

    def treatment_type(self):
        if self.appointment_id.service_id is None:
            return "Unspecified Treatment"
        return str(self.appointment_id.service_id)
    
    def user_name(self):
        return str(self.appointment_id.user_id)
    
    def __str__(self):
        return self.title