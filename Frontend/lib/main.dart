import 'package:flutter/material.dart';
import 'package:frontend/pages/login_page.dart';
import 'package:frontend/pages/profile.dart';
import 'package:frontend/pages/vehicles.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'App xin quyền',
      initialRoute: '/',
      routes: {
        '/': (context) => const LoginPage(),
        '/profile': (context) => const ProfilePage(customerId: 150),// Đang gán Id cố đinh
        '/personaldata': (context) => const ProfilePage(customerId: 150),// Đang gán Id cố đinh
        '/vehicle': (context) => const VehiclesPage(customerId: 150),// Đang gán Id cố đinh
      },
    );
  }
}
