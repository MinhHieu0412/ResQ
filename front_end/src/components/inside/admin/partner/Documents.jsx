import React from "react";

const Documents = () => {
  // Dummy data - có thể thay thế bằng props hoặc API call
  const documents = [
    {
      id: "CTF1",
      type: "CCCD",
      expiry: "3/3/2025",
      status: "Cho duyệt",
      action: "Xem chi tiết",
    },
    {
      id: "CTF2",
      type: "Giấy phép lái xe",
      expiry: "3/3/2025",
      status: "Đã duyệt",
      action: "Xem chi tiết",
    },
    {
      id: "CTF2",
      type: "Giấy phép lái xe",
      expiry: "3/3/2025",
      status: "Yêu cầu cập nhật",
      action: "Xem chi tiết",
    },
    {
      id: "CTF2",
      type: "Giấy phép lái xe",
      expiry: "3/3/2025",
      status: "Hết hạn",
      action: "Xem chi tiết",
    },
  ];

  // Hàm xác định màu sắc cho trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case "Cho duyệt":
        return "bg-blue-100 text-blue-800";
      case "Đã duyệt":
        return "bg-green-100 text-green-800";
      case "Yêu cầu cập nhật":
        return "bg-orange-100 text-orange-800";
      case "Hết hạn":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Loại giấy tờ
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ngày hết hạn
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Trạng thái
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {documents.map((doc, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {doc.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {doc.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {doc.expiry}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    doc.status
                  )}`}
                >
                  {doc.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                  {doc.action}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Documents;
