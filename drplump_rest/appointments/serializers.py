from rest_framework import serializers
from .models import Appointment

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = [
            "status",
            "appointment_id",
            "user_id",
            "start",
            "end",

            # Derived Attributes
            "is_reviewed",
            "service_name"
        ]