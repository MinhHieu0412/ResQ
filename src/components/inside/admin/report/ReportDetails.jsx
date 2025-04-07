import React from "react";

const ReportDetails = ({ onBack }) => {
  // Sample data for the report
  const reportData = {
    staff: "CSKH Mai Văn Vũ",
    complainant: {
      name: "Nguyễn Hạ Nhi",
      id: "U12345",
    },
    defendant: {
      name: "Nguyễn Thanh Phong",
      id: "P23456",
    },
    sentTime: "12:03 - 13/03/2025",
    reason: "Có hành vi lừa đảo, lừa tiền khách hàng, dùng hàng kém chất lượng",
    request: "Khóa vĩnh viễn account của đối tác này và yêu cầu bồi thường...",
    chatLink: "https://example.com/chat-records.pdf",
  };

  return (
    <div className="p-6 bg-white max-w-3xl mx-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold text-gray-800">
            Chi tiết khiếu nại
          </h1>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
          >
            Quay lại
          </button>
        </div>

        <div className="space-y-4">
          <DetailItem label="Nhân viên CSKH" value={reportData.staff} />
          <DetailItem
            label="Tài khoản khiếu nại"
            value={`${reportData.complainant.name} (ID: ${reportData.complainant.id})`}
          />
          <DetailItem
            label="Tố cáo tài khoản"
            value={`${reportData.defendant.name} (ID: ${reportData.defendant.id})`}
          />
          <DetailItem label="Gửi lúc" value={reportData.sentTime} />

          <div>
            <Label>Với lý do:</Label>
            <p className="mt-1 text-gray-700 bg-gray-50 p-3 rounded-lg">
              {reportData.reason}
            </p>
          </div>

          <div>
            <Label>Đề nghị:</Label>
            <p className="mt-1 text-gray-700 bg-gray-50 p-3 rounded-lg">
              {reportData.request}
            </p>
          </div>

          <div>
            <Label>Đoạn chat chi tiết:</Label>
            <a
              href={reportData.chatLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-blue-600 hover:text-blue-800 hover:underline"
            >
              Link truy cập file pdf đoạn chat được lưu lại
            </a>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200">
            Giải quyết
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="flex gap-4">
    <Label>{label}</Label>
    <span className="text-gray-700 flex-1">{value}</span>
  </div>
);

const Label = ({ children }) => (
  <span className="w-48 flex-shrink-0 text-gray-500 font-medium">
    {children}
  </span>
);

export default ReportDetails;
