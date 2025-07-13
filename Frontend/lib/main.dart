import 'package:flutter/material.dart';
import 'package:frontend/pages/login_page.dart';
import 'package:frontend/pages/personalData/personal_data_detail_page.dart';
import 'package:frontend/pages/personalData/personal_datas_page.dart';
import 'package:frontend/pages/personalData/new_personal_data_page.dart';
import 'package:frontend/pages/profile/profile_page.dart';
import 'package:frontend/pages/vehicles/new_vehicle_page.dart';
import 'package:frontend/pages/vehicles/vehicle_detail_page.dart';
import 'package:frontend/pages/vehicles/vehicles_page.dart';

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
        '/personalData': (context) => PersonalDatasPage(customerId: 150),
        '/vehicle': (context) => VehiclesPage(customerId: 150),
        '/newVehicle': (context) => NewVehiclePage(customerId: 150),
      },
      onGenerateRoute: (settings) {
        if (settings.name == '/vehicleDetail') {
          final vehicle = settings.arguments as Map<String, dynamic>;
          return MaterialPageRoute(
            builder: (context) => VehicleDetailPage(vehicle: vehicle),
          );
        }

        if (settings.name == '/newPersonalData') {
          final args = settings.arguments as Map<String, dynamic>;
          return MaterialPageRoute(
            builder:
                (_) => NewPersonalDataPage(
                  customerId: args['customerId'],
                  availableTypes: List<String>.from(args['availableTypes']),
                ),
          );
        }

        if (settings.name == '/personalDataDetail') {
          final personalData = settings.arguments as Map<String, dynamic>;
          return MaterialPageRoute(
            builder:
                (context) => PersonalDataDetailPage(
                  customerId: 150,
                  personalData: personalData,
                ),
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
