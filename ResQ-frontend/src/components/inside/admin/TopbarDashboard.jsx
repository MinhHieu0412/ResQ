import React from "react";
import "../../../styles/topbar.css";

const TopbarDashboard = () => {
  return (
    <div className="w-topbar flex justify-between items-center">
      <button className="btn-back flex justify-center items-center ms-4">
        <img
          src="images/icon-web/Reply Arrow1.png"
          alt="back-icon"
          className="back-icon-admin"
        />
      </button>
      <div className="flex justify-center items-center me-8 w-right-topbar">
        <div className="flex justify-between items-center">
          <img
            src="images/icon-web/Alarm.png"
            alt="back-icon"
            className="noti-icon me-7"
          />
          <div class=" flex items-center justify-center py-20">
            <div class="group relative cursor-pointer py-2">
              <div class="flex items-center space-x-3  px-4 py-2 ">
                <img
                  src="images/icon-web/avatar.jpg"
                  alt="back-icon"
                  className="avatar-icon me-7"
                />
              </div>

              <div class="invisible absolute right-0 z-20 mt-2 flex flex-col bg-white rounded-lg py-2 shadow-lg group-hover:visible hover-avatar">
                <div className="flex items-center hover-avatar hover:bg-gray-100">
                  <div className="ml-5"><img src="/images/icon-web/user-96.png" alt="profile" width={30} height={30}/></div>
                  <a
                    href="#"
                    class="text-drop-topbar font-lexend px-4 py-2 text-gray-700">
                    Hồ sơ cá nhân
                  </a>
                </div>
                <div className="flex items-center hover-avatar hover:bg-gray-100">
                  <div className="ml-5"><img src="/images/icon-web/schedule-96.png" alt="schedule" width={30} height={30} /></div>                  
                  <a
                    href="#"
                    class="text-drop-topbar font-lexend px-4 py-2 text-gray-700">
                    Lịch trình cá nhân
                  </a>
                </div>
                <div className="flex items-center hover-avatar hover:bg-gray-100">
                  <div className="ml-5"><img src="/images/icon-web/logout-96.png" alt="logout" width={30} height={30} /></div>                  
                  <a
                    href="#"
                    class="text-drop-topbar font-lexend px-4 py-2 text-red-500">
                    Đăng xuất
                  </a>
                </div>
              </div>
            </div>
          </div>

          <img
            src="images/icon-web/Settings.png"
            alt="back-icon"
            className="noti-icon"
          />
          <img />
        </div>
      </div>
    </div>
  );
};

export default TopbarDashboard;
