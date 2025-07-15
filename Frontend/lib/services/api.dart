// lib/services/api_service.dart
import 'dart:convert';
import 'dart:io';
import 'package:frontend/config/constansts.dart';
import 'package:http/http.dart' as http;

class ApiService {
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

  // Update Customer Info
  static Future<Map<String, dynamic>> updateCustomer(
    int customerId,
    Map<String, dynamic> customerDto,
  ) async {
    final url = Uri.parse('$baseUrl/updateCustomer/$customerId');

    try {
      final response = await http.put(
        url,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: jsonEncode(customerDto),
      );

      final decoded = jsonDecode(utf8.decode(response.bodyBytes));

      if (response.statusCode == 200) {
        return decoded; // Trả về luôn, trong đó có thể chứa success, errors...
      } else {
        // Nếu statusCode != 200, nhưng vẫn có JSON chứa errors
        return {
          "success": false,
          "errors":
              decoded['errors'] ??
              {"general": decoded['message'] ?? "Unknown error"},
        };
      }
    } catch (e) {
      return {
        "success": false,
        "errors": {"general": "Connection error: $e"},
      };
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
    final uri = Uri.parse('$baseUrl/vehicles/updateVehicle/$vehicleId');

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
  static Future<Map<String, dynamic>> getCustomerPersonalData(
    int customerId,
  ) async {
    final url = Uri.parse('$baseUrl/personaldata/$customerId');
    try {
      final response = await http.get(
        url,
        headers: {'Accept': 'application/json'},
      );
      print(response);

      if (response.statusCode != 200) {
        throw HttpException(
          'Failed to load data: ${response.statusCode} ${response.reasonPhrase}',
        );
      }

      final decodedBody = utf8.decode(response.bodyBytes);
      final parsedJson = jsonDecode(decodedBody);
      if (parsedJson is Map<String, dynamic>) {
        return parsedJson;
      } else {
        throw FormatException(
          'Expected JSON object but received ${parsedJson.runtimeType}',
        );
      }
    } catch (error) {
      throw Exception('Error fetching personal data: $error');
    }
  }

  // Create New Personal Data
  static Future<Map<String, dynamic>> createPersonalData({
    required int customerId,
    required Map<String, dynamic> personalDataDto,
    required File? frontImage,
    required File? backImage,
    required File? faceImage,
  }) async {
    final uri = Uri.parse('$baseUrl/personaldata/createNew');
    try {
      final personalDataDtoString = jsonEncode(personalDataDto);
      final request =
          http.MultipartRequest('POST', uri)
            ..fields['personalDataString'] = personalDataDtoString
            ..fields['userId'] = customerId.toString()
            ..headers['Content-Type'] = 'multipart/form-data';

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
      if (faceImage != null) {
        request.files.add(
          await http.MultipartFile.fromPath('faceImage', faceImage.path),
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
      };
    } catch (e) {
      throw Exception('Connection error: $e');
    }
  }

  // Update Personal Data
  static Future<Map<String, dynamic>> updatePersonalData({
    required int pdId,
    required Map<String, dynamic> personalDataDto,
    required dynamic frontImage,
    required dynamic backImage,
    required dynamic faceImage,
  }) async {
    final uri = Uri.parse('$baseUrl/personaldata/updatePd/${pdId}');
    try {
      print("PD ID $pdId");
      print("Dto $personalDataDto");
      print("Front $frontImage");
      print("Back $backImage");
      print("Face $faceImage");
      final personalDataDtoString = jsonEncode(personalDataDto);
      final request =
          http.MultipartRequest('PUT', uri)
            ..fields['pdId'] = pdId.toString()
            ..fields['personalDataDtoString'] = personalDataDtoString
            ..headers['Accept'] = 'application/json';

      if (frontImage != null) {
        if (frontImage is File) {
          request.files.add(await http.MultipartFile.fromPath('frontImage', frontImage.path));
        } else if (frontImage is String) {
          request.fields['frontImageUrl'] = frontImage; // URL cũ
        }
      }if (backImage != null) {
        if (backImage is File) {
          request.files.add(await http.MultipartFile.fromPath('backImage', backImage.path));
        } else if (backImage is String) {
          request.fields['backImageUrl'] = backImage; // URL cũ
        }
      }
      if (faceImage != null) {
        if (faceImage is File) {
          request.files.add(await http.MultipartFile.fromPath('faceImage', faceImage.path));
        } else if (faceImage is String) {
          request.fields['faceImageUrl'] = frontImage; // URL cũ
        }
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
      };
    } catch (e) {
      throw Exception('Connection error: $e');
    }
  }

  ///Documents
  // Get Personal Data
  static Future<List<dynamic>> getCustomerDocuments(int customerId) async {
    final url = Uri.parse('$baseUrl/documents/$customerId');
    try {
      final response = await http.get(
        url,
        headers: {'Accept': 'application/json'},
      );
      if (response.statusCode == 200) {
        final decoded = jsonDecode(utf8.decode(response.bodyBytes));
        print(decoded);
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

  // Create Document
  static Future<Map<String, dynamic>> createDocument({
    required int customerId,
    required Map<String, dynamic> documentDto,
    required File? frontImage,
    required File? backImage,
  }) async {
    final uri = Uri.parse('$baseUrl/documents/createNew');
    try {
      final documentDtoString = jsonEncode(documentDto);
      final request =
          http.MultipartRequest('POST', uri)
            ..fields['documentString'] = documentDtoString
            ..fields['userIdString'] = customerId.toString()
            ..headers['Content-Type'] = 'multipart/form-data';

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
      };
    } catch (e) {
      throw Exception('Connection error: $e');
    }
  }

  //Update Document
  static Future<Map<String, dynamic>> updateDocument({
    required int documentId,
    required Map<String, dynamic> documentDto,
    required dynamic frontImage,
    required dynamic backImage,
  }) async {
    final uri = Uri.parse('$baseUrl/documents/updateDocument/${documentId}');
    try {
      final documentDtoString = jsonEncode(documentDto);
      final request =
          http.MultipartRequest('PUT', uri)
            ..fields['sDocumentId'] = documentId.toString()
            ..fields['documentDtoString'] = documentDtoString
            ..headers['Accept'] = 'application/json';

      if (frontImage != null) {
        if (frontImage is File) {
          request.files.add(await http.MultipartFile.fromPath('frontImage', frontImage.path));
        } else if (frontImage is String) {
          request.fields['frontImageUrl'] = frontImage; // URL cũ
        }
      }
      if (backImage != null) {
        if (backImage is File) {
          request.files.add(await http.MultipartFile.fromPath('backImage', backImage.path));
        } else if (backImage is String) {
          request.fields['backImageUrl'] = backImage;
        }
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
      };
    } catch (e) {
      throw Exception('Connection error: $e');
    }
  }
}
