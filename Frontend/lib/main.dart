import 'package:flutter/material.dart';
import 'package:frontend/screens/customer/discount/vouchers_page.dart';
import 'package:frontend/screens/customer/documentary/documentaries_page.dart';
import 'package:frontend/screens/customer/documentary/documentary_detail_page.dart';
import 'package:frontend/screens/customer/documentary/new_documentary_page.dart';
import 'package:frontend/screens/customer/login_page.dart';
import 'package:frontend/screens/customer/personalData/new_personal_data_page.dart';
import 'package:frontend/screens/customer/personalData/personal_data_detail_page.dart';
import 'package:frontend/screens/customer/profile/profile_page.dart';
import 'package:frontend/screens/customer/ranks_info_page.dart';
import 'package:frontend/screens/customer/vehicles/new_vehicle_page.dart';
import 'package:frontend/screens/customer/vehicles/vehicle_detail_page.dart';
import 'package:frontend/screens/customer/vehicles/vehicles_page.dart';
import 'package:frontend/screens/payment/new_payment_page.dart';
import 'package:frontend/screens/payment/payment_detail_page.dart';
import 'package:frontend/screens/payment/payment_page.dart';
import 'package:frontend/screens/payment/payments_page.dart';
void main() {
  WidgetsFlutterBinding.ensureInitialized();
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
        '/ranks': (context) => RanksInfoPage(),
        '/payments' : (context) => PaymentsPage(),
        '/newPayment' : (context) => NewPayemtPage(),
        '/payment' : (context) => PaymentPage(), //Bỏ khi ghép payment xong
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


        if (settings.name == '/paymentDetail') {
          final payment = settings.arguments as Map<String, dynamic>;
          return MaterialPageRoute(
              builder: (context) => PaymentDetailPage(payment: payment)
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
