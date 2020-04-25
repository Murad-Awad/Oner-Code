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
		searchResultsObject["data"]["poshmark"] = searchForClothesPoshmark(query)
		return JsonResponse(searchResultsObject)
	except ValueError:
		raise ParseError

#web scraping get request
def searchForClothesPoshmark(query):
	try:
		results = []
		poshmarkResults = requests.get("https://poshmark.com/search?query=" + query).text
		soup = BeautifulSoup(poshmarkResults)
		soup = soup.find("div", {"data-test": "tiles_container"})
		soup = soup.contents
		i = 0
		for listing in soup:
			listingToAdd = extractInfo(listing)
			if listingToAdd:
				results.append(listingToAdd)
		return results
	except ValueError:
		raise ParseError


def extractInfo(listing):
	listingToAdd = None
	if listing and type(listing) is not Comment and listing.get("class") and listing.get("class")[0] == 'tile':
		listingToAdd = {}
		listingDetails = listing.find("div", class_="item__details")
		listingToAdd["name"] = getNameFromPoshmark(listingDetails)
		listingToAdd["img"] = getImageFromPoshmark(listing)
		listingToAdd["price"] = getPriceFromPoshmark(listingDetails)
		listingToAdd["originalPrice"] = getOriginalPriceFromPoshmark(listingDetails)
	return listingToAdd

def getImageFromPoshmark(listing):
	image_tree_link = listing.find("div", class_="img__container img__container--square")
	image = image_tree_link.find("img") if image_tree_link else None
	imageToReturn = image["src"] if image else None
	return image["data-src"] if image and not imageToReturn else imageToReturn

def getNameFromPoshmark(listingDetails):
	name = None
	if listingDetails:
		name = listingDetails.find("a", {"data-et-name": "listing"})
	return stringPrettify(name.text) if name else None

def getPriceFromPoshmark(listingDetails):
	price = None
	if listingDetails:
		price = listingDetails.find("span", {"data-test": "tile-price"})
	return stringPrettify(price.text) if price else None

def getOriginalPriceFromPoshmark(listingDetails):
	price = None
	if listingDetails:
		price = listingDetails.find("span", {"data-test": "tile-original-price"})
	return stringPrettify(price.text) if price else None

def stringPrettify(text):
	return text.lstrip().rstrip()



