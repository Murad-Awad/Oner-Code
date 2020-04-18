from .models import Clothing
from rest_framework import viewsets, permissions
from .serializers import ClothingSerializer

#Clothing Viewset
class ClothingViewSet(viewsets.ModelViewSet):
	queryset = Clothing.objects.all()
	permission_classes = [
		permissions.AllowAny
	]
	serializer_class = ClothingSerializer