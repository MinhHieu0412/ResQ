import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:device_info_plus/device_info_plus.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  String _permissionStatus = "🔄 Checking permission...";
  bool _checkingPermission = false;

  @override
  void initState() {
    super.initState();

    if (!Platform.isAndroid) {
      SystemNavigator.pop();
    } else {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        _checkPermissions();
      });
    }
  }

  //Viết hoa quyền
  String capitalize(String s) {
    if (s.isEmpty) return s;
    return s[0].toUpperCase() + s.substring(1);
  }

  Future<void> _checkPermissions() async {
    try {
      //Info thiết bị
      final androidInfo = await DeviceInfoPlugin().androidInfo;
      final sdkInt = androidInfo.version.sdkInt;

      //List danh sách các quyền cần xin
      List<Permission> permissions = [
        Permission.camera,
        Permission.locationWhenInUse,
        sdkInt >= 33 ? Permission.photos : Permission.storage,
      ];

      //Xin từng quyền và xử lý kết quả
      for (final permission in permissions) {
        final status = await permission.request();
        if (status.isPermanentlyDenied) {
          await _showPermissionDialog(
            "Permission denied permanently ",
            permission,
          );
          return;
        } else if (!status.isGranted) {
          await _showPermissionDialog("Permission denied", permission);
          return;
        }
      }
    } catch (e) {
      setState(() {
        _permissionStatus = "❌ Error checking permission: $e";
        _checkingPermission = false;
      });
    }
  }

  //Hiển thị nội dung xử lý quyền
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
              "You need to give permission for ${capitalize(permission.toString().split('.').last)} to continue.",
            ),
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
    return Scaffold(
      appBar: AppBar(title: const Text("Login")),
      body: Center(
        child:
            _checkingPermission
                ? const CircularProgressIndicator()
                : Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    //Chỉ dùng để test quyền, nên bỏ khi ghép trang login hoặc comment lại để sau kiểm tra lỗi
                    Text(
                      _permissionStatus,
                      style: const TextStyle(fontSize: 18),
                    ),
                    const SizedBox(height: 30),
                    ElevatedButton(
                      onPressed: () {
                        // TODO: Xử lý đăng nhập
                      },
                      child: const Text("Login"),
                    ),
                    //Xóa sau khi ghép
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
                        Navigator.pushNamed(context, '/personalData');
                      },
                      child: const Text("Go to Personal Data"),
                    ),
                    const SizedBox(height: 10),
                    ElevatedButton(
                      onPressed: () {
                        Navigator.pushNamed(context, '/vehicle');
                      },
                      child: const Text("Go to vehicle"),
                    ),
                    //Có thể bỏ sau khi test xong
                    const SizedBox(height: 10),
                    TextButton(
                      onPressed: () {
                        openAppSettings();
                      },
                      child: const Text("Open Setting"),
                    ),
                  ],
                ),
      ),
    );
  }
}
