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
import 'package:frontend/screens/payment/PaymentPage.dart';
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
        '/profile': (context) => ProfilePage(),
        '/newPersonalData': (context) => NewPersonalDataPage(),
        '/personalDataDetail': (context) =>
            PersonalDataDetailPage(),
        '/documentary': (context) => DocumentariesPage(),
        '/newDocument': (context) => NewDocumentaryPage(),
        '/vehicle': (context) => VehiclesPage(),
        '/newVehicle': (context) => NewVehiclePage(),
        '/discount': (context) => VouchersPage(),
        '/payment' : (context) => PaymentPage(),
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
              builder: (context) => DocumentaryDetailPage(document: document)
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
