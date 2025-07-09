// lib/services/api_service.dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = "http://192.168.1.100:9090/api/resq/customer";

  ///Profile///
  // Get Customer Info
  static Future<Map<String, dynamic>> getCustomerProfile(int customerId) async {
    final url = Uri.parse('$baseUrl/$customerId');

    try {
      final response = await http.get(
        url,
        headers: {'Accept': 'application/json'},
      );
      if (response.statusCode == 200) {
        final decoded = jsonDecode(utf8.decode(response.bodyBytes));
        return decoded;
      } else {
        throw Exception('Server error: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Connection error: $e');
    }
  }

  //Update Customer Info
  static Future<Map<String, dynamic>> updateCustomer(int customerId, Map<String, dynamic> customerDto) async{
    final url = Uri.parse('$baseUrl/updateCustomer/$customerId');

    try{
      final response = await http.put(
        url,
        headers: {'Accept':'application/json'},
        body: jsonEncode(customerDto),
      );
      if (response.statusCode == 200) {
        final decoded = jsonDecode(utf8.decode(response.bodyBytes));
        return decoded;
      } else {
        throw Exception('Server error: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Connection error: $e');
    }
  }

  ///Vehicle///
  // Get Customer Vehicle
  static Future<List<dynamic>> getCustomerVehicles(int customerId) async {
    final url = Uri.parse('$baseUrl/vehicles/$customerId');

    try {
      final response = await http.get(
        url,
        headers: {'Accept': 'application/json'},
      );
      if (response.statusCode == 200) {
        final decoded = jsonDecode(utf8.decode(response.bodyBytes));
        if (decoded is List) {
          return decoded;
        } else {
          throw Exception('Expected List but got ${decoded.runtimeType}');
        }
      } else {
        throw Exception('Server error: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Connection error: $e');
    }
  }

  // Create New Vehicle

  // Update Vehicle Info

  ///Personal Data///
  // Get Personal Data

  // Create New Personal Data

  // Update Personal Data
}
