import 'package:flutter/material.dart';
import 'package:frontend/services/api.dart';
import 'package:intl/intl.dart';

class ProfilePage extends StatefulWidget {
  final int customerId;
  const ProfilePage({super.key, required this.customerId});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  Map<String, dynamic>? customer;
  String? error;
  bool isLoading = true;
  bool isEditing = false;

  final List<String> genderOptions = ["Male", "Female", "Other"];
  String? selectedGender;
  DateTime? selectedDob;

  @override
  void initState() {
    super.initState();
    fetchCustomer();
  }

  Future<void> fetchCustomer() async {
    try {
      final result = await ApiService.getCustomerProfile(widget.customerId);
      setState(() {
        customer = result;
        selectedGender = result['gender'];
        if (result['dob'] != null) {
          selectedDob = DateTime.tryParse(result['dob']);
        }
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        error = e.toString();
        isLoading = false;
      });
    }
  }

  String formatDob(DateTime? date) {
    if (date == null) return "No Date";
    return DateFormat('dd/MM/yyyy').format(date.toLocal());
  }

  Widget _buildStaticInfo(String label, String? value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 130,
            child: Text(
              "$label:",
              style: const TextStyle(
                fontFamily: 'Raleway',
                fontWeight: FontWeight.w800,
                fontSize: 16,
              ),
            ),
          ),
          Expanded(
            child: Text(
              value ?? "---",
              style: const TextStyle(fontFamily: 'Lexend', fontSize: 16),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEditableInfo(String label, Widget inputWidget) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(
            width: 130,
            child: Text(
              "$label:",
              style: const TextStyle(
                fontFamily: 'Raleway',
                fontWeight: FontWeight.w800,
                fontSize: 16,
              ),
            ),
          ),
          Expanded(child: inputWidget),
        ],
      ),
    );
  }

  Future<void> _pickDate() async {
    final initial = selectedDob ?? DateTime(2000);
    final picked = await showDatePicker(
      context: context,
      initialDate: initial,
      firstDate: DateTime(1800),
      lastDate: DateTime.now(),
    );
    if (picked != null) {
      setState(() {
        selectedDob = picked;
      });
    }
  }

  Future<void> _submitUpdate() async {
    if (customer == null) return;

    final dto = {
      "userId": customer!["userId"],
      "fullName": customer!["fullName"],
      "email": customer!["email"],
      "sdt": customer!["sdt"],
      "gender": selectedGender,
      "dob": selectedDob?.toIso8601String(),
    };

    try {
      await ApiService.updateCustomer(widget.customerId, dto);
    } catch (e) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text("Failed update: $e")));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.blue[900],
        centerTitle: true,
        title: const Text(
          "Profile Information",
          style: TextStyle(
            fontFamily: 'Raleway',
            fontWeight: FontWeight.w700,
            color: Colors.white,
            fontSize: 24,
          ),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 50),
        child: Builder(
          builder: (_) {
            if (isLoading)
              return const Center(child: CircularProgressIndicator());
            if (error != null) {
              return Center(
                child: Text(
                  "Lỗi: $error",
                  style: const TextStyle(color: Colors.red),
                ),
              );
            }
            if (customer == null) {
              return const Center(child: Text("Không tìm thấy khách hàng"));
            }

            return Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const SizedBox(height: 40),
                CircleAvatar(
                  radius: 100,
                  backgroundImage: NetworkImage(
                    "http://192.168.1.100:9090/uploads/avatar/${customer!["avatar"] ?? "user.png"}",
                  ),
                  backgroundColor: Colors.transparent,
                ),
                const SizedBox(height: 12),
                Text(
                  customer!["fullName"] ?? "---",
                  style: const TextStyle(
                    fontSize: 24,
                    fontFamily: 'Raleway',
                    fontWeight: FontWeight.w700,
                    color: Colors.red,
                  ),
                ),
                const SizedBox(height: 40),
                _buildStaticInfo("Email", customer!["email"]),
                _buildStaticInfo("Phone No", customer!["sdt"]),
                isEditing
                    ? _buildEditableInfo(
                      "Gender",
                      SizedBox(
                        height: 40,
                        child: DropdownButtonFormField<String>(
                          value: selectedGender,
                          items:
                              genderOptions.map((String gender) {
                                return DropdownMenuItem(
                                  value: gender,
                                  child: Text(gender),
                                );
                              }).toList(),
                          onChanged:
                              (val) => setState(() => selectedGender = val),
                          decoration: const InputDecoration(
                            border: OutlineInputBorder(),
                            contentPadding: EdgeInsets.symmetric(
                              horizontal: 12,
                              vertical: 4,
                            ),
                          ),
                        ),
                      ),
                    )
                    : _buildStaticInfo("Gender", customer!["gender"]),
                isEditing
                    ? _buildEditableInfo(
                      "DOB",
                      GestureDetector(
                        onTap: _pickDate,
                        child: Container(
                          height: 40,
                          alignment: Alignment.centerLeft,
                          padding: const EdgeInsets.symmetric(horizontal: 12),
                          decoration: BoxDecoration(
                            border: Border.all(color: Colors.grey),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            selectedDob != null
                                ? formatDob(selectedDob)
                                : "---",
                            style: const TextStyle(
                              fontSize: 16,
                              fontFamily: 'Lexend',
                            ),
                          ),
                        ),
                      ),
                    )
                    : _buildStaticInfo("DOB", formatDob(selectedDob)),
                const SizedBox(height: 40),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    ElevatedButton.icon(
                      onPressed: () async {
                        if (isEditing) {
                          await _submitUpdate();
                          showDialog(
                            context: context,
                            builder: (BuildContext context) {
                              Future.delayed(const Duration(seconds: 5), () {
                                if (context.mounted)
                                  Navigator.of(context).pop();
                              });

                              return AlertDialog(
                                backgroundColor: Colors.white,
                                title: Text(
                                  "Update Success",
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                    fontSize: 25,
                                    fontFamily: 'Raleway',
                                    fontWeight: FontWeight.bold,
                                    color: Colors.green[700],
                                  ),
                                ),
                                content: Text(
                                  "Your information has been updated successfull!",
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                    fontFamily: "Lexend",
                                    fontSize: 17
                                  ),
                                ),
                              );
                            },
                          );
                        }
                        setState(() {
                          isEditing = !isEditing;
                        });
                        await fetchCustomer();
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.blue[900],
                        padding: const EdgeInsets.symmetric(
                          horizontal: 24,
                          vertical: 12,
                        ),
                      ),
                      label: Text(
                        isEditing ? "Save" : "Edit Profile",
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 17,
                        ),
                      ),
                    ),
                    if (isEditing) ...[
                      const SizedBox(width: 16),
                      ElevatedButton(
                        onPressed: () => setState(() => isEditing = false),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.red,
                          padding: const EdgeInsets.symmetric(
                            horizontal: 20,
                            vertical: 12,
                          ),
                        ),
                        child: const Text(
                          "Cancel",
                          style: TextStyle(color: Colors.white, fontSize: 17),
                        ),
                      ),
                    ],
                  ],
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
