from rest_framework import generics # Perform generic operations on models (like get, set, delete, etc.)
from .models import Service
from .serializers import ServiceSerializer

class ServiceList(generics.ListCreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class ServiceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer