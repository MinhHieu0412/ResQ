import React from "react";

const violations = [
  {
    date: "3/3/2025",
    reason: "Đặt cuộc giả mạo",
    status: "Chờ xử lý",
    note: "",
  },
  {
    date: "3/3/2025",
    reason: "Ko trả tiền",
    status: "Đã giải quyết",
    note: "",
  },
];

const statusStyle = {
  "Chờ xử lý": "bg-yellow-200 text-yellow-800",
  "Đã giải quyết": "bg-green-200 text-green-800",
};

const Violations = () => {
  const handleLockUser = (violation) => {
    alert(`Khóa khách hàng vì lý do: ${violation.reason}`);
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full text-sm text-left bg-white">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 py-2">Ngày</th>
            <th className="px-4 py-2">Lý do vi phạm</th>
            <th className="px-4 py-2">Trạng thái xử lý</th>
            <th className="px-4 py-2">Ghi chú</th>
            <th className="px-4 py-2">Report của Staff/ Manager</th>
            <th className="px-4 py-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {violations.map((violation, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{violation.date}</td>
              <td className="px-4 py-2">{violation.reason}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    statusStyle[violation.status]
                  }`}
                >
                  {violation.status}
                </span>
              </td>
              <td className="px-4 py-2">{violation.note}</td>
              <td className="px-4 py-2">
                <button className="bg-blue-400 text-white text-xs px-3 py-1 rounded hover:bg-blue-500">
                  Xem chi tiết
                </button>
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleLockUser(violation)}
                  className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
                >
                  Khóa khách hàng
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Violations;
