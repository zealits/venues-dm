from django.db import models
from datetime import datetime

# Create your models here.

        
# Define the Venue Type Model
class VenueTypes(models.Model):
    """
    Represents different types of venues.
    """
    venue_type_id = models.AutoField(primary_key=True)
    venue_type = models.CharField(max_length=255, default=None, null=True, blank=True)

    class Meta:
        db_table = 'venue_types'
        
    def __str__(self):
        return self.venue_type


# Define the Venue Model
class Venues(models.Model):
    """
    Represents information about venues.
    """
    venue_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, default=None, null=True, blank=True)
    address = models.TextField(default=None, null=True, blank=True)
    email = models.EmailField(default=None, null=True, blank=True)
    phone_number = models.CharField(max_length=20, default=None, null=True, blank=True)
    venue_type = models.ForeignKey(VenueTypes, on_delete=models.CASCADE, default=None, null=True, blank=True)
    description = models.TextField(default=None, null=True, blank=True)
    year_of_establishment = models.PositiveIntegerField(default=None, null=True, blank=True)
    ownership_type = models.CharField(max_length=255, default=None, null=True, blank=True)
    created_at = models.DateTimeField(default=datetime.now)
    updated_at = models.DateTimeField(default=datetime.now)
    
    class Meta:
        db_table = 'venues'

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = datetime.now()
        self.updated_at = datetime.now()
        super(Venues, self).save(*args, **kwargs)

class VenueMedia(models.Model):
    """
    Represents photos associated with venues.
    """
    venue_photo_id = models.AutoField(primary_key=True)
    venue = models.ForeignKey(Venues, on_delete=models.CASCADE)
    media = models.FileField(upload_to='venue_media/')

    class Meta:
        db_table = 'venue_media'

# Define the Venue Social Media Handles Model
class VenueAdditionalInfo(models.Model):
    """
    Represents social media handles associated with venues.
    """
    venue_add_info_id = models.AutoField(primary_key=True)
    venue = models.ForeignKey(Venues, on_delete=models.CASCADE, default=None, null=True, blank=True)
    owner_manager_name = models.CharField(max_length=255, default=None, null=True, blank=True)
    owner_manager_email = models.EmailField(default=None, null=True, blank=True)
    owner_manager_phone = models.CharField(max_length=20, default=None, null=True, blank=True)
    facebook_url = models.CharField(max_length=255, default=None, null=True, blank=True)
    instagram_url = models.CharField(max_length=255, default=None, null=True, blank=True)
    twitter_url = models.CharField(max_length=255, default=None, null=True, blank=True)
    linkedin_url = models.CharField(max_length=255, default=None, null=True, blank=True)
    youtube_url = models.CharField(max_length=255, default=None, null=True, blank=True)

    class Meta:
        db_table = 'venue_add_info'

# Define the Venue Facilities Model
class VenueFacilities(models.Model):
    """
    Represents facilities available at venues.
    """
    venue_facilities_id = models.AutoField(primary_key=True)
    venue = models.ForeignKey(Venues, on_delete=models.CASCADE, default=None, null=True, blank=True)
    total_area = models.PositiveIntegerField(default=None, null=True, blank=True)
    indoor_area = models.PositiveIntegerField(default=None, null=True, blank=True)
    outdoor_area = models.PositiveIntegerField(default=None, null=True, blank=True)
    seating_capacity = models.PositiveIntegerField(default=None, null=True, blank=True)
    standing_capacity = models.PositiveIntegerField(default=None, null=True, blank=True)
    number_of_rooms_spaces = models.PositiveIntegerField(default=None, null=True, blank=True)
    stage_availability = models.BooleanField(default=None, null=True, blank=True)
    podium_availability = models.BooleanField(default=None, null=True, blank=True)
    parking_facilities = models.BooleanField(default=None, null=True, blank=True)
    parking_capacity = models.PositiveIntegerField(default=None, null=True, blank=True)
    valet_parking_availability = models.BooleanField(default=None, null=True, blank=True)
    proximity_to_public_transport = models.TextField(default=None, null=True, blank=True)
    proximity_to_major_roads = models.TextField(default=None, null=True, blank=True)
    proximity_to_airport = models.TextField(default=None, null=True, blank=True)
    surrounding_environment = models.TextField(default=None, null=True, blank=True)
    noise_restrictions = models.TextField(default=None, null=True, blank=True)
    ceiling_height = models.PositiveIntegerField(default=None, null=True, blank=True)
    load_in_load_out_facilities = models.BooleanField(default=None, null=True, blank=True)
    green_room_availability = models.BooleanField(default=None, null=True, blank=True)
    dressing_room_availability = models.BooleanField(default=None, null=True, blank=True)
    kitchen_facilities = models.BooleanField(default=None, null=True, blank=True)
    restroom_facilities = models.BooleanField(default=None, null=True, blank=True)
    power_supply_backup = models.BooleanField(default=None, null=True, blank=True)
    air_conditioning_heating = models.BooleanField(default=None, null=True, blank=True)
    natural_light_availability = models.BooleanField(default=None, null=True, blank=True)
    outdoor_space_description = models.TextField(default=None, null=True, blank=True)
    scenic_view = models.BooleanField(default=None, null=True, blank=True)
    smoking_area = models.BooleanField(default=None, null=True, blank=True)
    pet_friendly = models.BooleanField(default=None, null=True, blank=True)
    child_friendly = models.BooleanField(default=None, null=True, blank=True)
    noise_level = models.CharField(max_length=255, default=None, null=True, blank=True)
    nearby_parking_facilities = models.TextField(default=None, null=True, blank=True)
    security_features = models.TextField(default=None, null=True, blank=True)
    fire_safety_measures = models.TextField(default=None, null=True, blank=True)

    class Meta:
        db_table = 'facilities'

