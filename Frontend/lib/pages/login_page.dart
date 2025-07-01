import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:permission_handler/permission_handler.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  String _permissionStatus = "🔄 Đang kiểm tra quyền...";

  @override
  void initState() {
    super.initState();

    if (Platform.isAndroid) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        requestAllPermissions();
      });
    } else {
      // Nếu là iOS thì thoát app luôn (nếu bạn chỉ dùng Android)
      SystemNavigator.pop();
    }
  }

  Future<void> requestAllPermissions() async {
    List<Permission> permissions = [
      Permission.camera,
      Permission.locationWhenInUse,
      Platform.version.compareTo('13') >= 0
          ? Permission.photos // Android 13+
          : Permission.storage // Android ≤ 12
    ];

    for (final perm in permissions) {
      final status = await perm.request();

      if (!status.isGranted) {
        if (status.isPermanentlyDenied) {
          await _showPermanentDeniedDialog(perm);
        } else {
          await _showDeniedDialog(perm);
        }
        return;
      }
    }

    setState(() => _permissionStatus = "✅ Đã được cấp đầy đủ quyền.");
  }

  Future<void> _showDeniedDialog(Permission perm) async {
    await showDialog(
      context: context,
      barrierDismissible: false,
      builder: (_) => AlertDialog(
        title: const Text("Thiếu quyền"),
        content: Text(
          "Bạn đã từ chối quyền: ${perm.toString().split('.').last}\nỨng dụng sẽ thoát.",
        ),
        actions: [
          TextButton(
            onPressed: () => SystemNavigator.pop(),
            child: const Text("OK"),
          ),
        ],
      ),
    );
  }

  Future<void> _showPermanentDeniedDialog(Permission perm) async {
    final result = await showDialog<bool>(
      context: context,
      barrierDismissible: false,
      builder: (_) => AlertDialog(
        title: const Text("Quyền bị từ chối vĩnh viễn"),
        content: Text(
          "Quyền '${perm.toString().split('.').last}' đã bị từ chối vĩnh viễn.\n"
              "Vui lòng vào Cài đặt để cấp lại.",
        ),
        actions: [
          TextButton(
            onPressed: () {
              openAppSettings();
              Navigator.of(context).pop(false); // Không thoát
            },
            child: const Text("Mở Cài đặt"),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(true), // Thoát
            child: const Text("Thoát"),
          ),
        ],
      ),
    );

    if (result == true) {
      SystemNavigator.pop();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Đăng nhập")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(_permissionStatus, style: const TextStyle(fontSize: 18)),
            const SizedBox(height: 30),
            ElevatedButton(
              onPressed: () {
                // TODO: Xử lý đăng nhập
              },
              child: const Text("Đăng nhập"),
            ),
            //Setting Button for reset permission
            const SizedBox(height: 10),
            TextButton(
              onPressed: () {
                openAppSettings();
              },
              child: const Text("Open App Setting"),
            ),
          ],
        ),
      ),
    );
  }
}
