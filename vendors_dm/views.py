from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import VendorTypes, Vendors, VendorPhotos, Cities
from .serializers import (
    VendorTypesSerializer,
    VendorsSerializer,
    VendorPhotosSerializer,
    CitiesSerializer,
)

class VendorTypesViewSet(viewsets.ModelViewSet):
    """
    Viewset for VendorTypes model.

    This viewset provides CRUD (Create, Read, Update, Delete) operations for the VendorTypes model.
    It uses the VendorTypesSerializer for serialization and deserialization.
    """
    queryset = VendorTypes.objects.all()
    serializer_class = VendorTypesSerializer


class VendorPhotosViewSet(viewsets.ModelViewSet):
    """
    Viewset for VendorPhotos model.

    This viewset provides CRUD (Create, Read, Update, Delete) operations for the VendorPhotos model.
    It uses the VendorPhotosSerializer for serialization and deserialization.
    """
    queryset = VendorPhotos.objects.all()
    serializer_class = VendorPhotosSerializer

class VendorsViewSet(viewsets.ModelViewSet):
    """
    Viewset for Vendors model.

    This viewset provides CRUD (Create, Read, Update, Delete) operations for the Vendors model.
    It uses the VendorsSerializer for serialization and deserialization.
    """
    queryset = Vendors.objects.all()
    serializer_class = VendorsSerializer

class CitiesViewSet(viewsets.ModelViewSet):
    """
    Viewset for Cities model.

    This viewset provides CRUD (Create, Read, Update, Delete) operations for the Cities model.
    It uses the CitiesSerializer for serialization and deserialization.
    """
    queryset = Cities.objects.all()
    serializer_class = CitiesSerializer
