import React, { useState } from "react";

const Documents = () => {
  const [activeTab, setActiveTab] = useState("cccd");

  const cccdData = {
    name: "Nguyễn Văn A",
    idNumber: "123456789012",
    address: "222 CMT8, Quận 3, TP.HCM",
    issueDate: "01/01/2020",
    expiryDate: "01/01/2030",
    status: "Chờ xác minh",
    frontImage: "",
    backImage: "",
  };

  const vehicleData = {
    plateNumber: "59A1-123.45",
    frameNumber: "KH123456789",
    vehicleType: "Xe máy",
    owner: "Nguyễn Văn A",
    regDate: "02/02/2020",
    authority: "Công an TP.HCM",
    status: "Đã xác minh",
    frontImage: "",
    backImage: "",
  };

  const renderCCCD = () => (
    <>
      <div className="border p-4 rounded-lg shadow-sm mb-4">
        <p>
          <strong>Người đứng tên:</strong> {cccdData.name}
        </p>
        <p>
          <strong>Số giấy tờ:</strong> {cccdData.idNumber}
        </p>
        <p>
          <strong>Địa chỉ trên giấy tờ:</strong> {cccdData.address}
        </p>
        <p>
          <strong>Ngày cấp:</strong> {cccdData.issueDate}
        </p>
        <p>
          <strong>Ngày hết hạn:</strong> {cccdData.expiryDate}
        </p>
        <p>
          <strong>Trạng thái xác minh:</strong> {cccdData.status}
        </p>
      </div>

      <div className="flex justify-center gap-10 mb-4">
        <div className="w-40 h-52 border rounded" />
        <div className="w-40 h-52 border rounded" />
      </div>

      <div className="flex justify-center gap-4">
        <button className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded">
          Duyệt
        </button>
        <button className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded">
          Yêu cầu cập nhật
        </button>
      </div>
    </>
  );

  const renderVehicle = () => (
    <>
      <div className="border p-4 rounded-lg shadow-sm mb-4">
        <p>
          <strong>Biển số xe:</strong> {vehicleData.plateNumber}
        </p>
        <p>
          <strong>Khung, số máy:</strong> {vehicleData.frameNumber}
        </p>
        <p>
          <strong>Loại xe:</strong> {vehicleData.vehicleType}
        </p>
        <p>
          <strong>Tên chủ sở hữu:</strong> {vehicleData.owner}
        </p>
        <p>
          <strong>Ngày cấp giấy đăng ký:</strong> {vehicleData.regDate}
        </p>
        <p>
          <strong>Cơ quan cấp:</strong> {vehicleData.authority}
        </p>
        <p>
          <strong>Trạng thái xác minh:</strong> {vehicleData.status}
        </p>
      </div>

      <div className="flex justify-center gap-10 mb-1">
        <div className="flex flex-col items-center">
          <div className="w-40 h-52 border rounded" />
          <span className="mt-1 text-sm font-medium">Mặt trước</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-40 h-52 border rounded" />
          <span className="mt-1 text-sm font-medium">Mặt sau</span>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <button className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded">
          Duyệt
        </button>
        <button className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded">
          Yêu cầu cập nhật
        </button>
      </div>
    </>
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setActiveTab("cccd")}
          className={`px-4 py-2 rounded-full border ${
            activeTab === "cccd"
              ? "bg-blue-800 text-white"
              : "text-blue-800 border-blue-800"
          }`}
        >
          CCCD
        </button>
        <button
          onClick={() => setActiveTab("vehicle")}
          className={`px-4 py-2 rounded-full border ${
            activeTab === "vehicle"
              ? "bg-blue-800 text-white"
              : "text-blue-800 border-blue-800"
          }`}
        >
          Giấy tờ xe
        </button>
      </div>

      {activeTab === "cccd" ? renderCCCD() : renderVehicle()}
    </div>
  );
};

export default Documents;
