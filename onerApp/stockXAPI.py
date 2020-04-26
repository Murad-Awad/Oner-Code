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
import sys
from PyQt5.QtWidgets import QApplication
from PyQt5.QtCore import QUrl
from PyQt5.QtWebEngineWidgets import QWebEngineView
from requests_html import AsyncHTMLSession
from threading import Thread
import asyncio
from asgiref.sync import async_to_sync
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from fake_useragent import UserAgent
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from selenium.common.exceptions import NoSuchElementException
import time

async def getStockXData(url, session):
	stockXResults = await session.get(url)
	await stockXResults.html.arender()
	print(stockXResults.html)
	print ('woot')

def searchForClothesStockX(query):
	logger = logging.getLogger('mylogger')

	url = "https://stockx.com/search?s=" + query

	driver = webdriver.Firefox(executable_path='/mnt/c/GeckoDriver/geckodriver.exe')
	results = []
	try:
		driver.get(url)

		WebDriverWait(driver, 60).until(EC.presence_of_element_located((By.XPATH, '//div[@class="tile browse-tile"]')))
		scrollDownWindow(driver)

		#start extracting listings
		soup = BeautifulSoup(driver.page_source)
		soup = soup.find("div", {"class": "browse-grid"})
		listings = soup.findChild().contents

		for listing in listings:
			listingToAdd = extractInfo(listing)
			if listingToAdd:
				results.append(listingToAdd)
		return results
	except TimeoutException:
		raise ParseError

def extractInfo(listing):
	listingToAdd = None
	if listing and type(listing) is not Comment and listing.get("class") and listing.get("class")[0] == 'tile':
		listingToAdd = {}
		listingToAdd["name"] = getNameFromStockX(listing)
		listingToAdd["img"] = getImageFromStockX(listing)
		listingToAdd["lowest_ask_price"] = getPriceFromStockX(listing)
		listingToAdd["href"] = getLinkFromStockX(listing)
	return listingToAdd

def getImageFromStockX(listing):
	image = listing.find("img")
	return image["src"] if image else None

def getNameFromStockX(listing):
	textDiv = listing.find("div", class_="PrimaryText-m2st9e-0 hugwvm")
	nameDivs = textDiv.contents if textDiv else []
	name = ""
	i = 0
	for div in nameDivs:
		text = div
		if div and type(div) is not NavigableString:
			text = div.text
		name += stringPrettify(text)
		if i < len(nameDivs) - 1:
			name += " "
		i+=1
	return name

def getPriceFromStockX(listing):
	priceDiv = listing.find("div", class_="PrimaryText-m2st9e-0 feUFro")
	return stringPrettify(priceDiv.text) if priceDiv else ""

def getLinkFromStockX(listing):
	link = listing.find("a")
	return "https://stockx.com" + link["href"] if link else ""

def stringPrettify(text):
	return text.lstrip().rstrip()

def scrollDownWindow(driver):
	SCROLL_PAUSE_TIME = 0.002

	# Get scroll height
	last_height = driver.execute_script("return document.body.scrollHeight")
	# while True:
		# Scroll down to bottom
	driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
		#wait to load page
	time.sleep(SCROLL_PAUSE_TIME)

	driver.execute_script("window.scrollTo(document.body.scrollHeight, document.body.scrollHeight + document.body.scrollHeight);")

	time.sleep(SCROLL_PAUSE_TIME)

	driver.execute_script("window.scrollTo(document.body.scrollHeight + document.body.scrollHeight, document.documentElement.scrollHeight);")

	new_height = driver.execute_script("return document.documentElement.scrollHeight")