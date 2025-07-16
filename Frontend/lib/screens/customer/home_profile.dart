import 'package:flutter/material.dart';
import './security_profile.dart';
import '../../models/auth/login_response.dart';

class HomeProfilePage extends StatefulWidget {
  final LoginResponse loginResponse;

  const HomeProfilePage({super.key, required this.loginResponse});

  @override
  State<HomeProfilePage> createState() => _HomeProfilePageState();
}

class _HomeProfilePageState extends State<HomeProfilePage> {
  int currentIndex = 2;

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    final screenWidth = MediaQuery.of(context).size.width;

    final bgHeight = screenHeight * 0.22;
    final infoHeight = screenHeight * 0.14;
    final navBarHeight = screenHeight * 0.12;
    final avatarRadius = 100.0;
    final avatarTop = bgHeight - avatarRadius;
    final gridHeight = screenHeight - bgHeight - infoHeight - navBarHeight;
    final avatarSize = 80.0;
    final avatarPadding = 6.0;
    final avatarBorder = 3.0;
    final avatarTotalWidth =
        avatarSize * 2 + avatarPadding * 2 + avatarBorder * 2;

    return Scaffold(
      backgroundColor: Colors.white,
      body: Column(
        children: [
          // Nền  + Avatar
          Stack(
            clipBehavior: Clip.none,
            children: [
              Container(
                height: bgHeight,
                width: double.infinity,
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Colors.deepPurple, Colors.black],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ),
                  border: Border(
                    bottom: BorderSide(color: Colors.grey.shade300, width: 0.5),
                  ),
                ),
                padding: const EdgeInsets.only(top: 0, left: 20, right: 20),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Image.asset(
                      'assets/icons/settings.png',
                      width: 40,
                      height: 40,
                      fit: BoxFit.contain,
                      errorBuilder:
                          (context, error, stackTrace) =>
                              const Icon(Icons.settings, color: Colors.white),
                    ),
                  ],
                ),
              ),
              Positioned(
                top: avatarTop,
                left: (screenWidth - avatarTotalWidth) / 2,
                child: Container(
                  padding: const EdgeInsets.all(6),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.deepPurple, width: 3),
                    color: Colors.white,
                  ),
                  child: CircleAvatar(
                    radius: avatarSize,
                    backgroundColor: Colors.white,
                    child: Icon(
                      Icons.pets,
                      size: avatarSize,
                      color: Colors.deepPurple,
                    ),
                  ),
                ),
              ),
            ],
          ),

          // Info dưới avatar (15% chiều cao)
          SizedBox(
            height: infoHeight,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                // Bên trái: Tên + ID
                Padding(
                  padding: const EdgeInsets.only(left: 40),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        widget.loginResponse.userName,
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      SizedBox(height: 4),
                      Text(
                        'ID: U999',
                        style: TextStyle(
                          fontSize: 14,
                          color: Color(0xFFBB0000),
                        ),
                      ),
                    ],
                  ),
                ),

                // Bên phải: Res Thố + Logo
                Padding(
                  padding: const EdgeInsets.only(right: 40),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text(
                        'Res Thố',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Colors.orange,
                        ),
                      ),
                      const SizedBox(width: 6),
                      Image.asset(
                        'assets/icons/res_logo.png',
                        width: 20,
                        height: 20,
                        fit: BoxFit.contain,
                        errorBuilder:
                            (context, error, stackTrace) => const Icon(
                              Icons.shield,
                              color: Colors.orange,
                              size: 20,
                            ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // Divider
          const Divider(height: 0.5, thickness: 0.5, color: Colors.grey),

          // Grid 9 nút (chiếm toàn bộ chiều cao còn lại trừ navbar)
          Expanded(
            child: SizedBox(
              height: gridHeight,
              width: screenWidth,
              child: GridView.builder(
                physics: const NeverScrollableScrollPhysics(),
                padding: EdgeInsets.zero,
                itemCount: 9,
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 3, // 3 cột
                  mainAxisExtent: gridHeight / 3, // mỗi hàng 1/3 chiều cao grid
                ),
                itemBuilder: (context, index) {
                  final titles = [
                    "Personal\nProfile",
                    "Security\nProfile",
                    "Identity\nVerification",
                    "Documents",
                    "Rescue\nHistory",
                    "Saved\nLocations",
                    "Vehicles",
                    "Payment\nMethods",
                    "Account\nStatistics",
                  ];
                  final icons = [
                    "assets/icons/profile.png",
                    "assets/icons/security.png",
                    "assets/icons/verify.png",
                    "assets/icons/document.png",
                    "assets/icons/history.png",
                    "assets/icons/location.png",
                    "assets/icons/vehicle.png",
                    "assets/icons/payment.png",
                    "assets/icons/stats.png",
                  ];
                  return _buildGridButton(
                    titles[index],
                    icons[index],
                    onTap: () {
                      if (index == 1) {
                        // Nếu nhấn "Security Profile"
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const SecurityProfilePage(),
                          ),
                        );
                      } else {
                        // Tạm thời: Hiện thông báo các nút khác
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text('Clicked on "${titles[index]}"'),
                          ),
                        );
                      }
                    },
                  );
                },
              ),
            ),
          ),
        ],
      ),

      // Bottom Navigation (10%)
      bottomNavigationBar: Container(
        height: navBarHeight,
        decoration: const BoxDecoration(
          border: Border(top: BorderSide(color: Colors.grey, width: 0.5)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Divider(height: 0.5, thickness: 0.5, color: Colors.grey),
            Expanded(
              child: BottomNavigationBar(
                currentIndex: currentIndex,
                onTap: (index) {
                  setState(() {
                    currentIndex = index;
                  });
                },
                selectedItemColor: Colors.deepPurple,
                unselectedItemColor: Colors.grey[400],
                showSelectedLabels: false,
                showUnselectedLabels: false,
                type: BottomNavigationBarType.fixed,
                items: [
                  BottomNavigationBarItem(
                    icon: Image.asset(
                      currentIndex == 0
                          ? 'assets/icons/clickhome.png'
                          : 'assets/icons/home.png',
                      width: 24,
                      height: 24,
                    ),
                    label: 'Home',
                  ),
                  BottomNavigationBarItem(
                    icon: Image.asset(
                      currentIndex == 1
                          ? 'assets/icons/clickchat.png'
                          : 'assets/icons/chat.png',
                      width: 24,
                      height: 24,
                    ),
                    label: 'Chat',
                  ),
                  BottomNavigationBarItem(
                    icon: Image.asset(
                      currentIndex == 2
                          ? 'assets/icons/clickallprofile.png'
                          : 'assets/icons/allprofile.png',
                      width: 24,
                      height: 24,
                    ),
                    label: 'Profile',
                  ),
                  BottomNavigationBarItem(
                    icon: Image.asset(
                      currentIndex == 3
                          ? 'assets/icons/clicknotification.png'
                          : 'assets/icons/notification.png',
                      width: 24,
                      height: 24,
                    ),
                    label: 'Notifications',
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildGridButton(
    String label,
    String iconPath, {
    VoidCallback? onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          border: Border.all(color: Colors.grey.shade300, width: 0.8),
        ),
        padding: const EdgeInsets.symmetric(vertical: 10),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              iconPath,
              width: 32,
              height: 32,
              errorBuilder:
                  (context, error, stackTrace) => const Icon(
                    Icons.image_not_supported,
                    color: Color(0xFFBB0000),
                  ),
            ),
            const SizedBox(height: 8),
            Text(
              label,
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 13),
            ),
          ],
        ),
      ),
    );
  }
}
