from rest_framework import generics, status # Perform generic operations on models (like get, set, delete, etc.)
from rest_framework.exceptions import APIException
from rest_framework.response import Response

import requests
from .models import Review
from .serializers import ReviewSerializer

# Create your views here.
class ReviewList(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def filter_queryset(self, request):
        queryset = self.get_queryset()
        
        if (self.request.query_params.get("filter_reviews", "true") == "true"):
            queryset = queryset.filter(rating__gt=3)
        
        return queryset

class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def perform_update(self, serializer):
        # TODO: Validation of review data
        serializer.save()