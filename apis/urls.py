from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from . import views

router = DefaultRouter()
router.register(r'vendor-types', VendorTypesViewSet)
router.register(r'vendor-media', VendorMediaViewSet)
router.register(r'vendors', VendorsViewSet)
router.register(r'cities', CitiesViewSet)
router.register(r'venue-types', VenueTypesViewSet)
router.register(r'venues', VenuesViewSet)
router.register(r'venue-media', VenueMediaViewSet)
router.register(r'venue-social', VenueAdditionalInfoViewSet)
router.register(r'venue-facility', VenueFacilitiesViewSet)
router.register(r'venue-services', VenueServicesViewSet)
router.register(r'venue-bookings', VenueBookingsViewSet)
router.register(r'venue-events', VenueEventsViewSet)
router.register(r'venue-legal-compliances', VenueLegalCompliancesViewSet)
router.register(r'venue-preferred-vendors', VenuePreferredVendorsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/vendors/<int:pk>/', VendorsViewSet.as_view({'get': 'retrieve'}), name='vendor-detail'),
    path('api/vendors/<int:pk>/', views.VendorsViewSet.as_view({'put': 'update'}), name='vendor-update'),
    path('api/vendor-photos/<int:pk>/', views.VendorsViewSet.as_view({'put': 'update'}), name='vendor-update'),
    path('api/vendors/<int:pk>/', views.VendorsViewSet.as_view({'delete': 'destroy'}), name='vendor-delete'),
    path('api/vendorsTypes/<int:vendor_type_id>/', views.VendorListView.as_view(), name='vendor-list'),
    path('api/venues/<int:pk>/', views.VenuesViewSet.as_view({'delete': 'destroy'}), name='venue-delete'),
    path('api/venues/<int:pk>/', views.VenuesViewSet.as_view({'get': 'retrieve'}), name='venue-detail'),
    path('api/venues/<int:pk>/', views.VenuesViewSet.as_view({'put': 'update'}), name='venue-update'),
    path('api/venueSocial/<int:venue_id>/', views.VenueAdditionalInfoListView.as_view(), name='venue_social-list'),
    path('api/venueFacility/<int:venue_id>/', views.VenueFacilityListView.as_view(), name='venue_facility-list'),
    path('api/venueService/<int:venue_id>/', views.VenueServiceListView.as_view(), name='venue_service-list'),
    path('api/venueBooking/<int:venue_id>/', views.VenueBookingListView.as_view(), name='venue_booking-list'),
    path('api/venueEvent/<int:venue_id>/', views.VenueEventListView.as_view(), name='venue_event-list'),
    path('api/venueLegal/<int:venue_id>/', views.VenueLegalCompliancesListView.as_view(), name='venue_legal-list'),
    path('api/venueVendor/<int:venue_id>/', views.VenuePreferredVendorsListView.as_view(), name='venue_vendor-list'),
]
