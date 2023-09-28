from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class VendorTypesViewSet(viewsets.ModelViewSet):
    """
    Viewset for VendorTypes model.

    This viewset provides CRUD (Create, Read, Update, Delete) operations for the VendorTypes model.
    It uses the VendorTypesSerializer for serialization and deserialization.
    """
    queryset = VendorTypes.objects.all()
    serializer_class = VendorTypesSerializer


class VendorMediaViewSet(viewsets.ModelViewSet):
    """
    Viewset for VendorPhotos model.

    This viewset provides CRUD (Create, Read, Update, Delete) operations for the VendorPhotos model.
    It uses the VendorPhotosSerializer for serialization and deserialization.
    """
    queryset = VendorMedia.objects.all()
    serializer_class = VendorMediaSerializer

class VendorsViewSet(viewsets.ModelViewSet):
    """
    Viewset for Vendors model.

    This viewset provides CRUD (Create, Read, Update, Delete) operations for the Vendors model.
    It uses the VendorsSerializer for serialization and deserialization.
    """
    queryset = Vendors.objects.all().order_by('-created_at', '-updated_at')
    serializer_class = VendorsSerializer

class CitiesViewSet(viewsets.ModelViewSet):
    """
    Viewset for Cities model.

    This viewset provides CRUD (Create, Read, Update, Delete) operations for the Cities model.
    It uses the CitiesSerializer for serialization and deserialization.
    """
    queryset = Cities.objects.all()
    serializer_class = CitiesSerializer
    

class VenueTypesViewSet(viewsets.ModelViewSet):
    """
    Viewset for VenueTypes model.

    This viewset provides CRUD (Create, Read, Update, Delete) operations for the VenueTypes model.
    It uses the VenueTypesSerializer for serialization and deserialization.
    """
    queryset = VenueTypes.objects.all()
    serializer_class = VenueTypesSerializer


class VenuesViewSet(viewsets.ModelViewSet):
    """
    Viewset for Venues model.

    This viewset provides CRUD (Create, Read, Update, Delete) operations for the Venues model.
    It uses the VenuesSerializer for serialization and deserialization.
    """
    queryset = Venues.objects.all().order_by('-created_at', '-updated_at')
    serializer_class = VenuesSerializer

class VenueMediaViewSet(viewsets.ModelViewSet):
    """
    Viewset for VenuePhotos model.

    This viewset provides CRUD (Create, Read, Update, Delete) operations for the VenuePhotos model.
    It uses the VenuePhotosSerializer for serialization and deserialization.
    """
    queryset = VenueMedia.objects.all()
    serializer_class = VenueMediaSerializer
    

class VenueAdditionalInfoViewSet(viewsets.ModelViewSet):
    """
    Viewset for VenueAdditionalInfo model.

    This viewset provides CRUD (Create, Read, Update, Delete) operations for the VenueAdditionalInfo model.
    It uses the VenueAdditionalInfoSerializer for serialization and deserialization.
    """
    
    queryset = VenueAdditionalInfo.objects.all()
    serializer_class = VenueAdditionalInfoSerializer
    

class VenueFacilitiesViewSet(viewsets.ModelViewSet):
    """
    Viewset for VenueFacilities model.

    This viewset provides CRUD (Create, Read, Update, Delete) operations for the VenueFacilities model.
    It uses the VenueFacilitiesSerializer for serialization and deserialization.
    """
    
    queryset = VenueFacilities.objects.all()
    serializer_class = VenueFacilitiesSerializer
    

class VenueServicesViewSet(viewsets.ModelViewSet):
    """
    Viewset for VenueServices model.

    This viewset provides CRUD (Create, Read, Update, Delete) operations for the VenueServices model.
    It uses the VenueServicesSerializer for serialization and deserialization.
    """
    
    queryset = VenueServices.objects.all()
    serializer_class = VenueServicesSerializer

class VenueBookingsViewSet(viewsets.ModelViewSet):
    """
    Viewset for VenueBookings model.

    This viewset provides CRUD (Create, Read, Update, Delete) operations for the VenueBookings model.
    It uses the VenueBookingsSerializer for serialization and deserialization.
    """
    
    queryset = VenueBookings.objects.all()
    serializer_class = VenueBookingsSerializer

class VenueEventsViewSet(viewsets.ModelViewSet):
    """
    Viewset for VenueEvents model.

    This viewset provides CRUD (Create, Read, Update, Delete) operations for the VenueEvents model.
    It uses the VenueEventsSerializer for serialization and deserialization.
    """
    
    queryset = VenueEvents.objects.all()
    serializer_class = VenueEventsSerializer

