from rest_framework import generics, status # Perform generic operations on models (like get, set, delete, etc.)
from rest_framework.exceptions import APIException

import requests
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
        if (self.request.query_params.get("token")):
            response = requests.post("http://mrpayment.limeparallelogram.uk/api/process", json={"token": self.request.query_params.get("token"), "amount": 10})
            print(response.json())

            if (response.status_code == 200):
                serializer.save()
            else:
                raise APIException({"message": "Invalid payment token provided"}, code=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            raise APIException({"message": "No payment token provided"}, status=status.HTTP_402_PAYMENT_REQUIRED)