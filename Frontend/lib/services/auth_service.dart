import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import '../models/auth/login_request.dart';
import '../models/auth/login_response.dart';
import 'package:resq_app/models/auth/register.dart';
import './api_result.dart';

class AuthService {
  static const String baseUrl = 'http://192.168.1.100:9090/api/resq';

  static Future<LoginResponse?> login(LoginRequest request) async {
    final url = Uri.parse('$baseUrl/applogin');

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(request.toJson()),
      );

      if (response.statusCode == 200) {
        final json = jsonDecode(response.body);
        final loginResponse = LoginResponse.fromJson(json);

        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('login_response', jsonEncode(loginResponse.toJson()));

        return loginResponse;
      } else {
        print('Login failed: ${response.statusCode}');
        return null;
      }
    } catch (e) {
      print('Login error: $e');
      return null;
    }
  }
  
  Future<ApiResult> register(Register registerData) async {
    final response = await http.post(
      Uri.parse('$baseUrl/register'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(registerData.toJson()),
    );
    return ApiResult(response.statusCode, response.body);
  }

  Future<ApiResult> forgotPassword(String phoneNumber, String password) async {
    final response = await http.put(
      Uri.parse('$baseUrl/forgot-password/$phoneNumber'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'password': password}), 
    );

    return ApiResult(response.statusCode, response.body);
  }

}