class VenueLegalCompliancesViewSet(viewsets.ModelViewSet):
    """
    Viewset for VenueLegalCompliances model.

    This viewset provides CRUD (Create, Read, Update, Delete) operations for the VenueLegalCompliances model.
    It uses the VenueLegalCompliancesSerializer for serialization and deserialization.
    """
    
    queryset = VenueLegalCompliances.objects.all()
    serializer_class = VenueLegalCompliancesSerializer
    

class VenuePreferredVendorsViewSet(viewsets.ModelViewSet):
    """
    Viewset for VenuePreferredVendors model.

    This viewset provides CRUD (Create, Read, Update, Delete) operations for the VenuePreferredVendors model.
    It uses the VenuePreferredVendorsSerializer for serialization and deserialization.
    """
    
    queryset = VenuePreferredVendors.objects.all()
    serializer_class = VenuePreferredVendorsSerializer
    

class VendorListView(APIView):
    def get(self, request, vendor_type_id):
        try:
            # Retrieve vendors based on vendor_type_id
            vendors = Vendors.objects.filter(vendor_type=vendor_type_id)
            
            # Serialize the vendors data (you may need to create a serializer)
            serialized_vendors = VendorsSerializer(vendors, many=True).data
            
            return Response(serialized_vendors, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class VenueAdditionalInfoListView(APIView):
    def get(self, request, venue_id):
        try:
            # Retrieve vendors based on vendor_type_id
            venues = VenueAdditionalInfo.objects.filter(venue=venue_id)
            
            # Serialize the vendors data (you may need to create a serializer)
            serialized_venues = VenueAdditionalInfoSerializer(venues, many=True).data
            
            return Response(serialized_venues, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class VenueFacilityListView(APIView):
    def get(self, request, venue_id):
        try:
            # Retrieve vendors based on vendor_type_id
            venues = VenueFacilities.objects.filter(venue=venue_id)
            
            # Serialize the vendors data (you may need to create a serializer)
            serialized_venues = VenueFacilitiesSerializer(venues, many=True).data
            
            return Response(serialized_venues, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
class VenueServiceListView(APIView):
    def get(self, request, venue_id):
        try:
            # Retrieve vendors based on vendor_type_id
            venues = VenueServices.objects.filter(venue=venue_id)
            
            # Serialize the vendors data (you may need to create a serializer)
            serialized_venues = VenueServicesSerializer(venues, many=True).data
            
            return Response(serialized_venues, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class VenueBookingListView(APIView):
    def get(self, request, venue_id):
        try:
            # Retrieve vendors based on vendor_type_id
            venues = VenueBookings.objects.filter(venue=venue_id)
            
            # Serialize the vendors data (you may need to create a serializer)
            serialized_venues = VenueBookingsSerializer(venues, many=True).data
            
            return Response(serialized_venues, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class VenueBookingListView(APIView):
    def get(self, request, venue_id):
        try:
            # Retrieve vendors based on vendor_type_id
            venues = VenueBookings.objects.filter(venue=venue_id)
            
            # Serialize the vendors data (you may need to create a serializer)
            serialized_venues = VenueBookingsSerializer(venues, many=True).data
            
            return Response(serialized_venues, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class VenueEventListView(APIView):
    def get(self, request, venue_id):
        try:
            # Retrieve vendors based on vendor_type_id
            venues = VenueEvents.objects.filter(venue=venue_id)
            
            # Serialize the vendors data (you may need to create a serializer)
            serialized_venues = VenueEventsSerializer(venues, many=True).data
            
            return Response(serialized_venues, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class VenueLegalCompliancesListView(APIView):
    def get(self, request, venue_id):
        try:
            # Retrieve vendors based on vendor_type_id
            venues = VenueLegalCompliances.objects.filter(venue=venue_id)
            
            # Serialize the vendors data (you may need to create a serializer)
            serialized_venues = VenueLegalCompliancesSerializer(venues, many=True).data
            
            return Response(serialized_venues, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class VenuePreferredVendorsListView(APIView):
    def get(self, request, venue_id):
        try:
            # Retrieve vendors based on vendor_type_id
            venues = VenuePreferredVendors.objects.filter(venue=venue_id)
            
            # Serialize the vendors data (you may need to create a serializer)
            serialized_venues = VenuePreferredVendorsSerializer(venues, many=True).data
            
            return Response(serialized_venues, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)