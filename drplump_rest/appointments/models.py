from django.db import models
from django.apps import apps

from users.models import User
from restmain.models import Service

# Create your models here.
class Appointment(models.Model):
    appointment_id = models.AutoField(primary_key=True)
    status = models.CharField(null=False, choices={
        "CONFIRMED": "CONFIRMED",
        "RESERVED": "RESERVED",
        "AVAILABLE": "AVAILABLE"
    }, default="AVAILABLE")

    user_id = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    service_id = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True, blank=True)

    # PaymentRef links to the 'legacy system'
    payment_ref = models.CharField(max_length=50, null=True)

    start = models.DateTimeField()
    end = models.DateTimeField()

    # Derived values used on client
    def is_reviewed(self):
        exists = apps.get_model("reviews.Review").objects.filter(appointment_id=self.appointment_id).exists()
        return exists
    
    def service_name(self):
        return str(self.service_id)

    def __str__(self):
        if self.user_id is not None:
            return self.user_id.name
        else:
            return "Available"