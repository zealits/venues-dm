import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:flutter/services.dart';
import '../../../constants.dart';
import 'dart:io';
import 'dart:convert';
import 'package:http/http.dart' as http;

class VendorType {
  final String name;
  final int id;

  VendorType(this.name, this.id);
}

class City {
  final String name;
  final int id;

  City(this.name, this.id);
}

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
  String? _selectedVendorType;
  String? _selectedCity;
  VendorType? vendorType;
  City? citiess;

  // Fetch vendor types and cities from Django API
  Future<List<String>> fetchVendorTypes() async {
    final response = await http.get(Uri.parse('http://127.0.0.1:8000/api/vendor-types/'));
    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((type) => type['type_name'].toString()).toList();
    } else {
      throw Exception('Failed to load vendor types');
    }
  }

  Future<List<VendorType>> fetchVendorType() async {
    final response = await http.get(Uri.parse('http://127.0.0.1:8000/api/vendor-types/'));
    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      final List<VendorType> vendorTypes = data.map((type) {
        return VendorType(type['type_name'].toString(), type['vendor_type_id'] as int);
      }).toList();
      return vendorTypes;
    } else {
      throw Exception('Failed to load vendor types');
    }
  }

  List<VendorType> vendortypes = [];

  Future<void> loadVendorTypes() async {
    try {
      final vendorTypes = await fetchVendorType();
      setState(() {
        vendortypes = vendorTypes;
      });
    } catch (error) {
      // Handle errors, e.g., display an error message
      print('Failed to load vendor types: $error');
    }
  }




  Future<List<String>> fetchCities() async {
    final response = await http.get(Uri.parse('http://127.0.0.1:8000/api/cities/'));
    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((city) => city['city_name'].toString()).toList();
    } else {
      throw Exception('Failed to load cities');
    }
  }

  Future<List<City>> fetchCity() async {
    final response = await http.get(Uri.parse('http://127.0.0.1:8000/api/cities/'));
    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      final List<City> cities = data.map((city) {
        return City(city['city_name'].toString(), city['city_id'] as int);
      }).toList();
      return cities;
    } else {
      throw Exception('Failed to load cities');
    }
  }


  List<City> cities = [];

  Future<void> loadCities() async {
    try {
      final citiess = await fetchCity();
      setState(() {
        cities = citiess;
      });
    } catch (error) {
      // Handle errors, e.g., display an error message
      print('Failed to load cities: $error');
    }
  }

// Call loadVendorTypes inside your StatefulWidget
  @override
  void initState() {
    super.initState();
    loadVendorTypes();
    loadCities();
  }


  Future<void> postVendorData() async {
    final url = Uri.parse('http://127.0.0.1:8000/api/vendors/');

    VendorType? selectedVendorType;
    City? selectedCity;

    if(citiess != null){
      selectedCity = cities.firstWhere(
              (cities) => cities.name == _selectedCity
      );
    }

    if (vendorType != null) {
      selectedVendorType = vendortypes.firstWhere(
              (vendorType) => vendorType.name == _selectedVendorType
      );
    }
    int? vendorTypeId;
    if(selectedVendorType != null){
      int vendorTypeId= selectedVendorType.id;
    }
    int? cityId;
    if(selectedCity != null){
      int cityId= selectedCity.id;
    }
    final vendorData = {
      'name': _nameController.text,
      'contact_email': _emailController.text,
      'vendor_type': vendorTypeId, // Assuming this is the vendor type ID
      'products_or_services': _productOrServicesController.text,
      'city': cityId, // Assuming this is the city ID
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
      final vendorId = responseData['vendor_id'];
      // Now, you can post the image with the vendor ID
      await postVendorImage(vendorId);
    } else {
      // Handle errors, display an error message, etc.
      print('Failed to add vendor: ${response.statusCode}');
      print('Response body: ${response.body}');
    }
  }


  Future<void> postVendorImage(int vendorId) async {
    final url = Uri.parse('http://127.0.0.1:8000/api/vendor-photos/');
    final imageFile = File(_imagePathController.text);

    final request = http.MultipartRequest('POST', url)
      ..fields['vendor'] = vendorId.toString()
      ..files.add(
        await http.MultipartFile.fromPath('photo', imageFile.path),
      );

    final response = await request.send();

    if (response.statusCode == 201) {
      // Image uploaded successfully, you can handle success here
      print('Image uploaded successfully');
    } else {
      // Handle errors, display an error message, etc.
      print('Failed to upload image: ${response.statusCode}');
    }
  }



//Image Function
  void _pickImage() async {
    final pickedImage = await _imagePicker.pickImage(source: ImageSource.gallery);

    if (pickedImage != null) {
      setState(() {
        _imagePathController.text = pickedImage.path; // Update the text in the TextField
      });
    }
  }


  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;

    // List of vendor types
    List<String> _vendorTypes = [
      'Type 1',
      'Type 2',
      'Type 3',
    ];
    // List of Cities
    List<String> _cities = [
      'City 1',
      'City 2',
      'City 3',
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
                  FutureBuilder<List<String>>(
                    future: fetchVendorTypes(),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return CircularProgressIndicator();
                      } else if (snapshot.hasError) {
                        return Text('Error: ${snapshot.error}');
                      } else {
                        final vendorTypes = snapshot.data;

                        return DropdownButtonFormField<String>(
                          value: _selectedVendorType,
                          onChanged: (String? newValue) {
                            setState(() {
                              _selectedVendorType = newValue;
                            });
                          },
                          items: vendorTypes!.map((String vendorType) {
                            return DropdownMenuItem<String>(
                              value: vendorType,
                              child: Text(vendorType),
                            );
                          }).toList(),
                          decoration: InputDecoration(
                            labelText: 'Vendor Type',
                            prefixIcon: Icon(Icons.category),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10.0),
                              borderSide: BorderSide(color: secondaryColor),
                            ),
                          ),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Please select the vendor type';
                            }
                            return null;
                          },
                        );
                      }
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
                  FutureBuilder<List<String>>(
                    future: fetchCities(),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return CircularProgressIndicator();
                      } else if (snapshot.hasError) {
                        return Text('Error: ${snapshot.error}');
                      } else {
                        final cities = snapshot.data;

                        return DropdownButtonFormField<String>(
                          value: _selectedCity,
                          onChanged: (String? newValue) {
                            setState(() {
                              _selectedCity = newValue;
                            });
                          },
                          items: cities!.map((String city) {
                            return DropdownMenuItem<String>(
                              value: city,
                              child: Text(city),
                            );
                          }).toList(),
                          decoration: InputDecoration(
                            labelText: 'City',
                            prefixIcon: Icon(Icons.location_city),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10.0),
                              borderSide: BorderSide(color: secondaryColor),
                            ),
                          ),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Please select a city';
                            }
                            return null;
                          },
                        );
                      }
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
                  TextField(
                    controller: _imagePathController,
                    decoration: InputDecoration(
                      labelText: 'Upload Image',
                      prefixIcon: Icon(Icons.image),
                      suffixIcon: IconButton(
                        onPressed: _pickImage,
                        icon: Icon(Icons.upload),

                      ),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10.0),
                        borderSide: BorderSide(color: secondaryColor),
                      ),

                    ),


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
                          // Form is valid, you can process the vendor data here

                          postVendorData();

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
                          bool availability=_isAvailable;
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
                          print('Availability : $availability');

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