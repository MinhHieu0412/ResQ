import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:frontend/models/auth/login_response.dart';
import 'package:frontend/services/customerAPI.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'package:intl/intl.dart';

class NewPayemtPage extends StatefulWidget {

  const NewPayemtPage({super.key});

  @override
  State<NewPayemtPage> createState() => _NewPayemtPageState();
}

class _NewPayemtPageState extends State<NewPayemtPage> {
  int? userId = loginResponse?.userId;

  final TextEditingController methodController = TextEditingController();
  final TextEditingController nameController = TextEditingController();
  final TextEditingController paypalEmailController = TextEditingController();

  Map<String, String> _errors = {};

  @override
  void initState() {
    super.initState();
    methodController.text = "PAYPAL";
  }

  void _handleSave() async {
    final method = methodController.text.trim();
    final name = nameController.text.trim();
    final paypalEmail = paypalEmailController.text.trim();

    final dto = {
      "method": method,
      "name": name,
      "paypalEmail": paypalEmail,
    };

    final result = await ApiService.createPayment(
      customerId: userId!,
      paymentDto: dto,
    );

    final bool success = result["success"] == true;
    if (success) {
      setState(() => _errors.clear());
      _showDialog("Add Success", "Your payment has been added!");
    } else {
      final dynamic errors = result["errors"];
      setState(() {
        _errors = (errors is Map)
            ? errors.map((k, v) => MapEntry(k.toString(), v.toString()))
            : {};
      });
    }
  }

  void _showDialog(String title, String message) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: Center(
          child: Text(title, style: TextStyle(color: Colors.green[900], fontWeight: FontWeight.bold, fontSize: 23)),
        ),
        content: Text(message),
      ),
    );

    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        Navigator.of(context, rootNavigator: true).pop();
        Navigator.pop(context, true);
      }
    });
  }

  Widget _buildInput(
      TextEditingController controller, {
        required String fieldName,
        String? hintText,
        TextInputType keyboardType = TextInputType.text,
        List<TextInputFormatter>? inputFormatters,
        VoidCallback? onTap,
      }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          height: 56,
          child: TextField(
            controller: controller,
            readOnly: onTap != null,
            onTap: onTap,
            keyboardType: keyboardType,
            inputFormatters: inputFormatters,
            decoration: InputDecoration(
              hintText: hintText,
              contentPadding: const EdgeInsets.symmetric(horizontal: 12),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
              errorText: _errors[fieldName],
            ),
          ),
        ),
        const SizedBox(height: 4),
      ],
    );
  }

  static const TextStyle _labelStyle = TextStyle(
    fontFamily: "Raleway",
    fontWeight: FontWeight.bold,
    fontSize: 16,
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Color(0xFF013171),
        centerTitle: true,
        title: const Text("New Payment", style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700, color: Colors.white)),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text("Payment Method:", style: _labelStyle),
            const SizedBox(height: 6),
            TextField(
              controller: methodController,
              readOnly: true,
              style: const TextStyle(color: Colors.black87, fontWeight: FontWeight.w500),
              decoration: InputDecoration(
                filled: true,
                fillColor: Colors.grey.shade200,
                contentPadding: const EdgeInsets.symmetric(horizontal: 12),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
              ),
            ),
            const SizedBox(height: 20),
            const Text("Paypal Account Name:", style: _labelStyle),
            const SizedBox(height: 6),
            _buildInput(nameController, fieldName: "name"),
            const SizedBox(height: 20),
            const Text("Paypal Email:", style: _labelStyle),
            const SizedBox(height: 6),
            _buildInput(paypalEmailController, fieldName: "paypalEmail"),
            const SizedBox(height: 30),
            Center(
              child: ElevatedButton(
                onPressed: _handleSave,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color(0xFF013171),
                  padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                ),
                child: const Text(
                  "Save",
                  style: TextStyle(fontSize: 17, color: Colors.white, fontFamily: 'Lexend'),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
