from rest_framework import generics # Perform generic operations on models (like get, set, delete, etc.)

from .models import Appointment
from .serializers import AppointmentSerializer

# Create your views here.
class AppointmentList(generics.ListCreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class AppointmentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def perform_update(self, serializer):
        # TODO Complete Update Method
        print("Updating model")