from rest_framework import serializers
from .models import Appointment

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = [
            "status",
            "appointment_id",
            "service_id",
            "user_id",
            "payment_ref",
            "start",
            "end",

            # Derived Attributes
            "is_reviewed",
            "service_name"
        ]