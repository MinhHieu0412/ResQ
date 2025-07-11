// lib/services/api_service.dart
import 'dart:convert';
import 'dart:io';
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
  static Future<Map<String, dynamic>> updateCustomer(
    int customerId,
    Map<String, dynamic> customerDto,
  ) async {
    final url = Uri.parse('$baseUrl/updateCustomer/$customerId');

    try {
      final response = await http.put(
        url,
        headers: {'Accept': 'application/json'},
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
  static Future<Map<String, dynamic>> createVehicle({
    required int customerId,
    required String plateNo,
    required String brand,
    required String model,
    required int year,
    required File? frontImage,
    required File? backImage,
  }) async {
    final uri = Uri.parse('$baseUrl/vehicles/createNew');
    final vehicleDto = {
      "userId": customerId,
      "plateNo": plateNo,
      "brand": brand,
      "model": model,
      "year": year,
    };
    final vehicleDtoString = jsonEncode(vehicleDto);
    final request = http.MultipartRequest('POST', uri)
      ..fields['vehicleDtoString'] = vehicleDtoString;

    if (frontImage != null) {
      request.files.add(
        await http.MultipartFile.fromPath('frontImage', frontImage.path),
      );
    }
    if (backImage != null) {
      request.files.add(
        await http.MultipartFile.fromPath('backImage', backImage.path),
      );
    }
    final response = await request.send();
    final respStr = await response.stream.bytesToString();

    Map<String, dynamic> parsedBody = {};
    try {
      parsedBody = jsonDecode(respStr);
    } catch (_) {
      // Nếu không decode được thì để parsedBody rỗng
    }
    return {
      "status": response.statusCode,
      "success": response.statusCode == 200,
      "body": respStr,
      "errors": parsedBody["errors"] is Map ? parsedBody["errors"] : {},
      // đảm bảo là Map
    };
  }

  // Update Vehicle Info
  static Future<Map<String, dynamic>> updateVehicle({
    required int vehicleId,
    required int userId,
    required String plateNo,
    required String brand,
    required String model,
    required int year,
    File? frontImage,
    File? backImage,
  }) async {
    final uri = Uri.parse('$baseUrl/vehicles/$vehicleId');

    // Tạo MultipartRequest với method PUT
    final request = http.MultipartRequest('PUT', uri);

    // Dữ liệu JSON dưới dạng chuỗi
    final vehicleDto = {
      "vehicleId": vehicleId,
      "userId": userId,
      "plateNo": plateNo,
      "brand": brand,
      "model": model,
      "year": year,
    };
    final vehicleDtoString = jsonEncode(vehicleDto);
    request.fields['vehicleDtoString'] = vehicleDtoString;

    print(vehicleDto);

    // Gửi ảnh nếu có
    if (frontImage != null) {
      request.files.add(
        await http.MultipartFile.fromPath('frontImage', frontImage.path),
      );
    }

    if (backImage != null) {
      request.files.add(
        await http.MultipartFile.fromPath('backImage', backImage.path),
      );
    }

    request.headers['Accept'] = 'application/json';

    try {
      final streamedResponse = await request.send();
      final respStr = await streamedResponse.stream.bytesToString();
      Map<String, dynamic> parsedBody = {};
      try {
        parsedBody = jsonDecode(respStr);
      } catch (_) {
        // Không parse được thì parsedBody sẽ rỗng
      }

      return {
        "status": streamedResponse.statusCode,
        "success": streamedResponse.statusCode == 200,
        "body": respStr,
        "errors": parsedBody["errors"] is Map ? parsedBody["errors"] : {},
      };
    } catch (e) {
      return {
        "success": false,
        "errors": {"network": "Failed to connect to server: $e"},
      };
    }
  }

  ///Personal Data///
  // Get Personal Data

  // Create New Personal Data

  // Update Personal Data
}
