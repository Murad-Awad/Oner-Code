from rest_framework import routers
from .api import ClothingViewSet
from .api import searchForClothes
from .api import getClothingInfo
from django.urls import path

router = routers.DefaultRouter()
router.register('api/clothes', ClothingViewSet, 'clothes')
urlpatterns = router.urls + [path('api/query/', searchForClothes)] + [path('api/getData/', getClothingInfo)]
