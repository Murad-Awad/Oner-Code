from django.urls import path
from . import views

urlpatterns = [
    path('api/onerApp/', views.ClothingListCreate.as_view() ),
]