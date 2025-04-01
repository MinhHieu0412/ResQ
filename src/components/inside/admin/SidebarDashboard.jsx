import React, { useState } from "react";
import "../../../styles/sidebar_dashboard.css";

const SidebarDashboard = () => {
  // State to track the active button
  const [activeButton, setActiveButton] = useState("dashboard");

  // Function to handle button click and change active button
  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId); // Set the active button
  };
  return (
    <div className="w-full border-sidebar">
      <div className="flex flex-col">
        <div className="w-full flex justify-center items-center">
          <img
            src="../../../../public/images/6.6.png"
            alt="logo_resq"
            className="w-logo"
          />
        </div>

        {/* Sidebar Content */}
        {/* Content1 */}
        <div className="w-full flex flex-col justify-start items-center">
          {/* Title */}
          <div className="title-sidebar my-2">Tổng quan & Quản lý chung</div>

          {/* Dashboard */}
          <button
            className={`btn-sidebar mb-2 ${
              activeButton === "dashboard" ? "focus-btn" : ""
            }`}
            onClick={() => handleButtonClick("dashboard")}
          >
            <img
              src={
                activeButton === "dashboard"
                  ? "/images/icon-web/LaptopMetrics_w.png"
                  : "/images/icon-web/Laptop_Metrics.png"
              }
              alt="item-logo-sidebar"
              className="img-icon-small"
            />
            <p
              className={`font-lexend text-btn-sidebar ${
                activeButton === "dashboard" ? "text-white" : "text-btn-sidebar"
              }`}
            >
              Dashboard
            </p>
          </button>
          {/* Feedback */}
          <button
            className={`btn-sidebar mb-2 ${
              activeButton === "feedback" ? "focus-btn" : ""
            }`}
            onClick={() => handleButtonClick("feedback")}
          >
            <img
              src={
                activeButton === "feedback"
                  ? "/images/icon-web/Popular1.png"
                  : "/images/icon-web/Popular.png"
              }
              alt="item-logo-sidebar"
              className="img-icon-small"
            />
            <p
              className={`font-lexend text-btn-sidebar ${
                activeButton === "feedback" ? "text-white" : "text-btn-sidebar"
              }`}
            >
              Feedback
            </p>
          </button>
          {/* Report */}
          <button
            className={`btn-sidebar ${
              activeButton === "report" ? "focus-btn" : ""
            }`}
            onClick={() => handleButtonClick("report")}
          >
            <img
              src={
                activeButton === "report"
                  ? "/images/icon-web/High Importance1.png"
                  : "/images/icon-web/High Importance.png"
              }
              alt="item-logo-sidebar"
              className="img-icon-small"
            />
            <p
              className={`font-lexend text-btn-sidebar ${
                activeButton === "report" ? "text-white" : "text-btn-sidebar"
              }`}
            >
              Khiếu nại
            </p>
          </button>
        </div>

        {/* Content2 */}
        <div className="w-full flex flex-col justify-start items-center">
          {/* Title */}
          <div className="title-sidebar my-2">Nhân sự & đối tác</div>

          {/* Staff */}
          <button
            className={`btn-sidebar mb-2 ${
              activeButton === "staff" ? "focus-btn" : ""
            }`}
            onClick={() => handleButtonClick("staff")}
          >
            <img
              src={
                activeButton === "staff"
                  ? "/images/icon-web/Staff1.png"
                  : "/images/icon-web/Staff.png"
              }
              alt="item-logo-sidebar"
              className="img-icon-small"
            />
            <p
              className={`font-lexend text-btn-sidebar ${
                activeButton === "staff" ? "text-white" : "text-btn-sidebar"
              }`}
            >
              Nhân viên
            </p>
          </button>

          {/* Manager */}
          <button
            className={`btn-sidebar mb-2 ${
              activeButton === "manager" ? "focus-btn" : ""
            }`}
            onClick={() => handleButtonClick("manager")}
          >
            <img
              src={
                activeButton === "manager"
                  ? "/images/icon-web/Manager1.png"
                  : "/images/icon-web/Manager.png"
              }
              alt="item-logo-sidebar"
              className="img-icon-small"
            />
            <p
              className={`font-lexend text-btn-sidebar ${
                activeButton === "manager" ? "text-white" : "text-btn-sidebar"
              }`}
            >
              Quản lý
            </p>
          </button>

          {/* Partner */}
          <button
            className={`btn-sidebar mb-2 ${
              activeButton === "partner" ? "focus-btn" : ""
            }`}
            onClick={() => handleButtonClick("partner")}
          >
            <img
              src={
                activeButton === "partner"
                  ? "/images/icon-web/Handshake1.png"
                  : "/images/icon-web/Handshake.png"
              }
              alt="item-logo-sidebar"
              className="img-icon-small"
            />
            <p
              className={`font-lexend text-btn-sidebar ${
                activeButton === "partner" ? "text-white" : "text-btn-sidebar"
              }`}
            >
              Đối tác
            </p>
          </button>
        </div>

        {/* Content3 */}
        <div className="w-full flex flex-col justify-start items-center">
          {/* Title */}
          <div className="title-sidebar my-2">Khách hàng & dịch vụ</div>

          {/* Customer */}
          <button
            className={`btn-sidebar mb-2 ${
              activeButton === "customer" ? "focus-btn" : ""
            }`}
            onClick={() => handleButtonClick("customer")}
          >
            <img
              src={
                activeButton === "customer"
                  ? "/images/icon-web/Customer Insight1.png"
                  : "/images/icon-web/Customer Insight.png"
              }
              alt="item-logo-sidebar"
              className="img-icon-small"
            />
            <p
              className={`font-lexend text-btn-sidebar ${
                activeButton === "customer" ? "text-white" : "text-btn-sidebar"
              }`}
            >
              Khách hàng
            </p>
          </button>

          {/* Rescue Servies */}
          <button
            className={`btn-sidebar mb-2 ${
              activeButton === "services" ? "focus-btn" : ""
            }`}
            onClick={() => handleButtonClick("services")}
          >
            <img
              src={
                activeButton === "services"
                  ? "/images/icon-web/Google Home1.png"
                  : "/images/icon-web/Google Home.png"
              }
              alt="item-logo-sidebar"
              className="img-icon-small"
            />
            <p
              className={`font-lexend text-btn-sidebar ${
                activeButton === "services" ? "text-white" : "text-btn-sidebar"
              }`}
            >
              Dịch vụ cứu hộ
            </p>
          </button>

          {/* Rescue Request */}
          <button
            className={`btn-sidebar ${
              activeButton === "resq" ? "focus-btn" : ""
            }`}
            onClick={() => handleButtonClick("resq")}
          >
            <img
              src={
                activeButton === "resq"
                  ? "/images/icon-web/Request Service1.png"
                  : "/images/icon-web/Request Service.png"
              }
              alt="item-logo-sidebar"
              className="img-icon-small"
            />
            <p
              className={`font-lexend text-btn-sidebar ${
                activeButton === "resq" ? "text-white" : "text-btn-sidebar"
              }`}
            >
              Yêu cầu cứu hộ
            </p>
          </button>
        </div>

        {/* Content4 */}
        <div className="w-full flex flex-col justify-start items-center">
          {/* Title */}
          <div className="title-sidebar my-2">Ưu đãi và sự kiện</div>

          {/* Discount */}
          <button
            className={`btn-sidebar mb-2 ${
              activeButton === "discount" ? "focus-btn" : ""
            }`}
            onClick={() => handleButtonClick("discount")}
          >
            <img
              src={
                activeButton === "discount"
                  ? "/images/icon-web/Discount1.png"
                  : "/images/icon-web/Discount.png"
              }
              alt="item-logo-sidebar"
              className="img-icon-small"
            />
            <p
              className={`font-lexend text-btn-sidebar ${
                activeButton === "discount" ? "text-white" : "text-btn-sidebar"
              }`}
            >
              Giảm giá
            </p>
          </button>

          {/* Schedule */}
          <button
            className={`btn-sidebar ${
              activeButton === "schedule" ? "focus-btn" : ""
            }`}
            onClick={() => handleButtonClick("schedule")}
          >
            <img
              src={
                activeButton === "schedule"
                  ? "/images/icon-web/Schedule1.png"
                  : "/images/icon-web/Schedule.png"
              }
              alt="item-logo-sidebar"
              className="img-icon-small"
            />
            <p
              className={`font-lexend text-btn-sidebar ${
                activeButton === "schedule" ? "text-white" : "text-btn-sidebar"
              }`}
            >
              Lịch
            </p>
          </button>
        </div>

        {/* Content5 */}
        <div className="w-full flex flex-col justify-start items-center">
          {/* Title */}
          <div className="title-sidebar my-2">Giao tiếp & Hỗ trợ</div>

          {/* Chat */}
          <button
            className={`btn-sidebar mb-3 ${
              activeButton === "chat" ? "focus-btn" : ""
            }`}
            onClick={() => handleButtonClick("chat")}
          >
            <img
              src={
                activeButton === "chat"
                  ? "/images/icon-web/Computer Chat1.png"
                  : "/images/icon-web/Computer Chat.png"
              }
              alt="item-logo-sidebar"
              className="img-icon-small"
            />
            <p
              className={`font-lexend text-btn-sidebar ${
                activeButton === "chat" ? "text-white" : "text-btn-sidebar"
              }`}
            >
              Chatbox
            </p>
          </button>

          {/* Email */}
          <button
            className={`btn-sidebar mb-3 ${
              activeButton === "mail" ? "focus-btn" : ""
            }`}
            onClick={() => handleButtonClick("mail")}
          >
            <img
              src={
                activeButton === "mail"
                  ? "/images/icon-web/Email1.png"
                  : "/images/icon-web/Email.png"
              }
              alt="item-logo-sidebar"
              className="img-icon-small"
            />
            <p
              className={`font-lexend text-btn-sidebar ${
                activeButton === "mail" ? "text-white" : "text-btn-sidebar"
              }`}
            >
              Email
            </p>
          </button>
        </div>

        {/* Content6 */}
        <div className="w-full flex flex-col justify-start items-center">
          {/* Title */}
          <div className="title-sidebar my-2">Thanh toán</div>

          {/* Payment */}
          <button
            className={`btn-sidebar mb-3 ${
              activeButton === "payment" ? "focus-btn" : ""
            }`}
            onClick={() => handleButtonClick("payment")}
          >
            <img
              src={
                activeButton === "payment"
                  ? "/images/icon-web/Taxi Mobile Payment Euro_hover.png"
                  : "/images/icon-web/Taxi Mobile Payment Euro.png"
              }
              alt="item-logo-sidebar"
              className="img-icon-small"
            />
            <p
              className={`font-lexend text-btn-sidebar ${
                activeButton === "payment" ? "text-white" : "text-btn-sidebar"
              }`}
            >
              Giao dịch
            </p>
          </button>

          {/* Refund */}
          <button
            className={`btn-sidebar mb-5 ${
              activeButton === "refund" ? "focus-btn" : ""
            }`}
            onClick={() => handleButtonClick("refund")}
          >
            <img
              src={
                activeButton === "refund"
                  ? "/images/icon-web/Exchange Dollar.png"
                  : "/images/icon-web/Exchange Dollar1.png"
              }
              alt="item-logo-sidebar"
              className="img-icon-small"
            />
            <p
              className={`font-lexend text-btn-sidebar ${
                activeButton === "refund" ? "text-white" : "text-btn-sidebar"
              }`}
            >
              Yêu cầu thanh toán
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarDashboard;
