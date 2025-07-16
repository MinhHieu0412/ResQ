import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:frontend/services/customerAPI.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';

import 'package:intl/intl.dart';

class NewPersonalDataPage extends StatefulWidget {
  final int customerId;

  const NewPersonalDataPage({
    super.key,
    required this.customerId
  });

  @override
  State<NewPersonalDataPage> createState() => _NewPersonalDataPageState();
}

class _NewPersonalDataPageState extends State<NewPersonalDataPage> {
  late List<String> typeOptions;
  String? _selectedType;

  final TextEditingController citizenNoController = TextEditingController();
  final TextEditingController issuedPlaceController = TextEditingController();
  final TextEditingController issuedDateController = TextEditingController();
  final TextEditingController expirationDateController =
      TextEditingController();

  File? _frontImage;
  File? _backImage;
  File? _faceImage;

  final ImagePicker _picker = ImagePicker();
  Map<String, String> _errors = {};

  @override
  void initState() {
    super.initState();
    typeOptions = ["Identity Card", "Passport"];
    _selectedType = "Identity Card"; // Mặc định là "Identity Card"

    final now = DateTime.now();
    issuedDateController.text = _formatDate(now);
    expirationDateController.text = _formatDate(now);
  }


  String _formatDate(DateTime date) {
    return "${date.day.toString().padLeft(2, '0')}/"
        "${date.month.toString().padLeft(2, '0')}/"
        "${date.year}";
  }

