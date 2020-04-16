from django.db import models
from picklefield.fields import PickledObjectField
from django.contrib.auth.models import User
# Create your models here.
class ClothingListings(models.Model):
	listings = PickledObjectField()

class Clothing(models.Model):
	name = models.CharField(max_length=300)
	price = models.DecimalField(max_digits = 12, decimal_places = 2)
	sold = models.BooleanField(default=False)
	listed = models.BooleanField(default=False)

	# def image_path(self, imgName):
	# 	return osjoin(str(self.user), imgName)
	# image = models.ImageField(upload_to=image_path)
	image = models.ImageField(upload_to = 'uploads/', default = None)
	def get_default_data():
		return {'StockX' : False, 'eBay' : False, 'Poshmark': False}
	platformsListed = PickledObjectField(default=get_default_data)
	# user = models.ForeignKey(User, default = None, on_delete = models.CASCADE, related_name = '+')

