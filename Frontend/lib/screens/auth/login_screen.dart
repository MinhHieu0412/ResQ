import 'package:flutter/material.dart';
import 'package:frontend/models/auth/login_request.dart';
import 'package:frontend/screens/auth/verify_phone_screen.dart';
import 'package:frontend/services/auth_service.dart';
import '../customer/home_profile.dart';
import 'package:flutter/services.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController loginController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  bool isLoading = false;

  void _handleLogin() async {
    final phone = loginController.text.trim();
    final pass = passwordController.text.trim();

    if (phone.isEmpty || pass.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please enter both phone number and password'),
        ),
      );
      return;
    }

    if (phone.length < 9 ||
        phone.length > 10 ||
        !RegExp(r'^\d+$').hasMatch(phone)) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Phone number must be 9–10 digits only')),
      );
      return;
    }

    setState(() {
      isLoading = true;
    });

    final request = LoginRequest(phoneNumber: phone, password: pass);

    final response = await AuthService.login(request);

    setState(() {
      isLoading = false;
    });

    if (response != null) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Welcome ${response.userName}!')));

      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => HomeProfilePage(loginResponse: response)),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Login failed. Please try again.')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 24),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const SizedBox(height: 16),

                // Welcome text
                const Text(
                  'WELCOME TO',
                  style: TextStyle(
                    fontSize: 16,
                    letterSpacing: 1.2,
                    fontWeight: FontWeight.w300,
                  ),
                ),

                const SizedBox(height: 4),

                // Logo
                Image.asset('assets/images/logo.png', height: 100),

                const SizedBox(height: 32),

                // Số điện thoại
                TextField(
                  controller: loginController,
                  keyboardType: TextInputType.phone,
                  inputFormatters: [
                    FilteringTextInputFormatter.digitsOnly,
                    LengthLimitingTextInputFormatter(10), // Tối đa 10 số
                  ],
                  decoration: InputDecoration(
                    labelText: 'Phone Number',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                ),

                const SizedBox(height: 16),

                // Mật khẩu
                TextField(
                  controller: passwordController,
                  obscureText: true,
                  decoration: InputDecoration(
                    labelText: 'Password',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                ),

                const SizedBox(height: 24),

                // Nút đăng nhập
                SizedBox(
                  width: double.infinity,
                  height: 50,
                  child: ElevatedButton(
                    onPressed: isLoading ? null : _handleLogin,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Color(0xFFBB0000),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    child:
                        isLoading
                            ? const CircularProgressIndicator(
                              color: Colors.blueGrey,
                            )
                            : const Text(
                              'Login',
                              style: TextStyle(
                                fontSize: 16,
                                color: Colors.white, // ✅ Màu trắng cho chữ
                              ),
                            ),
                  ),
                ),

                const SizedBox(height: 24),

                // Đăng ký
                GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder:
                            (context) =>
                                const VerifyPhoneScreen(purpose: 'register'),
                      ),
                    );
                  },
                  child: const Text.rich(
                    TextSpan(
                      text: 'Haven’t got an account yet ? ',
                      children: [
                        TextSpan(
                          text: 'REGISTER NOW!',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            decoration: TextDecoration.underline,
                          ),
                        ),
                      ],
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),

                const SizedBox(height: 12),

                // Quên mật khẩu
                GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder:
                            (context) =>
                                const VerifyPhoneScreen(purpose: 'forgot'),
                      ),
                    );
                  },
                  child: const Text(
                    'FORGOT PASSWORD',
                    style: TextStyle(
                      decoration: TextDecoration.underline,
                      color: Colors.black87,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
