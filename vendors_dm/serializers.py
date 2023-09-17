from rest_framework import serializers
from .models import VendorTypes, Vendors, Cities, VendorPhotos

class VendorTypesSerializer(serializers.ModelSerializer):
    """
    Serializer for VendorTypes model.

    This serializer is used to convert VendorTypes model instances into JSON data.
    It includes all fields of the VendorTypes model.
    """
    class Meta:
        model = VendorTypes
        fields = '__all__'

class VendorPhotosSerializer(serializers.ModelSerializer):
    """
    Serializer for VendorPhotos model.

    This serializer is used to convert VendorPhotos model instances into JSON data.
    It includes all fields of the VendorPhotos model.
    """
    class Meta:
        model = VendorPhotos
        fields = '__all__'


class VendorsSerializer(serializers.ModelSerializer):
    """
    Serializer for Vendors model.

    This serializer is used to convert Vendors model instances into JSON data.
    It includes all fields of the Vendors model.
    Additionally, it includes a nested serializer for the 'photos' field to serialize multiple related VendorPhotos instances.
    """
    photos = VendorPhotosSerializer(many=True, read_only=True)
    
    class Meta:
        model = Vendors
        fields = '__all__'

class CitiesSerializer(serializers.ModelSerializer):
    """
    Serializer for Cities model.

    This serializer is used to convert Cities model instances into JSON data.
    It includes all fields of the Cities model.
    """
    class Meta:
        model = Cities
        fields = '__all__'