  Future<void> _selectDate(
    BuildContext context,
    TextEditingController controller,
  ) async {
    DateTime initialDate = DateTime.now();
    try {
      final parts = controller.text.split('/');
      if (parts.length == 3) {
        initialDate = DateTime(
          int.parse(parts[2]),
          int.parse(parts[1]),
          int.parse(parts[0]),
        );
      }
    } catch (_) {}

    final picked = await showDatePicker(
      context: context,
      initialDate: initialDate,
      firstDate: DateTime(1900),
      lastDate: DateTime(2100),
    );
    if (picked != null) {
      setState(() {
        controller.text = _formatDate(picked);
      });
    }
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
                  final pickedFile = await _picker.pickImage(
                    source: ImageSource.camera,
                  );
                  _setPickedFile(index, pickedFile);
                },
              ),
              ListTile(
                leading: const Icon(Icons.photo_library),
                title: const Text("Choose from album"),
                onTap: () async {
                  Navigator.pop(context);
                  final pickedFile = await _picker.pickImage(
                    source: ImageSource.gallery,
                  );
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
        switch (index) {
          case 1:
            _frontImage = File(pickedFile.path);
            break;
          case 2:
            _backImage = File(pickedFile.path);
            break;
          case 3:
            _faceImage = File(pickedFile.path);
            break;
        }
      });
    }
  }

  String _toBackendFormat(String input) {
    final inputFormat = DateFormat("dd/MM/yyyy");
    final outputFormat = DateFormat("yyyy-MM-dd");
    final parsedDate = inputFormat.parseStrict(input);
    return outputFormat.format(parsedDate); // "2025-07-13"
  }

  void _handleSave() async {
    final citizenNo = citizenNoController.text.trim();
    final issuedPlace = issuedPlaceController.text.trim();
    final issuedDate = _toBackendFormat(issuedDateController.text.trim());
    final expirationDate = _toBackendFormat(
      expirationDateController.text.trim(),
    );

    final dto = {
      "type": _selectedType,
      "citizenNumber": citizenNo,
      "issuePlace": issuedPlace,
      "issueDate": issuedDate,
      "expirationDate": expirationDate,
    };

    final result = await ApiService.createPersonalData(
      customerId: widget.customerId,
      personalDataDto: dto,
      frontImage: _frontImage,
      backImage: _backImage,
      faceImage: _faceImage,
    );

    final bool success = result["success"] == true;
    if (success) {
      setState(() => _errors.clear());
      _showDialog("Add Success", "Your personal document has been added!");
    } else {
      final dynamic errors = result["errors"];
      setState(() {
        _errors =
            (errors is Map)
                ? errors.map((k, v) => MapEntry(k.toString(), v.toString()))
                : {};
      });
    }
  }

  void _showDialog(String title, String message) {
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
                  color: Colors.green[900],
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
        Navigator.pop(context, true);
      }
    });
  }

  Widget _buildInput(
    TextEditingController controller, {
    required String fieldName,
    TextInputType keyboardType = TextInputType.text,
    List<TextInputFormatter>? inputFormatters,
    VoidCallback? onTap,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          height: 56,
          child: TextField(
            controller: controller,
            readOnly: onTap != null,
            onTap: onTap,
            keyboardType: keyboardType,
            decoration: InputDecoration(
              contentPadding: const EdgeInsets.symmetric(horizontal: 12),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
              ),
              errorText: _errors[fieldName],
            ),
          ),
        ),
        const SizedBox(height: 4),
      ],
    );
  }

  Widget _buildImagePicker({
    required int index,
    required String fieldName,
    File? imageFile,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        GestureDetector(
          onTap: () => _pickImage(index),
          child: AspectRatio(
            aspectRatio: 1.6,
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(color: Color(0xFF013171)!),
                borderRadius: BorderRadius.circular(8),
              ),
              child:
                  imageFile != null
                      ? ClipRRect(
                        borderRadius: BorderRadius.circular(8),
                        child: Image.file(imageFile, fit: BoxFit.cover),
                      )
                      : Center(
                        child: Icon(
                          Icons.add_circle_outline,
                          color: Color(0xFF013171),
                          size: 40,
                        ),
                      ),
            ),
          ),
        ),
        if (_errors[fieldName] != null)
          Padding(
            padding: const EdgeInsets.only(top: 4, left: 4),
            child: Text(
              _errors[fieldName]!,
              style: const TextStyle(color: Colors.red, fontSize: 12),
            ),
          ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Color(0xFF013171),
        centerTitle: true,
        title: const Text(
          "Create Personal Document",
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
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text("Document Type:", style: _labelStyle),
            const SizedBox(height: 6),
            DropdownButtonFormField<String>(
              value: _selectedType,
              items: typeOptions.map((type) {
                return DropdownMenuItem(value: type, child: Text(type));
              }).toList(),
              onChanged: (value) => setState(() => _selectedType = value),
              decoration: InputDecoration(
                contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                errorText: _errors["type"],
              ),
            ),
            const SizedBox(height: 20),
            const Text("Citizen Number:", style: _labelStyle),
            const SizedBox(height: 6),
            _buildInput(citizenNoController, fieldName: "citizenNumber"),
            const SizedBox(height: 20),
            const Text("Issued Place:", style: _labelStyle),
            const SizedBox(height: 6),
            _buildInput(issuedPlaceController, fieldName: "issuePlace"),
            const SizedBox(height: 20),
            const Text("Issued Date:", style: _labelStyle),
            const SizedBox(height: 6),
            _buildInput(
              issuedDateController,
              fieldName: "issueDate",
              keyboardType: TextInputType.none,
              onTap: () => _selectDate(context, issuedDateController),
            ),
            const SizedBox(height: 20),
            const Text("Expiration Date:", style: _labelStyle),
            const SizedBox(height: 6),
            _buildInput(
              expirationDateController,
              fieldName: "expirationDate",
              keyboardType: TextInputType.none,
              onTap: () => _selectDate(context, expirationDateController),
            ),
            const SizedBox(height: 20),
            const Text("Document Image:", style: _labelStyle),
            const SizedBox(height: 5),
            Row(
              children: [
                Expanded(
                  child: _buildImagePicker(
                    index: 1,
                    fieldName: 'frontImage',
                    imageFile: _frontImage,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: _buildImagePicker(
                    index: 2,
                    fieldName: 'backImage',
                    imageFile: _backImage,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
            const Text("Face Photo:", style: _labelStyle),
            const SizedBox(height: 5),
            SizedBox(
              height: 134,
              width: 180,
              child: _buildImagePicker(
                index: 3,
                fieldName: 'faceImage',
                imageFile: _faceImage,
              ),
            ),
            const SizedBox(height: 30),
            Center(
              child: ElevatedButton(
                onPressed: _handleSave,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color(0xFF013171),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 40,
                    vertical: 12,
                  ),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                child: const Text(
                  "Save",
                  style: TextStyle(
                    fontFamily: 'Lexend',
                    fontSize: 17,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  static const TextStyle _labelStyle = TextStyle(
    fontFamily: "Raleway",
    fontWeight: FontWeight.bold,
    fontSize: 16,
  );
}
