import 'package:flutter/material.dart';
import 'package:resq_app/services/verify_service.dart';
import './register_screen.dart';
import './forgot_password_screen.dart';
import '../../services/api_result.dart';
import 'package:flutter/services.dart';

class VerifyPhoneScreen extends StatefulWidget {
  final String purpose; // 'register' hoặc 'forgot'

  const VerifyPhoneScreen({super.key, required this.purpose});

  @override
  State<VerifyPhoneScreen> createState() => _VerifyPhoneScreenState();
}

class _VerifyPhoneScreenState extends State<VerifyPhoneScreen> {
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController otpController = TextEditingController();

  bool isOtpSent = false;
  bool isLoading = false;

  void sendOtp() async {
    final phone = phoneController.text.trim();

    if (phone.isEmpty ||
        phone.length < 9 ||
        phone.length > 10 ||
        !RegExp(r'^\d+$').hasMatch(phone)) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Số điện thoại không hợp lệ (9–10 chữ số)'),
        ),
      );
      return;
    }

    setState(() {
      isLoading = true;
    });

    ApiResult result;
    if (widget.purpose == 'register') {
      result = await VerifyService().sendOtp(phone);
    } else {
      result = await VerifyService().forgetPassword(phone);
    }

    setState(() {
      isOtpSent = true;
      isLoading = false;
    });

    if (result.statusCode == 200) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text(result.body)));
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error ${result.message}'),
          backgroundColor: const Color(0xFFBB0000),
          behavior: SnackBarBehavior.floating,
          duration: const Duration(seconds: 4),
          action: SnackBarAction(
            label: 'Close',
            textColor: Colors.white,
            onPressed: () {},
          ),
        ),
      );
    }
  }

  void verifyOtp() async {
    final phone = phoneController.text.trim();
    final otp = otpController.text.trim();

    if (otp.isEmpty || otp.length > 10 || !RegExp(r'^\d+$').hasMatch(otp)) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Mã OTP không hợp lệ (phải là số và dưới 10 chữ số)'),
        ),
      );
      return;
    }
    setState(() {
      isLoading = true;
    });

    final otpType =
        widget.purpose == 'register' ? 'REGISTER' : 'FORGOT PASSWORD';

    final result = await VerifyService().verifyOtp(phone, otp, otpType);

    setState(() {
      isLoading = false;
    });

    if (result.statusCode == 200) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text(result.body)));

      if (widget.purpose == 'register') {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) => RegisterScreen(phoneNumber: phone),
          ),
        );
      } else if (widget.purpose == 'forgot') {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) => ForgotPasswordScreen(phoneNumber: phone),
          ),
        );
      }
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error ${result.message}'),
          backgroundColor: const Color(0xFFBB0000),
          behavior: SnackBarBehavior.floating,
          duration: const Duration(seconds: 4),
          action: SnackBarAction(
            label: 'Close',
            textColor: Colors.white,
            onPressed: () {},
          ),
        ),
      );
    }
  }

  InputDecoration inputStyle(String hint) {
    return InputDecoration(
      hintText: hint,
      contentPadding: const EdgeInsets.symmetric(horizontal: 16),
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
    );
  }

  @override
  Widget build(BuildContext context) {
    final title =
        widget.purpose == 'register'
            ? 'Verify Phone Number'
            : 'Forgot Password - Verify Phone';

    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF013171),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        centerTitle: true,
        title: Text(
          title,
          style: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
        elevation: 0,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 24),
              SizedBox(
                height: 50,
                child: TextField(
                  controller: phoneController,
                  keyboardType: TextInputType.phone,
                  maxLength: 10, // Giới hạn tối đa 10 chữ số
                  inputFormatters: [
                    FilteringTextInputFormatter.digitsOnly, // Chỉ cho nhập số
                    LengthLimitingTextInputFormatter(10), // Tối đa 10 ký tự
                  ],
                  decoration: inputStyle('Enter your phone number'),
                ),
              ),
              const SizedBox(height: 16),

              if (isOtpSent) ...[
                Row(
                  children: [
                    Expanded(
                      flex: 3,
                      child: SizedBox(
                        height: 50,
                        child: TextField(
                          controller: otpController,
                          keyboardType: TextInputType.number,
                          inputFormatters: [
                            FilteringTextInputFormatter.digitsOnly,
                            LengthLimitingTextInputFormatter(10),
                          ],
                          decoration: inputStyle('Enter OTP'),
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      flex: 2,
                      child: SizedBox(
                        height: 50,
                        child: ElevatedButton(
                          onPressed: isLoading ? null : sendOtp,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFFBB0000),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10),
                            ),
                          ),
                          child:
                              isLoading
                                  ? const CircularProgressIndicator(
                                    color: Colors.white,
                                  )
                                  : const Text(
                                    'Resend',
                                    style: TextStyle(
                                      fontSize: 14,
                                      color: Colors.white,
                                    ),
                                  ),
                        ),
                      ),
                    ),
                  ],
                ),
              ] else ...[
                SizedBox(
                  height: 50,
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: isLoading ? null : sendOtp,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFBB0000),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    child:
                        isLoading
                            ? const CircularProgressIndicator(
                              color: Colors.white,
                            )
                            : const Text(
                              'Send OTP',
                              style: TextStyle(
                                fontSize: 16,
                                color: Colors.white,
                              ),
                            ),
                  ),
                ),
              ],
              const SizedBox(height: 24),
              if (isOtpSent)
                SizedBox(
                  height: 50,
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: isLoading ? null : verifyOtp,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFBB0000),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    child:
                        isLoading
                            ? const CircularProgressIndicator(
                              color: Colors.white,
                            )
                            : const Text(
                              'Confirm',
                              style: TextStyle(
                                fontSize: 16,
                                color: Colors.white,
                              ),
                            ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
