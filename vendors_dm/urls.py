from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VendorTypesViewSet, VendorSocialMediaHandlesViewSet, VendorsViewSet,CitiesViewSet,VendorPhotosViewSet

router = DefaultRouter()
router.register(r'vendor-types', VendorTypesViewSet)
router.register(r'vendor-photos', VendorPhotosViewSet)
router.register(r'social-media-handles', VendorSocialMediaHandlesViewSet)
router.register(r'vendors', VendorsViewSet)
router.register(r'cities', CitiesViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
