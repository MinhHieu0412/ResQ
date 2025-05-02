import React, { useEffect } from "react";
import SidebarDashboard from "./SidebarDashboard";
import TopbarDashboard from "./TopbarDashboard";
import MainContentDashboard from "./MainContentDashboard";

import "../../../styles/admin.css";

const AdminDashboard = () => {
  useEffect(() => {
    document.title = "ResQ - Admin Dashboard";
  }, []);

  return (
    <div style={{ display: "flex" }} className="w-full all-content-admin">
      {/* Sidebar */}
      <div className="w-admin-sidebar">
        {" "}
        <SidebarDashboard />
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1 }}>
        {/* Topbar */}
        <TopbarDashboard />

        {/* Main Content */}
        <MainContentDashboard />
      </div>
    </div>
  );
};

export default AdminDashboard;
