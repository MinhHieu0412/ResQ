// lib/services/api_service.dart
import 'dart:convert';
import 'dart:io';
import 'package:frontend/config/constansts.dart';
import 'package:frontend/models/auth/login_response.dart';
import 'package:http/http.dart' as http;

class PartnerService {

  static Future<bool> updateWalletPoint(int partnerId) async {
    String? token = loginResponse?.token;
    final url = Uri.parse('$partnerUrl/updateWalletPoint/$partnerId');
    try {
      final response = await http.put(
        url,
        // headers: {
        //   'Authorization': 'Bearer $token',
        // },
      );

      if (response.statusCode == 200) {
        print('Updated Successfull');
        return true;
      } else {
        print('Update failed: ${response.statusCode} - ${response.body}');
        return false;
      }
    } catch (e) {
      print('Connection error: $e');
      return false;
    }
  }

}
