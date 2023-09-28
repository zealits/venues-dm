from rest_framework import serializers
from .models import *

class VendorTypesSerializer(serializers.ModelSerializer):
    """
    Serializer for VendorTypes model.

    This serializer is used to convert VendorTypes model instances into JSON data.
    It includes all fields of the VendorTypes model.
    """
    class Meta:
        model = VendorTypes
        fields = '__all__'

class VendorMediaSerializer(serializers.ModelSerializer):
    """
    Serializer for VendorMedia model.

    This serializer is used to convert VendorMedia model instances into JSON data.
    It includes all fields of the VendorMedia model.
    """
    class Meta:
        model = VendorMedia
        fields = '__all__'


class VendorsSerializer(serializers.ModelSerializer):
    """
    Serializer for Vendors model.

    This serializer is used to convert Vendors model instances into JSON data.
    It includes all fields of the Vendors model.
    Additionally, it includes a nested serializer for the 'photos' field to serialize multiple related VendorPhotos instances.
    """
    
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


class VenueTypesSerializer(serializers.ModelSerializer):
    """
    Serializer for VenueTypes model.
    """
    class Meta:
        model = VenueTypes
        fields = '__all__'
        
class VenuesSerializer(serializers.ModelSerializer):
    """
    Serializer for Venues model.

    This serializer is used to convert Venues model instances into JSON data.
    It includes all fields of the Venues model, including the updated fields.
    """
    class Meta:
        model = Venues
        fields = '__all__'

class VenueMediaSerializer(serializers.ModelSerializer):
    """
    Serializer for VenueMedia model.

    This serializer is used to convert VenueMedia model instances into JSON data.
    It includes all fields of the VenueMedia model.
    """
    class Meta:
        model = VenueMedia
        fields = '__all__'

        
class VenueAdditionalInfoSerializer(serializers.ModelSerializer):
    """
    Serializer for VenueAdditionalInfo model.

    This serializer is used to convert VenueAdditionalInfo model instances into JSON data.
    It includes all fields of the VenueAdditionalInfo model.
    """
    class Meta:
        model = VenueAdditionalInfo
        fields = '__all__'
        
class VenueFacilitiesSerializer(serializers.ModelSerializer):
    """
    Serializer for VenueFacilities model.

    This serializer is used to convert VenueFacilities model instances into JSON data.
    It includes all fields of the VenueFacilities model.
    """
    class Meta:
        model = VenueFacilities
        fields = '__all__'
        
        
class VenueServicesSerializer(serializers.ModelSerializer):
    """
    Serializer for VenueServices model.

    This serializer is used to convert VenueServices model instances into JSON data.
    It includes all fields of the VenueServices model.
    """
    
    class Meta:
        model = VenueServices
        fields = '__all__'

class VenueBookingsSerializer(serializers.ModelSerializer):
    """
    Serializer for VenueBookings model.

    This serializer is used to convert VenueBookings model instances into JSON data.
    It includes all fields of the VenueBookings model.
    """
    
    class Meta:
        model = VenueBookings
        fields = '__all__'

class VenueEventsSerializer(serializers.ModelSerializer):
    """
    Serializer for VenueEvents model.

    This serializer is used to convert VenueEvents model instances into JSON data.
    It includes all fields of the VenueEvents model.
    """
    
    class Meta:
        model = VenueEvents
        fields = '__all__'

class VenueLegalCompliancesSerializer(serializers.ModelSerializer):
    """
    Serializer for VenueLegalCompliances model.

    This serializer is used to convert VenueLegalCompliances model instances into JSON data.
    It includes all fields of the VenueLegalCompliances model.
    """
    
    class Meta:
        model = VenueLegalCompliances
        fields = '__all__'
   
   
        
class VenuePreferredVendorsSerializer(serializers.ModelSerializer):
    """
    Serializer for VenuePreferredVendors model.

    This serializer is used to convert VenuePreferredVendors model instances into JSON data.
    It includes all fields of the VenuePreferredVendors model.
    """
    
    class Meta:
        model = VenuePreferredVendors
        fields = '__all__'