# Define the Venue Services Model
class VenueServices(models.Model):
    """
    Represents services offered at venues.
    """
    venue_services_id = models.AutoField(primary_key=True)
    venue = models.ForeignKey(Venues, on_delete=models.CASCADE, default=None, null=True, blank=True)
    catering_services = models.BooleanField(default=None, null=True, blank=True)
    types_of_cuisine = models.TextField(default=None, null=True, blank=True)
    bar_services = models.BooleanField(default=None, null=True, blank=True)
    alcohol_licensing = models.BooleanField(default=None, null=True, blank=True)
    decor_services = models.BooleanField(default=None, null=True, blank=True)
    event_planning_services = models.BooleanField(default=None, null=True, blank=True)
    audio_visual_services = models.BooleanField(default=None, null=True, blank=True)
    internet_wifi_availability = models.BooleanField(default=None, null=True, blank=True)
    accommodation_availability = models.BooleanField(default=None, null=True, blank=True)
    number_of_rooms_for_accommodation = models.PositiveIntegerField(default=None, null=True, blank=True)
    types_of_rooms = models.TextField(default=None, null=True, blank=True)
    furniture_availability = models.BooleanField(default=None, null=True, blank=True)
    types_of_furniture_available = models.TextField(default=None, null=True, blank=True)
    decor_restrictions = models.TextField(default=None, null=True, blank=True)
    cleaning_services = models.BooleanField(default=None, null=True, blank=True)
    on_site_staff_availability = models.BooleanField(default=None, null=True, blank=True)
    event_coordination_services = models.BooleanField(default=None, null=True, blank=True)
    equipment_rental_options = models.BooleanField(default=None, null=True, blank=True)
    storage_facilities = models.BooleanField(default=None, null=True, blank=True)
    signage_banner_allowed = models.BooleanField(default=None, null=True, blank=True)
    special_lighting = models.BooleanField(default=None, null=True, blank=True)
    dance_floor = models.BooleanField(default=None, null=True, blank=True)
    outdoor_heating = models.BooleanField(default=None, null=True, blank=True)
    tenting_facilities = models.BooleanField(default=None, null=True, blank=True)
    coat_check = models.BooleanField(default=None, null=True, blank=True)
    bridal_suite = models.BooleanField(default=None, null=True, blank=True)
    child_care_facilities = models.BooleanField(default=None, null=True, blank=True)
    pet_care_facilities = models.BooleanField(default=None, null=True, blank=True)

    class Meta:
        db_table = 'services'

