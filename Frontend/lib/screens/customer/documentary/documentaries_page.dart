import 'package:flutter/material.dart';
import 'package:frontend/services/customerAPI.dart';

class DocumentariesPage extends StatefulWidget {
  final int customerId;

  const DocumentariesPage({super.key, required this.customerId});

  @override
  State<DocumentariesPage> createState() => _DocumentariesPageState();
}

class _DocumentariesPageState extends State<DocumentariesPage> {
  List<dynamic>? documents;
  String? error;
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchDocuments();
  }

  Future<void> fetchDocuments() async {
    try {
      final result = await ApiService.getCustomerDocuments(
        widget.customerId,
      );
      setState(() {
        documents = result;
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        error = e.toString();
        isLoading = false;
      });
    }
  }

  String _maskDocNumber(dynamic value) {
    final documentNumber = (value ?? '').toString();
    if (documentNumber.length >= 4) {
      return '***' + documentNumber.substring(documentNumber.length - 4);
    } else {
      return documentNumber.isEmpty
          ? 'Unknown Document Number'
          : '***' + documentNumber;
    }
  }

  List<String> _getAvailableTypes() {
    final existingTypes = documents?.map((e) => e['type']).toSet() ?? {};
    final allTypes = {'Identity Card', 'Passport'};
    return allTypes.difference(existingTypes.toSet()).toList();
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
          style: TextStyle(fontFamily: 'Lexend', fontSize: 17),
        ),
      ),
    );

    Future.delayed(const Duration(seconds: 3), () {
      if (mounted) {
        Navigator.of(context, rootNavigator: true).pop(); // Đóng dialog
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Color(0xFF013171),
        title: const Text(
          "Documents",
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
        padding: const EdgeInsets.all(16.0),
        child:
        isLoading
            ? const Center(child: CircularProgressIndicator())
            : error != null
            ? Center(
          child: Text(
            "Error: $error",
            style: const TextStyle(color: Colors.red),
          ),
        )
            : Column(
          children: [
            Expanded(
              child:
              documents == null || documents!.isEmpty
                  ? const Center(
                child: Text(
                  "No document found",
                  style: TextStyle(
                    fontFamily: 'Lexend',
                    fontSize: 18,
                    color: Colors.black54,
                    fontStyle: FontStyle.italic,
                  ),
                ),
              )
                  : ListView.builder(
                itemCount: documents!.length,
                itemBuilder: (context, index) {
                  final doc = documents![index];
                  return Container(
                    margin: const EdgeInsets.symmetric(
                      vertical: 8,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      border: Border.all(
                        color: const Color(0xFF013171),
                        width: 1.68,
                      ),
                      borderRadius: BorderRadius.circular(12),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.17),
                          blurRadius: 2,
                          offset: const Offset(2, 6),
                        ),
                      ],
                    ),
                    child: ListTile(
                      title: Text(
                        doc['documentType'] ?? 'Unknown Type',
                      ),
                      subtitle: Text(
                        _maskDocNumber(
                          doc['documentNumber'],
                        ) +
                            ' - Expired Date: ' +
                            (doc['expiryDate'] ??
                                'Unknown Expiration Date'),
                      ),
                      trailing: IconButton(
                        icon: Icon(
                          Icons.delete,
                          color: Colors.red[800],
                        ),
                        onPressed: () async {
                          final confirm = await showDialog<
                              bool
                          >(
                            context: context,
                            builder:
                                (ctx) => AlertDialog(
                              title: Center(
                                child: Text(
                                  "Delete Vehicle",
                                  style: TextStyle(
                                    fontFamily: "Raleway",
                                    fontSize: 26,
                                    fontWeight:
                                    FontWeight.bold,
                                    color: Color(
                                      0xFF013171,
                                    ),
                                  ),
                                ),
                              ),
                              content: Text(
                                "Do you want to delete documents with plate no ${doc['documentType']}?",
                                style: TextStyle(
                                  fontFamily: "Lexend",
                                  fontSize: 15,
                                ),
                              ),
                              actions: [
                                TextButton(
                                  onPressed:
                                      () => Navigator.pop(
                                    ctx,
                                    false,
                                  ),
                                  child: Text(
                                    "Cancel",
                                    style: TextStyle(
                                      color:
                                      Colors.blue[900],
                                      fontSize: 16,
                                      fontWeight:
                                      FontWeight.bold,
                                    ),
                                  ),
                                ),
                                TextButton(
                                  onPressed:
                                      () => Navigator.pop(ctx,true,),
                                  child: const Text(
                                    "Delete",
                                    style: TextStyle(
                                      color: Colors.red,
                                      fontSize: 16,
                                      fontWeight:
                                      FontWeight.bold,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          );

                          if (confirm == true) {
                            try {
                              await ApiService.deleteDocument(
                                doc['documentId'],
                              ); // id phải đúng key
                              await fetchDocuments(); // cập nhật danh sách sau khi xóa
                              _showDialog(
                                "Success",
                                "Delete document successfully!",
                              );
                            } catch (e) {
                              _showDialog(
                                "Fail",
                                "Delete document failed!",
                              );
                            }
                          }
                        },
                      ),
                      onTap: () async {
                        final result =
                        await Navigator.pushNamed(
                          context,
                          '/documentDetail',
                          arguments: doc,
                        );
                        if (result is bool && result == true) {
                          await fetchDocuments();
                        }
                      },
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 20),
            TextButton.icon(
              onPressed: () async {
                final result = await Navigator.pushNamed(context, '/newDocument');
                if (result == true) {
                  await fetchDocuments(); // Cập nhật lại danh sách
                }
              },
              icon: Container(
                decoration: const BoxDecoration(shape: BoxShape.circle),
                padding: const EdgeInsets.all(4),
                child: Image.asset(
                  'assets/icons/plus_red.png',
                  width: 22,
                  height: 20,
                  fit: BoxFit.contain,
                ),
              ),
              label: Text(
                "Add New Document",
                style: TextStyle(
                  color: Colors.red[900],
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                ),
              ),
              style: TextButton.styleFrom(
                foregroundColor: Color(0xFF013171),
                padding: const EdgeInsets.symmetric(
                  horizontal: 8,
                  vertical: 4,
                ),
              ),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}
