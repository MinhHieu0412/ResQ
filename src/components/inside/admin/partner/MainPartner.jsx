import React, { useState } from "react";
import SidebarPartner from "./SidebarPartner";
import Performance from "./Performance";
import RescueCalls from "./RescueCalls";
import Revenue from "./Revenue";
import Violations from "./Violations";
import Documents from "./Documents";
import Vehicles from "./Vehicles";
import "../../../../styles/admin/partner.css";

const MainPartner = () => {
  const [selectedTab, setSelectedTab] = useState("performance");

  const renderContent = () => {
    switch (selectedTab) {
      case "performance":
        return <Performance />;
      case "rescues":
        return <RescueCalls />;
      case "revenue":
        return <Revenue />;
      case "violations":
        return <Violations />;
      case "documents":
        return <Documents />;
      case "vehicles":
        return <Vehicles />;
      default:
        return <div>Chọn chức năng từ sidebar</div>;
    }
  };

  return (
    <div className="flex gap-4 maincontent-partner">
      <SidebarPartner
        onSelect={setSelectedTab}
        activeKey={selectedTab}
        className="sidebar-partner"
      />
      <div className="flex-1 rounded-xl shadow p-4 main-partner">
        {renderContent()}
      </div>
    </div>
  );
};

export default MainPartner;
