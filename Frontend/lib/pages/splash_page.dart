  import 'dart:io';
  import 'package:device_info_plus/device_info_plus.dart';
import 'package:flutter/material.dart';
  import 'package:flutter/services.dart';
  import 'package:permission_handler/permission_handler.dart';

  class SplashPage extends StatefulWidget {
    const SplashPage({super.key});

    @override
    State<SplashPage> createState() => _SplashPageState();
  }

  class _SplashPageState extends State<SplashPage> {
    @override
    void initState() {
      super.initState();
      WidgetsBinding.instance.addPostFrameCallback((_) {
        _checkPermissions();
      });
    }

    Future<void> _checkPermissions() async {
      //Only for Android
      if (!Platform.isAndroid) {
        SystemNavigator.pop();
        return;
      }

      final androidInfo = await DeviceInfoPlugin().androidInfo;
      final sdkInt = androidInfo.version.sdkInt;

      List<Permission> permissions = [
        Permission.camera,
        Permission.locationWhenInUse,
        sdkInt >= 33 ? Permission.photos : Permission.storage,
      ];

      for (final permission in permissions) {
        print("Requesting permission: $permission"); // Debug log
        final status = await permission.request();

        if (status.isPermanentlyDenied) {
          await _showDialog("Permission permanently  denied", permission);
          return;
        } else if (!status.isGranted) {
          await _showDialog("Permission denied", permission);
          return;
        }
      }

      if (!mounted) return;
      Navigator.pushReplacementNamed(context, '/login');

    }

    Future<void> _showDialog(String title, Permission permission) {
      return showDialog(
        context: context,
        barrierDismissible: false,
        builder: (_) => AlertDialog(
          title: Text(title),
          content: Text("You need to provide permission for ${permission.toString().split('.').last}"),
          actions: [
            TextButton(
              onPressed: () {
                openAppSettings();
                Navigator.of(context).pop();
              },
              child: const Text("Open Setting"),
            ),
            TextButton(
              onPressed: () => SystemNavigator.pop(),
              child: const Text("Close App"),
            ),
          ],
        ),
      );
    }

    @override
    Widget build(BuildContext context) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }
  }
