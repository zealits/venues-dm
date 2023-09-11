import 'package:flutter/material.dart';
import 'package:frontend_intern/Pages/main/main_screen.dart';
import 'package:image_picker/image_picker.dart';
import 'package:flutter/services.dart';
import '../../../constants.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:io';

class VendorForm extends StatefulWidget {
  @override
  _VendorFormState createState() => _VendorFormState();


}

class _VendorFormState extends State<VendorForm> {
  final _formKey = GlobalKey<FormState>();

  TextEditingController _nameController = TextEditingController();
  TextEditingController _emailController = TextEditingController();
  TextEditingController _vendorTypeController = TextEditingController();
  TextEditingController _productOrServicesController = TextEditingController();
  TextEditingController _addressController = TextEditingController();
  TextEditingController _phoneController = TextEditingController();
  TextEditingController _websiteController = TextEditingController();
  TextEditingController _descriptionController = TextEditingController();
  TextEditingController _insuranceController = TextEditingController();
  TextEditingController _licensesController = TextEditingController();
  TextEditingController _preferredVenueController = TextEditingController();
  TextEditingController _socialMediaLinkController = TextEditingController();
  final TextEditingController _imagePathController = TextEditingController();
  final ImagePicker _imagePicker = ImagePicker();
  bool _isAvailable = true;

  String? _selectedVendorTypeId; // Variable to store the selected vendor type ID
  String? _selectedCityId;
  int selectedVendorTypeId=0;
  int selectedCityId=0;

  List<Map<String, dynamic>> _vendorTypes = []; // List to store vendor types
  List<Map<String, dynamic>> _cities = [];

  // Function to fetch vendor types from the API
  Future<void> fetchVendorTypes() async {
    final response =
    await http.get(Uri.parse('http://127.0.0.1:8000/api/vendor-types/'));

    if (response.statusCode == 200) {
      // If the server returns a 200 OK response, parse the JSON
      final List<dynamic> vendorTypes = json.decode(response.body);

      setState(() {
        _vendorTypes = vendorTypes.cast<Map<String, dynamic>>();
      });
    } else {
      // Handle error
      print('Failed to fetch vendor types.');
    }
  }

  Future<void> fetchCities() async {
    final response = await http.get(Uri.parse('http://127.0.0.1:8000/api/cities/'));

    if (response.statusCode == 200) {
      final List<dynamic> cities = json.decode(response.body);

      setState(() {
        _cities = cities.cast<Map<String, dynamic>>();
      });
    } else {
      // Handle error
      print('Failed to fetch cities.');
    }
  }


  @override
  void initState() {
    super.initState();
    fetchVendorTypes(); // Fetch vendor types when the widget is initialized
    fetchCities(); // Fetch cities
  }

  Future<void> postVendorData() async {
    final url = Uri.parse('http://127.0.0.1:8000/api/vendors/');

    final vendorData = {
      'name': _nameController.text,
      'contact_email': _emailController.text,
      'vendor_type': selectedVendorTypeId , // Assuming this is the vendor type ID
      'products_or_services': _productOrServicesController.text,
      'city': selectedCityId, // Assuming this is the city ID
      'address': _addressController.text,
      'phone_number': _phoneController.text,
      'website': _websiteController.text,
      'description': _descriptionController.text,
      'availability': _isAvailable,
      'insurance_coverage': _insuranceController.text,
      'licenses_and_permits': _licensesController.text,
      'preferred_venues': _preferredVenueController.text,
    };

    final headers = <String, String>{
      'Content-Type': 'application/json',
    };

    final response = await http.post(
      url,
      headers: headers,
      body: jsonEncode(vendorData),
    );

    if (response.statusCode == 201) {
      // Vendor added successfully, you can handle success here
      final responseData = json.decode(response.body);
      print(responseData);
      Navigator.of(context).push(
          MaterialPageRoute(
            builder: (context) => MainScreen(), // Replace with your HomePage widget
          ));
    } else {
      // Handle errors, display an error message, etc.
      print('Failed to add vendor: ${response.statusCode}');
      print('Response body: ${response.body}');
    }
  }




  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;


