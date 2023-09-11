import 'package:flutter/material.dart';

import '../../responsive.dart';

import '../dashboard/dashboard.dart';
import '../dashboard/dashboard_mobile.dart';
import 'components/side_menu.dart';



class MainScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // key: context.read<MenuAppController>().scaffoldKey,
        drawer: SideMenu(),
        body: Scaffold(
          // key: context.read<MenuAppController>().scaffoldKey,

          body: SafeArea(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // We want this side menu only for large screen
                if (Responsive.isDesktop(context))
                  Expanded(
                    // default flex = 1
                    // and it takes 1/6 part of the screen
                    child: SideMenu(),
                  ),
                Expanded(
                  // It takes 5/6 part of the screen
                  flex: 5,
                  child: Responsive(
                    mobile: DashBoardMobile(),
                    desktop: DashBoard(),

                  ),
                )
              ],
            ),
          ),
        )
    );
  }
}