from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from django.db import connection

from .models import GiftCard
from .serializers import GiftCardSerializer

from .database_engine_compatibility import executeQuery

# Create your views here.
class CheckCode(APIView):
    def post(self, request):
        code = request.data.get("code", False)

        if code:
            value = 0

            response = executeQuery(f"SELECT remaining_value FROM giftcard_giftcard WHERE card_code = '{code}';")
            
            if len(response) > 0:
                value = response[0][0]
            
            return Response({"found": value != 0, "value": value}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No code provided"}, status=status.HTTP_400_BAD_REQUEST)