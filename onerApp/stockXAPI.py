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
from datetime import date

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

def getClothingData(query):
	url = query
	driver = webdriver.Firefox(executable_path='/mnt/c/GeckoDriver/geckodriver.exe')
	result = []
	try:
		driver.get(url)

		WebDriverWait(driver, 60).until(EC.presence_of_element_located((By.XPATH, '//div[@class="latest-sales-container chart"]')))
		scrollDownWindow(driver)

		#start extracting listings
		soup = BeautifulSoup(driver.page_source)
		gauges = soup.find("div", {"class": "gauges"})
		print(gauges.contents)
		children = gauges.contents if gauges else []
		price_premium_dict = {}
		price_premium_dict["price_premium"] = getGaugeContent(children[1])
		result.append(price_premium_dict)
		avg_sale_price_dict = {}
		avg_sale_price_dict["avg_sale_price"] = getGaugeContent(children[2])
		result.append(avg_sale_price_dict)
		sku = getSKU(soup)
		graph_dict = {}
		graph_dict["graph_data"] = getGraphData(sku, driver)
		result.append(graph_dict)
		mostPopularMonth = {}
		# mostPopularMonth["most_sold_month"] = getMostSoldMonth()

		# listings = soup.findChild().contents

		# for listing in listings:
		# 	listingToAdd = extractInfo(listing)
		# 	if listingToAdd:
		# 		results.append(listingToAdd)
		# return results
		return result
	except TimeoutException:
		raise ParseError

def getGaugeContent(soup):
	result = ""
	if soup:
		content = soup.find("div", {"class": "gauge-value"})
		result = stringPrettify(content.text) if content else ""
	return result

def getSKU(soup):
	sku = {}
	if soup:
		productView = soup.find("div", {"class": "product-view"})
		script = productView.find("script") if productView else None
		jsonText = script.text if script else "{}"
		jsonObj = json.loads(jsonText)
		sku = jsonObj['sku']
	return sku

def getGraphData(sku, driver):
	url = "https://stockx.com/api/products/" + sku + "/chart?start_date=all&end_date=" + date.today().strftime("%Y-%m-%d") + "&intervals=10000"
	result = {}
	try:
		driver.get(url)
		soup = BeautifulSoup(driver.page_source)
		data = soup.find("div", {"id": "json"}) if soup else None
		jsonData = json.loads(data.text) if data and data.text else {}
		jsonData["highest_selling_month"] = getMostSoldMonth(jsonData)
		return jsonData
	except TimeoutException:
		raise ParseError

def getMostSoldMonth(jsonData):
	result = {}
	xAxis = jsonData['xAxis']['categories']
	data = jsonData['series'][0]['data']
	newMap = {}
	highestAvgValue = 0
	highestMonth = ''
	for i in range(len(xAxis)):
		curMonth = xAxis[i]
		monthReformatted = curMonth[22:]
		monthReformatted = monthReformatted[:7]
		curData = data[i]

		#if key does exist increase how many times we see it and change avgValue
		if monthReformatted in newMap:
			oldValue = newMap[monthReformatted]['avg'] * newMap[monthReformatted]['num_of_times']
			newMap[monthReformatted]['num_of_times'] = newMap[monthReformatted]['num_of_times'] + 1
			newMap[monthReformatted]['avg'] = float(float(oldValue + curData)/float(newMap[monthReformatted]['num_of_times']))
		else:
			newMap[monthReformatted] = {}
			newMap[monthReformatted]['num_of_times'] = 1.0
			newMap[monthReformatted]['avg'] = float(curData)

		if newMap[monthReformatted]['avg'] > highestAvgValue:
			highestMonth = monthReformatted
			highestAvgValue = newMap[monthReformatted]['avg']
	print("HIGHEST VALUE", highestAvgValue)
	print("HIGHEST MONTH", highestMonth)
	result["highestMonth"] = convertToWords(highestMonth)
	result["highestValue"] = highestAvgValue
	return result;

def convertToWords(month):
	yearAndMonth = month.split('-')
	month = yearAndMonth[1]
	monthInWords = ''
	if month == '01':
		monthInWords = 'January'
	if month == '02':
		monthInWords = 'February'
	if month == '03':
		monthInWords = 'March'
	if month == '04':
		monthInWords = 'April'
	if month == '05':
		monthInWords = 'May'
	if month == '06':
		monthInWords = 'June'
	if month == '07':
		monthInWords = 'July'
	if month == '08':
		monthInWords = 'August'
	if month == '09':
		monthInWords = 'September'
	if month == '10':
		monthInWords = 'October'
	if month == '11':
		monthInWords = 'November'
	if month == '12':
		monthInWords = 'December'
	print(monthInWords)
	return monthInWords + " " + yearAndMonth[0]