import 'package:flutter/material.dart';
import 'package:frontend/pages/login_page.dart';
import 'package:frontend/pages/personalData/update_personal_data.dart';
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
        '/': (context) => const LoginPage(),
        '/profile': (context) => const ProfilePage(customerId: 150),
        '/updatePersonalData': (context) => const UpdatePersonalData(),
        '/personalData': (context) => const ProfilePage(customerId: 150),
        '/vehicle': (context) => const VehiclesPage(customerId: 150),
        '/newVehicle': (context) => const NewVehiclePage(),
      },
      onGenerateRoute: (settings) {
        if (settings.name == '/vehicleDetail') {
          final vehicle = settings.arguments as Map<String, dynamic>;
          return MaterialPageRoute(
            builder: (context) => VehicleDetailPage(vehicle: vehicle),
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