    List<String> _socialMediaPlatforms = [
      'Facebook',
      'Twitter',
      'Instagram',
      'LinkedIn',
      'YouTube',
      'Other',
    ];



    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(60.0), // Adjust the height as needed
        child: Container(
          margin: EdgeInsets.all(0.0), // Add margin here
          decoration: BoxDecoration(
            // borderRadius: BorderRadius.circular(16.0), // Rounded corners
            color: secondaryColor, // Background color
          ),
          child: AppBar(
            title: const Text('Add Vendor'),
            backgroundColor: Colors.transparent, // Make the AppBar background transparent
            elevation: 0, // Remove the AppBar shadow
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Container(
          child: Padding(
            padding: EdgeInsets.all(20.0),
            child: Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  TextFormField(
                    controller: _nameController,
                    decoration: InputDecoration(
                      labelText: 'Vendor Name',
                      prefixIcon: Icon(Icons.person), // Add your desired icon here
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10.0),
                        borderSide: BorderSide(color: secondaryColor),
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter the vendor name';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 20.0),
                  TextFormField(
                    controller: _emailController,
                    decoration: InputDecoration(
                      labelText: 'Email',
                      prefixIcon: Icon(Icons.email), // Add your desired icon here
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10.0),
                        borderSide: BorderSide(color: secondaryColor),
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter the vendor email';
                      } else if (!value.contains('@')) {
                        return 'Please enter a valid email address';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 20.0),
                  DropdownButtonFormField<String>(
                    decoration: InputDecoration(
                      labelText: 'Vendor Type',
                      prefixIcon: Icon(Icons.category),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10.0),
                        borderSide: BorderSide(color: secondaryColor),
                      ),
                    ),
                    value: _selectedVendorTypeId, // Use _selectedVendorTypeId to store the selected value
                    items: _vendorTypes.map((vendorType) {
                      return DropdownMenuItem<String>(
                        value: vendorType['vendor_type_id'].toString(), // Use 'vendor_type_id' as a string
                        child: Text(vendorType['type_name']),
                      );
                    }).toList(),
                    onChanged: (String? newValue) {
                      setState(() {
                        _selectedVendorTypeId = newValue; // Store the selected value directly as a string
                      });
                    },
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please select the vendor type';
                      }
                      return null;
                    },
                  ),



                  SizedBox(height: 20.0),
                  TextFormField(
                    controller: _productOrServicesController,
                    decoration: InputDecoration(
                      labelText: 'Product or Services',
                      prefixIcon: Icon(Icons.business), // Change the icon to your desired one
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10.0),
                        borderSide: BorderSide(color: secondaryColor),
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter the product or services';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 20.0),
                  DropdownButtonFormField<String>(
                    decoration: InputDecoration(
                      labelText: 'City',
                      prefixIcon: Icon(Icons.location_city),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10.0),
                        borderSide: BorderSide(color: secondaryColor),
                      ),
                    ),
                    value: _selectedCityId, // Use _selectedCityId to store the selected value
                    items: _cities.map((city) {
                      return DropdownMenuItem<String>(
                        value: city['city_id'].toString(), // Use 'city_id' as a string
                        child: Text(city['city_name']),
                      );
                    }).toList(),
                    onChanged: (String? newValue) {
                      setState(() {
                        _selectedCityId = newValue; // Store the selected value directly as a string
                      });
                    },
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please select a city';
                      }
                      return null;
                    },
                  ),

                  SizedBox(height: 20.0),
                  TextFormField(
                    controller: _addressController,
                    decoration: InputDecoration(
                      labelText: 'Address',
                      prefixIcon: Icon(Icons.location_on), // Add your desired icon here
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10.0),
                        borderSide: BorderSide(color: secondaryColor),
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter the address';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 20.0),
                  TextFormField(
                    controller: _phoneController,
                    keyboardType: TextInputType.phone, // Restrict input to phone number format
                    inputFormatters: [FilteringTextInputFormatter.digitsOnly], // Allow only digits
                    decoration: InputDecoration(
                      labelText: 'Phone Number',
                      prefixIcon: Icon(Icons.phone), // Add your desired icon here
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10.0),
                        borderSide: BorderSide(color: secondaryColor),
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter the phone number';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 20.0),
                  TextFormField(
                    controller: _websiteController,
                    keyboardType: TextInputType.url, // Allow URL input
                    decoration: InputDecoration(
                      labelText: 'Website',
                      prefixIcon: Icon(Icons.link), // Add your desired icon here
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10.0),
                        borderSide: BorderSide(color: secondaryColor),
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter the website URL';
                      }
                      return null;
                    },
                  ),

                  SizedBox(height: 20.0),

                  TextFormField(
                    controller: _insuranceController,
                    decoration: InputDecoration(
                      labelText: 'Insurance Coverage',
                      prefixIcon: Icon(Icons.security),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10.0),
                        borderSide: BorderSide(color: secondaryColor),
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter insurance coverage';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 20.0),
                  TextFormField(
                    controller: _licensesController,
                    decoration: InputDecoration(
                      labelText: 'Licenses and Permits',
                      prefixIcon: Icon(Icons.assignment),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10.0),
                        borderSide: BorderSide(color: secondaryColor),
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter licenses and permits';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 20.0),
                  TextFormField(
                    controller: _preferredVenueController,
                    decoration: InputDecoration(
                      labelText: 'Preferred Venue',
                      prefixIcon: Icon(Icons.location_on),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10.0),
                        borderSide: BorderSide(color: secondaryColor),
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter preferred venue';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 20.0),
                  DropdownButtonFormField<String>(
                    decoration: InputDecoration(
                      labelText: 'Availability',
                      prefixIcon: Icon(Icons.accessibility), // Add your desired icon here
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10.0),
                        borderSide: BorderSide(color: secondaryColor),
                      ),
                    ),
                    // value: _selectedAvailability,
                    onChanged: (String? newValue) {

                    },
                    items: <String>[
                      'Yes',
                      'No',
                    ].map((String availability) {
                      return DropdownMenuItem<String>(
                        value: availability,
                        child: Text(availability),
                      );
                    }).toList(),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please select availability';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 20.0),
                  TextFormField(
                    controller: _descriptionController,
                    decoration: InputDecoration(
                      labelText: 'Description',
                      prefixIcon: Icon(Icons.description), // Add your desired icon here
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10.0),
                        borderSide: BorderSide(color: secondaryColor),
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter a description';
                      } else if (value.split(' ').length > 100) {
                        return 'Description should not exceed 100 words';
                      }
                      return null;
                    },
                    maxLines: null, // Allow multiple lines for description
                  ),
                  SizedBox(height: 20.0),
                  SizedBox(
                    height: 40,
                    child: ElevatedButton(
                      onPressed: () {
                        if (_formKey.currentState!.validate()) {
                          if (_selectedVendorTypeId != null) {
                            selectedVendorTypeId = int.tryParse(_selectedVendorTypeId!) ?? 0; // Use 0 as a default value if the conversion fails
                            print('Selected Vendor Type ID: $selectedVendorTypeId');
                          }
                          if (_selectedCityId != null) {
                            selectedCityId = int.tryParse(_selectedCityId!) ?? 0; // Use 0 as a default value if the conversion fails
                            print('Selected Vendor Type ID: $selectedCityId');
                          }
                          // Form is valid, you can process the vendor data here
                          String name = _nameController.text;
                          String email = _emailController.text;
                          // String selectedVendorType = _selectedVendorType;
                          String productOrServices = _productOrServicesController.text;
                          //String selectedCity = _selectedCity;
                          String address = _addressController.text;
                          String phoneNumber = _phoneController.text;
                          String website = _websiteController.text;
                          String description = _descriptionController.text;
                          String insuranceCoverage = _insuranceController.text;
                          String licensesPermits = _licensesController.text;
                          String preferredVenue = _preferredVenueController.text;
                          // For example, print the vendor data
                          print('Vendor Name: $name');
                          print('Vendor Email: $email');
                          //print('Vendor Type: $selectedVendorType');
                          print('Product or Services: $productOrServices');
                          // print('City: $selectedCity');
                          print('Address: $address');
                          print('Phone Number: $phoneNumber');
                          print('Website: $website');
                          print('Description: $description');
                          print('Insurance Coverage: $insuranceCoverage');
                          print('Licenses and Permits: $licensesPermits');
                          print('Preferred Venue: $preferredVenue');
                          postVendorData();
                          // You can save the vendor data or perform other actions here
                        }
                      },
                      child: Text('Add Vendor'),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _vendorTypeController.dispose();
    _productOrServicesController.dispose();
    _addressController.dispose();
    _phoneController.dispose();
    _websiteController.dispose();
    _descriptionController.dispose();
    _insuranceController.dispose();
    _licensesController.dispose();
    _preferredVenueController.dispose();
    _imagePathController.dispose();
    _socialMediaLinkController.dispose();
    super.dispose();
  }
}