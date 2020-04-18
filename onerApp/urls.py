from rest_framework import routers
from .api import ClothingViewSet

router = routers.DefaultRouter()
router.register('api/clothes', ClothingViewSet, 'clothes')

urlpatterns = router.urls
