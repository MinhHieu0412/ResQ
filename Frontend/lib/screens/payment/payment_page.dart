import 'package:flutter/material.dart';
import 'package:frontend/services/partnerAPI.dart';
import 'package:frontend/services/paymentAPI.dart';

class PaymentPage extends StatefulWidget {
  //Bỏ khi ghép payment xong
  const PaymentPage({Key? key}) : super(key: key);

  @override
  State<PaymentPage> createState() => _PaymentPageState();
}

class _PaymentPageState extends State<PaymentPage> {
  void _partnerWithdraw() async {
    final int partnerId = 1; // Get partnerId động
    _showLoading();

    final paymentResult = await PaymentService.payToPartner(partnerId);

    if (mounted) Navigator.pop(context);

    if (paymentResult) {
      final updateWallet = await PartnerService.updateWalletPoint(partnerId);
      if (updateWallet) {
        _showDialog("Withdraw Success", "Your withdraw is successful!");
        // Cập nhật lại trang
      }
    } else {
      _showDialog(
        "Withdraw Failed",
        "We couldn't process your withdrawal request. Please try again later.",
      );
    }
  }

  //Loading while run
  void _showLoading() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => const Center(child: CircularProgressIndicator()),
    );
  }

  //Show noti
  void _showDialog(String title, String message) {
    final isFailed = title.toLowerCase().contains("failed");
    showDialog(
      context: context,
      builder:
          (_) => AlertDialog(
            title: Center(
              child: Text(
                title,
                style: TextStyle(
                  fontFamily: 'Raleway',
                  fontSize: 23,
                  color: isFailed ? Colors.red[700] : Colors.green[900],
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            content: Text(
              message,
              style: const TextStyle(fontFamily: 'Lexend', fontSize: 17),
            ),
          ),
    );

    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        Navigator.of(context, rootNavigator: true).pop();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Thanh toán PayPal')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () async {
                _showLoading();
                await PaymentService.createPayment(5);
                if (mounted) Navigator.pop(context);
              },
              child: const Text('User Payment'),
            ),
            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: _partnerWithdraw,
              child: const Text("Partner Payment"),
            ),
          ],
        ),
      ),
    );
  }
}
