from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VendorTypesViewSet, VendorsViewSet,CitiesViewSet,VendorPhotosViewSet
from . import views

router = DefaultRouter()
router.register(r'vendor-types', VendorTypesViewSet)
router.register(r'vendor-photos', VendorPhotosViewSet)
router.register(r'vendors', VendorsViewSet)
router.register(r'cities', CitiesViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/vendors/<int:pk>/', views.VendorsViewSet.as_view({'put': 'update'}), name='vendor-update'),
     path('api/vendors/<int:pk>/', views.VendorsViewSet.as_view({'delete': 'destroy'}), name='vendor-delete'),
]