# Define the Venue Bookings Model
class VenueBookings(models.Model):
    """
    Represents booking details for venues.
    """
    venue_booking_id = models.AutoField(primary_key=True)
    venue = models.ForeignKey(Venues, on_delete=models.CASCADE, default=None, null=True, blank=True)
    availability = models.BooleanField(default=None, null=True, blank=True)
    minimum_notice_period = models.PositiveIntegerField(default=None, null=True, blank=True)
    cancellation_policy = models.TextField(default=None, null=True, blank=True)
    pricing = models.TextField(default=None, null=True, blank=True)
    payment_methods_accepted = models.TextField(default=None, null=True, blank=True)
    insurance_requirements = models.TextField(default=None, null=True, blank=True)
    booking_channels = models.TextField(default=None, null=True, blank=True)
    deposit_requirement = models.BooleanField(default=None, null=True, blank=True)
    deposit_amount = models.DecimalField(max_digits=10, decimal_places=2, default=None, null=True, blank=True)
    deposit_refund_policy = models.TextField(default=None, null=True, blank=True)
    full_payment_due_date = models.TextField(default=None, null=True, blank=True)
    discounts_available = models.BooleanField(default=None, null=True, blank=True)
    types_of_discounts = models.TextField(default=None, null=True, blank=True)
    minimum_booking_duration = models.PositiveIntegerField(default=None, null=True, blank=True)
    maximum_booking_duration = models.PositiveIntegerField(default=None, null=True, blank=True)
    overtime_policy = models.TextField(default=None, null=True, blank=True)
    setup_takedown_time_included = models.BooleanField(default=None, null=True, blank=True)
    additional_costs = models.TextField(default=None, null=True, blank=True)
    contract_requirement = models.BooleanField(default=None, null=True, blank=True)
    contract_terms = models.TextField(default=None, null=True, blank=True)
    cancellation_by_venue_policy = models.TextField(default=None, null=True, blank=True)
    force_majeure_policy = models.TextField(default=None, null=True, blank=True)

    class Meta:
        db_table = 'booking_info'

# Define the Venue Events Model
class VenueEvents(models.Model):
    """
    Represents events hosted at venues.
    """
    venue_events_id = models.AutoField(primary_key=True)
    venue = models.ForeignKey(Venues, on_delete=models.CASCADE, default=None, null=True, blank=True)
    types_of_events_hosted = models.TextField(default=None, null=True, blank=True)
    client_testimonials_and_reviews = models.TextField(default=None, null=True, blank=True)
    number_of_events_hosted = models.PositiveIntegerField(default=None, null=True, blank=True)
    notable_events_or_clients = models.TextField(default=None, null=True, blank=True)
    client_references = models.TextField(default=None, null=True, blank=True)
    event_success_stories = models.TextField(default=None, null=True, blank=True)
    event_failures_lessons_learned = models.TextField(default=None, null=True, blank=True)
    average_event_rating = models.DecimalField(max_digits=3, decimal_places=2, default=None, null=True, blank=True)
    event_portfolio = models.TextField(default=None, null=True, blank=True)
    media_mentions = models.TextField(default=None, null=True, blank=True)
    event_frequency = models.TextField(default=None, null=True, blank=True)

    class Meta:
        db_table = 'events'




# Define the Venue Legal Compliances Model
class VenueLegalCompliances(models.Model):
    """
    Represents legal compliances and certifications associated with venues.
    """
    venue_legal_compliance_id = models.AutoField(primary_key=True)
    venue = models.ForeignKey(Venues, on_delete=models.CASCADE, default=None, null=True, blank=True)
    licenses_and_permits = models.TextField(default=None, null=True, blank=True)
    safety_measures = models.TextField(default=None, null=True, blank=True)
    business_registration_details = models.TextField(default=None, null=True, blank=True)
    tax_compliance_status = models.CharField(max_length=255, default=None, null=True, blank=True)
    health_and_safety_certifications = models.TextField(default=None, null=True, blank=True)
    fire_safety_compliance = models.TextField(default=None, null=True, blank=True)
    food_safety_certifications = models.TextField(default=None, null=True, blank=True)
    alcohol_licensing_details = models.TextField(default=None, null=True, blank=True)
    music_licensing_details = models.TextField(default=None, null=True, blank=True)
    insurance_coverage_details = models.TextField(default=None, null=True, blank=True)
    accessibility_compliance = models.TextField(default=None, null=True, blank=True)
    privacy_policy = models.TextField(default=None, null=True, blank=True)
    terms_and_conditions = models.TextField(default=None, null=True, blank=True)
    dispute_resolution_mechanisms = models.TextField(default=None, null=True, blank=True)
    sustainability_practices = models.TextField(default=None, null=True, blank=True)
    noise_pollution_controls = models.TextField(default=None, null=True, blank=True)

    class Meta:
        db_table = 'legal_compliances'


