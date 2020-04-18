from django.db import models
from picklefield.fields import PickledObjectField
from django.contrib.auth.models import User
from django.core.files import File
import os
import urllib.request
from tempfile import NamedTemporaryFile
import logging

# Create your models here.
class ClothingListings(models.Model):
	listings = PickledObjectField()

class Clothing(models.Model):
	name = models.CharField(max_length=300)
	price = models.DecimalField(max_digits = 12, decimal_places = 2)
	quantity = models.PositiveIntegerField(default = 1)
	sold = models.BooleanField(default=False)
	listed = models.BooleanField(default=False)

	# def image_path(self, imgName):
	# 	return osjoin(str(self.user), imgName)
	# image = models.ImageField(upload_to=image_path)
	image = models.ImageField(upload_to = 'uploads/', default = None)
	image_url = models.URLField(default = None, null=True, blank=True)

	def get_default_data():
		return {'StockX' : False, 'eBay' : False, 'Poshmark': False}
	platformsListed = PickledObjectField(default=get_default_data)
	# user = models.ForeignKey(User, default = None, on_delete = models.CASCADE, related_name = '+')
	# def save(self, *args, **kwargs):
	# 	self.get_remote_image()
	# 	super().save(*args, **kwargs)
		
	# def get_remote_image(self, *args, **kwargs):
	# 	if self.image and not self.image_url:
	# 		self.image_url = self.image.path