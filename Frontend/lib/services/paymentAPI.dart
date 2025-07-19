// lib/services/api_service.dart
import 'dart:convert';
import 'dart:io';
import 'package:frontend/config/constansts.dart';
import 'package:frontend/models/auth/login_response.dart';
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart';

class PaymentService {
  //Customer Payment
  static Future<void> createPayment(int rrId) async {
    final url = Uri.parse('$paymentUrl/create/$rrId');
    try {
      final response = await http.post(url);

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final approveUrl = data['approveUrl'];
        if (approveUrl != null) {
          print("Redirect to: $approveUrl");
          await launchPayment(approveUrl); //Open Link
        } else {
          print("approveUrl is null");
        }
      } else {
        print("Failed to create payment: ${response.statusCode}");
      }
    } catch (e) {
      print("Error: $e");
    }
  }

// launchPayment
  static Future<void> launchPayment(String approveUrl) async {
    final uri = Uri.parse(approveUrl);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    } else {
      throw 'Không thể mở liên kết thanh toán';
    }
  }

  //Pay Partner
  static Future<bool> payToPartner(int partnerId) async {
    String? token = loginResponse?.token;
    try {
      final payPartner = await http.post(Uri.parse('$paymentUrl/payPartner/$partnerId'),
        // headers: {
        //   'Authorization': 'Bearer $token'
        // }
      );

      if (payPartner.statusCode == 200) {
        final payData = jsonDecode(payPartner.body);
        final payoutBatchId = payData['batch_header']?['payout_batch_id'];

        // Check null
        if (payoutBatchId == null) {
          print('Cannot find payout_batch_id');
          return false;
        }

        print(payoutBatchId);

        const maxRetries = 2;
        const delaySeconds = 30;
        //Check status payment
        for (int attempt = 1; attempt <= maxRetries; attempt++) {
          await Future.delayed(Duration(seconds: delaySeconds));
          final checkPayment = await http.get(
            Uri.parse('$paymentUrl/checkPayoutStatus/$payoutBatchId'),
            // headers: {
            //   'Authorization': 'Bearer $token'
            // }
          );

          if (checkPayment.statusCode == 200) {
            final checkData = jsonDecode(checkPayment.body);
            final status = checkData['batch_header']?['batch_status'];

            if (status == 'SUCCESS') {
              print('Payment Success!');
              return true;
            } else if (status == 'FAILED') {
              print('Payment Failed!');
              return false;
            }
          } else {
            print('Error checking status: ${checkPayment.body}');
            return false;
          }
        }
        return false;
      } else {
        print('Payment error: ${payPartner.body}');
        return false;
      }
    } catch (e) {
      print('Error request: $e');
      return false;
    }
  }
}
