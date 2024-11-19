from django.db import models

from users.models import User

# Create your models here.
class Appointment(models.Model):
    appointment_id = models.AutoField(primary_key=True)

    user_id = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)  # Appointment is available if no user is associated
    start = models.DateTimeField()
    end = models.DateTimeField()

    def __str__(self):
        if self.user_id is not None:
            return self.user_id.name
        else:
            return "Available"