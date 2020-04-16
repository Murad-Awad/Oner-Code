from django.shortcuts import render
from .models import ClothingListings
from .models import Clothing
from django.contrib.auth.models import User
from .serializers import ClothingSerializer
from rest_framework import generics
# Create your views here.

class ClothingListCreate(generics.ListCreateAPIView):
	queryset = Clothing.objects.all()
	serializer_class = ClothingSerializer 
