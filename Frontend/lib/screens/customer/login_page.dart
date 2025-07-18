import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:frontend/screens/payment/PaymentPage.dart';
import 'package:frontend/services/customerAPI.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:device_info_plus/device_info_plus.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> with WidgetsBindingObserver {
  bool _checkingPermission = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);

    if (!Platform.isAndroid) {
      SystemNavigator.pop();
    } else {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        _checkPermissions();
      });
    }
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) {
      _checkPermissions(); // Chheck permission when comeback app
    }
  }

  // Show format
  String capitalize(String s) {
    if (s.isEmpty) return s;
    return s[0].toUpperCase() + s.substring(1);
  }

  // Check permission
  Future<void> _checkPermissions() async {
    setState(() {
      _checkingPermission = true;
    });

    try {
      //Set Android
      final androidInfo = await DeviceInfoPlugin().androidInfo;
      final sdkInt = androidInfo.version.sdkInt;

      List<Permission> permissions = [
        Permission.camera,
        Permission.locationWhenInUse,
        sdkInt >= 33 ? Permission.photos : Permission.storage, //Version check
      ];

      // Step 1: Required permission
      final Map<Permission, PermissionStatus> statuses =
          await permissions.request();

      // Step 2: Check permission
      for (final permission in permissions) {
        final status = await permission.status;

        if (!status.isGranted) {
          setState(() {
            _checkingPermission = false;
          });

          await _showPermissionDialog("Permission required", permission);
          return;
        }
      }

      // Nếu tất cả đều đã được cấp
      setState(() {
        _checkingPermission = false;
      });
    } catch (e) {
      setState(() {
        _checkingPermission = false;
      });
    }
  }

  //Show dialog when denied
  Future<void> _showPermissionDialog(
    String title,
    Permission permission,
  ) async {
    await showDialog(
      context: context,
      barrierDismissible: false,
      builder:
          (_) => AlertDialog(
            title: Text(title),
            content: Text(
              "You need to grant ${capitalize(permission.toString().split('.').last)} permission to continue.",
            ),
            actions: [
              TextButton(
                onPressed: () {
                  openAppSettings(); // Mở App Settings
                  Navigator.of(context).pop();
                },
                child: const Text("Open Settings"),
              ),
              TextButton(
                onPressed: () {
                  SystemNavigator.pop(); //Close app when denied permission
                },
                child: const Text("Close App"),
              ),
            ],
          ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Login")),
      body: Center(
        child:
            _checkingPermission
                ? const CircularProgressIndicator()
                : Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    ElevatedButton(
                      onPressed: () {
                        Navigator.pushNamed(context, '/payment');
                      },
                      child: const Text('Payment'),
                    ),
                    const SizedBox(height: 10),
                    ElevatedButton(
                      onPressed: () {
                        Navigator.pushNamed(context, '/discount');
                      },
                      child: const Text("Go to Discount Vouchers"),
                    ),
                    const SizedBox(height: 10),
                    ElevatedButton(
                      onPressed: () {
                        Navigator.pushNamed(context, '/profile');
                      },
                      child: const Text("Go to Profile"),
                    ),
                    const SizedBox(height: 10),
                    ElevatedButton(
                      onPressed: () {
                        Navigator.pushNamed(context, '/newPersonalData');
                      },
                      child: const Text("Go to New Personal Data"),
                    ),
                    const SizedBox(height: 10),
                    ElevatedButton(
                      onPressed: () {
                        Navigator.pushNamed(context, '/personalDataDetail');
                      },
                      child: const Text("Go to Update Personal Data"),
                    ),
                    const SizedBox(height: 10),
                    ElevatedButton(
                      onPressed: () {
                        Navigator.pushNamed(context, '/vehicle');
                      },
                      child: const Text("Go to Vehicle"),
                    ),
                    const SizedBox(height: 10),
                    ElevatedButton(
                      onPressed: () {
                        Navigator.pushNamed(context, '/documentary');
                      },
                      child: const Text("Go to Document"),
                    ),
                    const SizedBox(height: 10),
                    TextButton(
                      onPressed: () {
                        openAppSettings();
                      },
                      child: const Text("Open Settings"),
                    ),
                  ],
                ),
      ),
    );
  }
}
