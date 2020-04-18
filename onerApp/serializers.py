from rest_framework import serializers
from .models import ClothingListings
from .models import Clothing
from django.contrib.auth.models import User

class ClothingListingsSerializer(serializers.ModelSerializer):
	class Meta:
		model = ClothingListings
		fields = ('listings')

class ClothingSerializer(serializers.ModelSerializer):
	class Meta:
		model = Clothing
		fields = ('id', 'name', 'price', 'quantity', 'listed', 'image', 'image_url', 'platformsListed')