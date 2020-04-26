from .models import Clothing
from rest_framework import viewsets, permissions
from .serializers import ClothingSerializer
from bs4 import BeautifulSoup, Comment, NavigableString
import requests
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError, ParseError
import logging
import json
from .poshmarkAPI import searchForClothesPoshmark
from .stockXAPI import searchForClothesStockX

#Clothing Viewset
class ClothingViewSet(viewsets.ModelViewSet):
	queryset = Clothing.objects.all()
	permission_classes = [
		permissions.AllowAny
	]
	serializer_class = ClothingSerializer

@api_view(['GET'])
def searchForClothes(request):
	try:
		query = request.GET.get('q', '')
		searchResultsObject = {"data": {}}
		searchResultsObject["data"]["stockX"] = searchForClothesStockX(query)
		searchResultsObject["data"]["poshmark"] = searchForClothesPoshmark(query)
		return JsonResponse(searchResultsObject)
	except ValueError:
		raise ParseError





