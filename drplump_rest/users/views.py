from rest_framework import generics, status # Perform generic operations on models (like get, set, delete, etc.)
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer

# Create your views here.
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserRegiser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        # No further validation needed ;) [email and id already checked]
        serializer.save()

class UserLogin(APIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request):
        
        if User.objects.filter(
            email=request.data.get("email"),
            password_hash=request.data.get("password_hash")):
            
            return Response({"message": "login sucessful"}, status=status.HTTP_200_OK)
        
        else:
            return Response({"message": "no such username and password"}, status=status.HTTP_401_UNAUTHORIZED)