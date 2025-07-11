import 'package:flutter/material.dart';
import 'package:frontend/services/api.dart';

class VehiclesPage extends StatefulWidget {
  final int customerId;

  const VehiclesPage({super.key, required this.customerId});

  @override
  State<VehiclesPage> createState() => _VehiclesPageState();
}

class _VehiclesPageState extends State<VehiclesPage> {
  List<dynamic>? vehicles;
  String? error;
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchVehicles();
  }

  Future<void> fetchVehicles() async {
    try {
      final result = await ApiService.getCustomerVehicles(widget.customerId);
      setState(() {
        vehicles = result;
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        error = e.toString();
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.blue[900],
        title: const Text(
          "Vehicles",
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
                          vehicles == null || vehicles!.isEmpty
                              ? const Center(
                                child: Text(
                                  "No vehicles found",
                                  style: TextStyle(
                                    fontFamily: 'Lexend',
                                    fontSize: 18,
                                    color: Colors.black54,
                                    fontStyle: FontStyle.italic,
                                  ),
                                ),
                              )
                              : ListView.builder(
                                itemCount: vehicles!.length,
                                itemBuilder: (context, index) {
                                  final vehicle = vehicles![index];
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
                                        vehicle['plateNo'] ??
                                            'Unknown Plate No',
                                      ),
                                      subtitle: Text(
                                        (vehicle['brand'] ?? 'Unknown Brand') +
                                            ' ' +
                                            (vehicle['model'] ??
                                                'Unknown Model') +
                                            ' ' +
                                            (vehicle['year'].toString() ??
                                                'Unknown Year'),
                                      ),
                                      onTap: () async {
                                        final result = await Navigator.pushNamed(
                                          context,
                                          '/vehicleDetail',
                                          arguments: vehicle,
                                        );
                                        if (result is bool && result == true) {
                                          await fetchVehicles();
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
                        final result = await Navigator.pushNamed(context, '/newVehicle');
                        if (result == true) {
                          await fetchVehicles(); // Cập nhật lại danh sách
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
                        "Add New Vehicle",
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
