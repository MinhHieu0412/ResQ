import 'package:flutter/material.dart';
import 'package:frontend/screens/customer/discount/vouchers_page.dart';
import 'package:frontend/screens/customer/documentary/documentaries_page.dart';
import 'package:frontend/screens/customer/documentary/documentary_detail_page.dart';
import 'package:frontend/screens/customer/documentary/new_documentary_page.dart';
import 'package:frontend/screens/customer/login_page.dart';
import 'package:frontend/screens/customer/personalData/new_personal_data_page.dart';
import 'package:frontend/screens/customer/personalData/personal_data_detail_page.dart';
import 'package:frontend/screens/customer/profile/profile_page.dart';
import 'package:frontend/screens/customer/vehicles/new_vehicle_page.dart';
import 'package:frontend/screens/customer/vehicles/vehicle_detail_page.dart';
import 'package:frontend/screens/customer/vehicles/vehicles_page.dart';
void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ResQ',
      initialRoute: '/',
      routes: {
        '/': (context) => LoginPage(),
        '/profile': (context) => ProfilePage(customerId: 150),
        '/newPersonalData': (context) => NewPersonalDataPage(customerId: 150),
        '/personalDataDetail': (context) =>
            PersonalDataDetailPage(customerId: 150),
        '/documentary': (context) => DocumentariesPage(customerId: 150),
        '/newDocument': (context) => NewDocumentaryPage(customerId: 150),
        '/vehicle': (context) => VehiclesPage(customerId: 150),
        '/newVehicle': (context) => NewVehiclePage(customerId: 150),
        '/discount': (context) => VouchersPage(),
      },
      onGenerateRoute: (settings) {
        if (settings.name == '/vehicleDetail') {
          final vehicle = settings.arguments as Map<String, dynamic>;
          return MaterialPageRoute(
            builder: (context) => VehicleDetailPage(vehicle: vehicle),
          );
        }

        if (settings.name == '/documentDetail') {
          final document = settings.arguments as Map<String, dynamic>;
          return MaterialPageRoute(
              builder: (context) => DocumentaryDetailPage(document: document, customerId: 150,)
          );
        }

        // fallback nếu route không khớp
        return MaterialPageRoute(
        builder:
        (context) =>
        const Scaffold(body: Center(child: Text('Page not found'))),
        );
      },
    );
  }
}
