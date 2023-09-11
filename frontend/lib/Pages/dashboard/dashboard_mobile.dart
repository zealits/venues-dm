import 'package:flutter/material.dart';
import '../main/components/side_menu.dart';
import '../../constants.dart';
import '../dashboard/components/form_vendor.dart';

class DashBoardMobile extends StatefulWidget {
  const DashBoardMobile({Key? key}) : super(key: key);

  @override
  State<DashBoardMobile> createState() => _DashBoardMobileState();
}

class _DashBoardMobileState extends State<DashBoardMobile> {
  @override
  Widget build(BuildContext context) {
    bool isMobile(BuildContext context) =>
        MediaQuery.of(context).size.width < 850;

    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(kToolbarHeight + 25.0),
        child: Container(
          margin: EdgeInsets.all(10.0),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16.0),
            color: secondaryColor,
          ),
          child: AppBar(
            title: const Text('Dashboard'),
            backgroundColor: Colors.transparent,
            elevation: 0,
            actions: <Widget>[
              PopupMenuButton<String>(

                onSelected: (value) {
                  // Handle the selected option
                  if (value == 'addVendor') {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context) => VendorForm(),
                      ),
                    );
                  } else if (value == 'addVenue') {

                  }
                },
                itemBuilder: (BuildContext context) => <PopupMenuEntry<String>>[

                  PopupMenuItem<String>(
                    value: 'addVendor',
                    child: Row(
                      children: [
                        Icon(Icons.person_add),
                        SizedBox(width: 8),
                        Text('Add Vendor'),
                      ],
                    ),
                  ),
                  PopupMenuItem<String>(
                    value: 'Add Venue',
                    child: Row(
                      children: [
                        Icon(Icons.person_add),
                        SizedBox(width: 8),
                        Text('Add Venue'),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
      drawer: isMobile(context) ? SideMenu() : null,
    );
  }
}