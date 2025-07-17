import 'package:flutter/material.dart';
import 'package:resq_app/screens/customer/home_profile.dart';
import 'package:resq_app/services/auth_service.dart';
import 'package:resq_app/models/auth/register.dart';
import 'package:resq_app/models/auth/login_request.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class RegisterScreen extends StatefulWidget {
  final String phoneNumber;

  const RegisterScreen({Key? key, required this.phoneNumber}) : super(key: key);

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final fullNameController = TextEditingController();
  final emailController = TextEditingController();
  final dobController = TextEditingController();
  final passwordController = TextEditingController();
  final confirmPasswordController = TextEditingController();

  String gender = 'Male';

  @override
  void dispose() {
    fullNameController.dispose();
    emailController.dispose();
    dobController.dispose();
    passwordController.dispose();
    confirmPasswordController.dispose();
    super.dispose();
  }

  void handleRegister() async {
    if (_formKey.currentState!.validate()) {
      final request = Register(
        fullName: fullNameController.text,
        password: passwordController.text,
        email:
            emailController.text.trim().isEmpty
                ? ''
                : emailController.text.trim(),
        phoneNumber: widget.phoneNumber,
        gender: gender,
        dob: dobController.text,
      );

      final registerResult = await AuthService().register(request);

      if (registerResult.statusCode == 200) {
        final loginRequest = LoginRequest(
          phoneNumber: widget.phoneNumber,
          password: passwordController.text,
        );

        final loginResponse = await AuthService.login(loginRequest);

        if (loginResponse != null) {
          final prefs = await SharedPreferences.getInstance();
          await prefs.setString(
            'login_response',
            jsonEncode(loginResponse.toJson()),
          );

          if (!mounted) return;
          Navigator.pushAndRemoveUntil(
            context,
            MaterialPageRoute(
              builder: (_) => HomeProfilePage(loginResponse: loginResponse),
            ),
            (route) => false,
          );
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text("Login failed after registration")),
          );
        }
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Register failed: ${registerResult.body}")),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF013171),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        centerTitle: true,
        title: const Text(
          'Register',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text("Fullname"),
              TextFormField(
                controller: fullNameController,
                validator:
                    (value) =>
                        value == null || value.isEmpty
                            ? 'Required field'
                            : null,
              ),
              const SizedBox(height: 12),

              TextFormField(
                initialValue: widget.phoneNumber,
                readOnly: true,
                decoration: const InputDecoration(labelText: 'Phone Number'),
              ),
              const SizedBox(height: 12),

              const Text("Email (optional)"),
              TextFormField(
                controller: emailController,
                validator: (value) {
                  if (value != null && value.isNotEmpty) {
                    final emailRegex = RegExp(r'^[^@]+@[^@]+\.[^@]+\$');
                    if (!emailRegex.hasMatch(value)) {
                      return 'Invalid email format';
                    }
                  }
                  return null;
                },
              ),
              const SizedBox(height: 12),

              const Text("Date of Birth"),
              TextFormField(
                controller: dobController,
                validator:
                    (value) =>
                        (value == null || value.isEmpty)
                            ? 'Please select your birth date'
                            : null,
                onTap: () async {
                  FocusScope.of(context).requestFocus(FocusNode());
                  final date = await showDatePicker(
                    context: context,
                    firstDate: DateTime(1900),
                    lastDate: DateTime.now(),
                    initialDate: DateTime(2000),
                  );
                  if (date != null) {
                    dobController.text = "${date.toLocal()}".split(' ')[0];
                  }
                },
              ),
              const SizedBox(height: 12),

              const Text("Gender"),
              Row(
                children: [
                  Radio<String>(
                    value: 'Male',
                    groupValue: gender,
                    onChanged: (val) => setState(() => gender = val!),
                  ),
                  const Text("Male"),
                  Radio<String>(
                    value: 'Female',
                    groupValue: gender,
                    onChanged: (val) => setState(() => gender = val!),
                  ),
                  const Text("Female"),
                  Radio<String>(
                    value: 'Other',
                    groupValue: gender,
                    onChanged: (val) => setState(() => gender = val!),
                  ),
                  const Text("Other"),
                ],
              ),
              const SizedBox(height: 12),

              const Text("Password"),
              TextFormField(
                obscureText: true,
                controller: passwordController,
                validator:
                    (value) =>
                        value == null || value.isEmpty
                            ? 'Required field'
                            : null,
              ),
              const SizedBox(height: 12),

              const Text("Confirm Password"),
              TextFormField(
                obscureText: true,
                controller: confirmPasswordController,
                validator: (value) {
                  if (value != passwordController.text) {
                    return 'Passwords do not match';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 24),

              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: handleRegister,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFBB0000),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 14),
                  ),
                  child: const Text('Register', style: TextStyle(fontSize: 16)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