# Define the Vendor type Model
class VendorTypes(models.Model):
    """
    Represents type of vendors.
    """
    vendor_type_id = models.AutoField(primary_key=True)
    type_name = models.CharField(max_length=255)

    class Meta:
        db_table = 'vendor_types'
    
    def __str__(self):
        return self.type_name
    
class Cities(models.Model):
    """
    Represents different cities.
    """
    city_id = models.AutoField(primary_key=True)
    city_name = models.CharField(max_length=255)

    class Meta:
        db_table = 'cities'
    
    def __str__(self):
        return self.city_name

# Define the Vendors Model
class Vendors(models.Model):
    """
    Represents vendors offering products or services.
    """
    vendor_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    contact_email = models.EmailField(default=None, null=True, blank=True)
    vendor_type = models.ForeignKey(VendorTypes, on_delete=models.SET_NULL, null=True, blank=True)
    products_or_services = models.TextField(default=None, null=True, blank=True)
    address = models.TextField(default=None, null=True, blank=True)
    city = models.ForeignKey(Cities, on_delete=models.SET_NULL, null=True, blank=True)
    website = models.URLField(default=None, null=True, blank=True)
    phone_number = models.CharField(max_length=20, default=None, null=True, blank=True)
    description = models.TextField(default=None, null=True, blank=True)
    availability = models.BooleanField(default=False)
    insurance_coverage = models.TextField(default=None, null=True, blank=True)
    licenses_and_permits = models.TextField(default=None, null=True, blank=True)
    preferred_venues = models.TextField(default=None, null=True, blank=True)
    facebook_url = models.CharField(max_length=255, default=None, null=True, blank=True)
    instagram_url = models.CharField(max_length=255, default=None, null=True, blank=True)
    twitter_url = models.CharField(max_length=255, default=None, null=True, blank=True)
    linkedin_url = models.CharField(max_length=255, default=None, null=True, blank=True)
    youtube_url = models.CharField(max_length=255, default=None, null=True, blank=True)
    created_at = models.DateTimeField(default=datetime.now)
    updated_at = models.DateTimeField(default=datetime.now)
    
    class Meta:
        db_table = 'vendors'
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = datetime.now()
        self.updated_at = datetime.now()
        super(Vendors, self).save(*args, **kwargs)


class VendorMedia(models.Model):
    """
    Represents photos associated with vendors.
    """
    vendor_photo_id = models.AutoField(primary_key=True)
    vendor = models.ForeignKey(Vendors, on_delete=models.CASCADE)
    media = models.FileField(upload_to='vendor_media/')

    class Meta:
        db_table = 'vendor_media'

 


class VenuePreferredVendors(models.Model):
    """
    Represents preferred vendors for venues.
    """
    venue_preferred_vendors_id = models.AutoField(primary_key=True)
    venue = models.ForeignKey(Venues, on_delete=models.CASCADE, default=None, null=True, blank=True, related_name='preferred_vendors')
    preferred_catering_vendor = models.ForeignKey(Vendors, on_delete=models.CASCADE, default=None, null=True, blank=True, related_name='catering_preferences')
    preferred_photography_vendor = models.ForeignKey(Vendors, on_delete=models.CASCADE, default=None, null=True, blank=True, related_name='photography_preferences')
    preferred_band_vendor = models.ForeignKey(Vendors, on_delete=models.CASCADE, default=None, null=True, blank=True, related_name='band_preferences')
    preferred_flowers_vendor = models.ForeignKey(Vendors, on_delete=models.CASCADE, default=None, null=True, blank=True, related_name='flowers_preferences')
    preferred_transportation_vendor = models.ForeignKey(Vendors, on_delete=models.CASCADE, default=None, null=True, blank=True, related_name='transportation_preferences')
    preferred_lighting_and_decor_vendor = models.ForeignKey(Vendors, on_delete=models.CASCADE, default=None, null=True, blank=True, related_name='lighting_decor_preferences')
    preferred_wedding_cake_vendor = models.ForeignKey(Vendors, on_delete=models.CASCADE, default=None, null=True, blank=True, related_name='wedding_cake_preferences')
    preferred_dj_vendor = models.ForeignKey(Vendors, on_delete=models.CASCADE, default=None, null=True, blank=True, related_name='dj_preferences')

    class Meta:
        db_table = 'venue_vendors'



