import 'package:flutter/material.dart';
import '../main/components/side_menu.dart';
import '../../constants.dart';
import '../dashboard/components/form_vendor.dart';



class DashBoard extends StatefulWidget {
  const DashBoard({Key? key}) : super(key: key);

  @override
  State<DashBoard> createState() => _DashBoardState();
}

class _DashBoardState extends State<DashBoard> {

  @override
  Widget build(BuildContext context) {
    bool isMobile(BuildContext context) =>
        MediaQuery.of(context).size.width < 850;


    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(kToolbarHeight + 40.0), // Adjust the height as needed
        child: Container(
          margin: EdgeInsets.all(20.0), // Add margin here
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16.0), // Rounded corners
            color: secondaryColor, // Background color
          ),
          child: AppBar(
            title: const Text('Dashboard'),
            backgroundColor: Colors.transparent, // Make the AppBar background transparent
            elevation: 0, // Remove the AppBar shadow
            actions: <Widget>[
              Container(
                margin: EdgeInsets.all(8.0), // Adjust the margin as needed
                child: ElevatedButton (
                  onPressed: (){
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context) => VendorForm(), // Replace with your HomePage widget
                      ),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    primary: Colors.blue, // Set the button background color to blue
                    onPrimary: Colors.white, // Set the text color to white
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12.0), // Set the border radius
                      side: BorderSide(color: Colors.blue), // Set the border color
                    ),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min, // Set the Row to take the minimum space
                    children: [
                      Icon(Icons.add, color: Colors.white), // Icon with white color
                      const SizedBox(width: 8),
                      Text(
                        'Add Vendor',
                        style: TextStyle(color: Colors.white), // Text with white color
                      ),
                    ],
                  ),
                ),
              ),
              SizedBox(width: 10,),

              Container(
                margin: EdgeInsets.all(8.0), // Adjust the margin as needed
                child: ElevatedButton (
                  onPressed: (){},
                  style: ElevatedButton.styleFrom(
                    primary: Colors.blue, // Set the button background color to blue
                    onPrimary: Colors.white, // Set the text color to white
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12.0), // Set the border radius
                      side: BorderSide(color: Colors.blue), // Set the border color
                    ),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min, // Set the Row to take the minimum space
                    children: [
                      Icon(Icons.add, color: Colors.white), // Icon with white color
                      const SizedBox(width: 8),
                      Text(
                        'Add Venue',
                        style: TextStyle(color: Colors.white), // Text with white color
                      ),
                    ],
                  ),
                ),
              ),
              SizedBox(width: 10,),


            ],
          ),

        ),
      ),
      drawer: isMobile(context) ? SideMenu() : null,

    );

  }
}