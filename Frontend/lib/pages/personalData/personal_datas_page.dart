import 'package:flutter/material.dart';
import 'package:frontend/services/api.dart';

class PersonalDatasPage extends StatefulWidget {
  final int customerId;

  const PersonalDatasPage({super.key, required this.customerId});

  @override
  State<PersonalDatasPage> createState() => _PersonalDatasPageState();
}

class _PersonalDatasPageState extends State<PersonalDatasPage> {
  List<dynamic>? personalDatas;
  String? error;
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchPersonalDatas();
  }

  Future<void> fetchPersonalDatas() async {
    try {
      final result = await ApiService.getCustomerPersonalData(
        widget.customerId,
      );
      setState(() {
        personalDatas = result;
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        error = e.toString();
        isLoading = false;
      });
    }
  }

  String _maskCitizenNumber(dynamic value) {
    final citizenNumber = (value ?? '').toString();
    if (citizenNumber.length >= 4) {
      return '***' + citizenNumber.substring(citizenNumber.length - 4);
    } else {
      return citizenNumber.isEmpty
          ? 'Unknown Citizen Number'
          : '***' + citizenNumber;
    }
  }

  List<String> _getAvailableTypes() {
    final existingTypes = personalDatas?.map((e) => e['type']).toSet() ?? {};
    final allTypes = {'Identity Card', 'Passport'};
    return allTypes.difference(existingTypes.toSet()).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.blue[900],
        title: const Text(
          "Personal Documents",
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
                          personalDatas == null || personalDatas!.isEmpty
                              ? const Center(
                                child: Text(
                                  "No personal data found",
                                  style: TextStyle(
                                    fontFamily: 'Lexend',
                                    fontSize: 18,
                                    color: Colors.black54,
                                    fontStyle: FontStyle.italic,
                                  ),
                                ),
                              )
                              : ListView.builder(
                                itemCount: personalDatas!.length,
                                itemBuilder: (context, index) {
                                  final personalData = personalDatas![index];
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
                                        personalData['type'] ?? 'Unknown Type',
                                      ),
                                      subtitle: Text(
                                        _maskCitizenNumber(
                                              personalData['citizenNumber'],
                                            ) +
                                            ' - Expired Date: ' +
                                            (personalData['expirationDate'] ??
                                                'Unknown Expiration Date'),
                                      ),
                                      onTap: () async {
                                        final result =
                                            await Navigator.pushNamed(
                                              context,
                                              '/personalDataDetail',
                                              arguments: personalData,
                                            );
                                        if (result is bool && result == true) {
                                          await fetchPersonalDatas();
                                        }
                                      },
                                    ),
                                  );
                                },
                              ),
                    ),
                    const SizedBox(height: 20),
                    // TextButton.icon(
                    //   onPressed: () async {
                    //     final result = await Navigator.pushNamed(
                    //       context,
                    //       '/newPersonalData',
                    //       arguments: {
                    //         'customerId': widget.customerId,
                    //         'availableTypes': _getAvailableTypes(),
                    //       },
                    //     );
                    //     if (result == true) {
                    //       await fetchPersonalDatas(); // Cập nhật lại danh sách
                    //     }
                    //   },
                    //   icon: Container(
                    //     decoration: const BoxDecoration(shape: BoxShape.circle),
                    //     padding: const EdgeInsets.all(4),
                    //     child: Image.asset(
                    //       'assets/icons/plus_red.png',
                    //       width: 22,
                    //       height: 20,
                    //       fit: BoxFit.contain,
                    //     ),
                    //   ),
                    //   label: Text(
                    //     "Add New Personal Document",
                    //     style: TextStyle(
                    //       color: Colors.red[900],
                    //       fontWeight: FontWeight.bold,
                    //       fontSize: 18,
                    //     ),
                    //   ),
                    //   style: TextButton.styleFrom(
                    //     foregroundColor: Colors.blue[900],
                    //     padding: const EdgeInsets.symmetric(
                    //       horizontal: 8,
                    //       vertical: 4,
                    //     ),
                    //   ),
                    // ),
                    if ((personalDatas?.length ?? 0) < 2)
                      TextButton.icon(
                        onPressed: () async {
                          final result = await Navigator.pushNamed(
                            context,
                            '/newPersonalData',
                            arguments: {
                              'customerId': widget.customerId,
                              'availableTypes': _getAvailableTypes(),
                            },
                          );
                          if (result == true) {
                            await fetchPersonalDatas(); // Cập nhật lại danh sách
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
                          "Add New Personal Document",
                          style: TextStyle(
                            color: Colors.red[900],
                            fontWeight: FontWeight.bold,
                            fontSize: 18,
                          ),
                        ),
                        style: TextButton.styleFrom(
                          foregroundColor: Colors.blue[900],
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
