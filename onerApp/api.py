from .models import Clothing
from rest_framework import viewsets, permissions
from .serializers import ClothingSerializer
from bs4 import BeautifulSoup, Comment, NavigableString
import requests
from django.http import JsonResponse
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


#web scraping get request
@api_view(['GET'])
def searchForClothesPoshmark(request):
	logger = logging.getLogger('mylogger')
	try:
		body = json.loads(request.body)
		query = body["query"]
		searchResultsObject = {"data": []}
		poshmarkResults = requests.get("https://poshmark.com/search?query=" + query).text
		soup = BeautifulSoup(poshmarkResults)
		soup = soup.find("div", {"data-test": "tiles_container"})
		soup = soup.contents
		for listing in soup:
			listingToAdd = extractInfo(listing)
			if listingToAdd:
				searchResultsObject["data"].append(listingToAdd)
		return JsonResponse(searchResultsObject)
	except ValueError:
		raise ParseError


def extractInfo(listing):
	listingToAdd = None
	if type(listing) is not Comment and listing.get("class")[0] == 'tile':
		listingToAdd = {}
		listingContents = {}
		listingDetails = listing.find("div", class_="item__details")
		listingContents["name"] = getNameFromPoshmark(listingDetails)
		listingContents["img"] = getImageFromPoshmark(listing)
		listingContents["price"] = getPriceFromPoshmark(listingDetails)
		listingContents["originalPrice"] = getOriginalPriceFromPoshmark(listingDetails)
		image_tree_link = listing.find("div", class_="img__container img__container--square")
		image = image_tree_link.find("img")['src']
		listingDetails = listing.find("div", class_="item__details")
		name = listingDetails.find("a", {"data-et-name": "listing"})
		currentPrice = listingDetails.find("span", {"data-test": "tile-price"})
		originalPrice = listingDetails.find("span", {"data-test": "tile-original-price"})
		listingToAdd["listing"] = listingContents
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



