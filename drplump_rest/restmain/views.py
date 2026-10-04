from rest_framework import generics # Perform generic operations on models (like get, set, delete, etc.)
from .models import Service
from .serializers import ServiceSerializer

class ServiceList(generics.ListCreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    def filter_queryset(self, request):
        queryset = self.get_queryset()
        
        if (self.request.query_params.get("exclusive", "false") == "false"):
            queryset = queryset.filter(exclusive=False)
        
        return queryset

class ServiceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer