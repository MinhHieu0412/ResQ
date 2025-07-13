import 'package:flutter/material.dart';
import 'package:frontend/services/api.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';

import 'package:intl/intl.dart';

class PersonalDataDetailPage extends StatefulWidget {
  final int customerId;
  final Map<String, dynamic> personalData;

  const PersonalDataDetailPage({
    super.key,
    required this.customerId,
    required this.personalData,
  });

  @override
  State<PersonalDataDetailPage> createState() => _PersonalDataDetailPageState();
}

class _PersonalDataDetailPageState extends State<PersonalDataDetailPage> {
  bool isEditing = false;
  bool hasUpdated = false;
  late TextEditingController typeController;
  late TextEditingController citizenNoController;
  late TextEditingController issuedPlaceController;
  late TextEditingController issuedDateController;
  late TextEditingController expirationDateController;

  File? _frontImageFile;
  File? _backImageFile;
  File? _faceImageFile;
  final ImagePicker _picker = ImagePicker();

  @override
  void initState() {
    super.initState();
    final pd = widget.personalData;
    typeController = TextEditingController(text: pd['type'] ?? '');
    citizenNoController = TextEditingController(text: pd['citizenNumber'] ?? '');
    issuedPlaceController = TextEditingController(text: pd['issuePlace'] ?? '');
    issuedDateController = TextEditingController(text: pd['issueDate'] ?? '');
    expirationDateController = TextEditingController(text: pd['expirationDate']?.toString() ?? '');
  }

  @override
  void dispose() {
    typeController.dispose();
    citizenNoController.dispose();
    issuedPlaceController.dispose();
    issuedDateController.dispose();
    expirationDateController.dispose();
    super.dispose();
  }

  Future<void> _pickImage(int index) async {
    showModalBottomSheet(
      context: context,
      builder: (_) {
        return SafeArea(
          child: Wrap(
            children: [
              ListTile(
                leading: const Icon(Icons.camera_alt),
                title: const Text("Take a photo"),
                onTap: () async {
                  Navigator.pop(context);
                  final pickedFile = await _picker.pickImage(source: ImageSource.camera);
                  _setPickedFile(index, pickedFile);
                },
              ),
              ListTile(
                leading: const Icon(Icons.photo_library),
                title: const Text("Choose from gallery"),
                onTap: () async {
                  Navigator.pop(context);
                  final pickedFile = await _picker.pickImage(source: ImageSource.gallery);
                  _setPickedFile(index, pickedFile);
                },
              ),
            ],
          ),
        );
      },
    );
  }

  void _setPickedFile(int index, XFile? pickedFile) {
    if (pickedFile != null) {
      setState(() {
        if (index == 1) {
          _frontImageFile = File(pickedFile.path);
        } else if (index == 2) {
          _backImageFile = File(pickedFile.path);
        } else {
          _faceImageFile = File(pickedFile.path);
        }
      });
    }
  }


  Future<void> _handleUpdate() async {
    final customerId = widget.customerId;
    final type = typeController.text.trim();
    final citizenNo = citizenNoController.text.trim();
    final issuedPlace = issuedPlaceController.text.trim();
    final issuedDate = issuedDateController.text.trim();
    final expirationDate = expirationDateController.text.trim();

    final dto = {
      "type": type,
      "citizenNumber": citizenNo,
      "issuePlace": issuedPlace,
      "issueDate": issuedDate,
      "expirationDate": expirationDate,
    };

    final result = await ApiService.updatePersonalData(
      pdId: widget.personalData['pdId'],
      personalDataDto: dto,
      frontImage: _frontImageFile,
      backImage: _backImageFile,
      faceImage: _faceImageFile,
    );

    setState(() {
      isEditing = false;
      hasUpdated = true;
    });
    if (!mounted) return;
    if (result['success'] == true) {
      setState(() {
        isEditing = false;
        hasUpdated = true;
      });
      _showDialog("Update Success", "Your personal data is updated!");
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Error: ${result['errors']}")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final v = widget.personalData;
    final String baseUrl = 'http://192.168.1.100:9090/api/resq/customer';

    String stripAdminPrefix(String url) {
      final uriParts = url.split('?');
      final path = uriParts[0].replaceFirst('/admin/personaldoc', '');
      final query = uriParts.length > 1 ? '?${uriParts[1]}' : '';
      return '$path$query';
    }

    final String? frontImagePath = v['frontImageUrl'];
    final String? backImagePath = v['backImageUrl'];
    final String? faceImagePath = v['faceImageUrl'];

    final String? frontImageUrl = frontImagePath != null
        ? '$baseUrl${stripAdminPrefix(frontImagePath)}'
        : null;
    final String? backImageUrl = backImagePath != null
        ? '$baseUrl${stripAdminPrefix(backImagePath)}'
        : null;
    final String? faceImageUrl = faceImagePath != null
        ? '$baseUrl${stripAdminPrefix(faceImagePath)}'
        : null;

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.blue[900],
        centerTitle: true,
        title: const Text("Personal Document", style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: Colors.white),
          onPressed: () => Navigator.pop(context, hasUpdated),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildField("Document Type:", typeController, enabled: false),
            _buildField("Citizen Number:", citizenNoController, enabled: isEditing),
            _buildField("Issued Place:", issuedPlaceController, enabled: isEditing),
            _buildField("Issued Date:", issuedDateController, enabled: isEditing, isDate: true),
            _buildField("Expiration Date:", expirationDateController, enabled: isEditing, isDate: true),
            const SizedBox(height: 30),
            const Text("Document Images:", style: _labelStyle),
            const SizedBox(height: 10),
            Row(
              children: [
                Expanded(child: _buildImagePicker(1, _frontImageFile, frontImageUrl, "Front Image")),
                const SizedBox(width: 16),
                Expanded(child: _buildImagePicker(2, _backImageFile, backImageUrl, "Back Image")),
              ],
            ),
            const SizedBox(height: 20),
            const Text("Face Photo:", style: _labelStyle),
            const SizedBox(height: 10),
            //_buildImagePicker(3, _faceImageFile, faceImageUrl, "Face Image"),
            SizedBox(
              height: 112.5, // hoặc kích thước tùy ý
              width: 180,
              child: _buildImagePicker(3, _faceImageFile, faceImageUrl, "Face Image"),
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(
                  onPressed: () async {
                    if (isEditing) {
                      await _handleUpdate();
                    } else {
                      setState(() => isEditing = true);
                    }
                  },
                  style: ElevatedButton.styleFrom(backgroundColor: Colors.blue[900]),
                  child: Text(isEditing ? "Save" : "Edit", style: const TextStyle(color: Colors.white)),
                ),
                const SizedBox(width: 16),
                if (isEditing)
                  ElevatedButton(
                    onPressed: () => setState(() => isEditing = false),
                    style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
                    child: const Text("Cancel", style: TextStyle(color: Colors.white)),
                  ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildField(String label, TextEditingController controller, {
    bool enabled = false,
    bool isDate = false,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: _labelStyle),
          const SizedBox(height: 6),
          TextField(
            controller: controller,
            readOnly: isDate,
            enabled: enabled,
            onTap: enabled && isDate
                ? () async {
              final DateTime? picked = await showDatePicker(
                context: context,
                initialDate: DateTime.tryParse(controller.text) ?? DateTime.now(),
                firstDate: DateTime(1900),
                lastDate: DateTime(2100),
              );
              if (picked != null) {
                controller.text = picked.toIso8601String().split('T')[0]; // yyyy-MM-dd
              }
            }
                : null,
            style: TextStyle(color: !enabled ? Colors.grey[700] : Colors.black),
            decoration: InputDecoration(
              filled: !enabled,
              fillColor: enabled ? null : Colors.grey.shade100,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
              contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
              suffixIcon: isDate && enabled ? const Icon(Icons.calendar_today, size: 20) : null,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildImagePicker(int index, File? imageFile, String? imageUrl, String label) {
    return GestureDetector(
      onTap: () => isEditing ? _pickImage(index) : null,
      child: AspectRatio(
        aspectRatio: 1.6,
        child: Container(
          decoration: BoxDecoration(
            border: Border.all(color: Colors.blue[900]!),
            borderRadius: BorderRadius.circular(8),
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: imageFile != null
                ? Image.file(imageFile, fit: BoxFit.cover)
                : imageUrl != null
                ? Image.network(imageUrl, fit: BoxFit.cover)
                : Center(child: Text(label, style: TextStyle(color: Colors.grey[600]))),
          ),
        ),
      ),
    );
  }

  void _showDialog(String title, String message) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: Center(
          child: Text(
            title,
            style: TextStyle(
              fontFamily: 'Raleway',
              fontSize: 23,
              color: Colors.green[900],
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        content: Text(
          message,
          textAlign: TextAlign.center,
          style: const TextStyle(fontFamily: 'Lexend', fontSize: 17),
        ),
      ),
    );

    Future.delayed(const Duration(seconds: 3), () {
      if (mounted) {
        Navigator.of(context, rootNavigator: true).pop();
      }
    });
  }

  static const TextStyle _labelStyle = TextStyle(
    fontWeight: FontWeight.bold,
    color: Colors.black,
    fontSize: 16,
  );
}
