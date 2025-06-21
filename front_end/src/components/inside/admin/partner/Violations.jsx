import React, { useState } from "react";

// Dữ liệu mẫu
const violations = [
  {
    date: "3/3/2025",
    reason: "Không hoàn thành cuốc",
    status: "Chờ xử lý",
  },
  {
    date: "3/3/2025",
    reason: "Không hoàn thành cuốc",
    status: "Đã giải quyết",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Chờ xử lý":
      return "bg-yellow-100 text-yellow-700";
    case "Đã giải quyết":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const Violations = () => {
  const [sortBy, setSortBy] = useState("newest");

  // Có thể xử lý logic sắp xếp nếu cần
  const sortedViolations = [...violations];

  return (
    <div className="p-6 relative min-h-screen">
      {/* Thanh tìm kiếm và filter */}
      <div className="flex justify-between items-center mb-4">
        {/* Search */}
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full px-4 pr-10 py-2 border rounded-full focus:outline-none"
          />
          <button className="absolute inset-y-0 right-2 flex items-center">
            <img
              src="/images/icon-web/Search.png"
              alt="Search"
              className="w-4 h-4"
            />
          </button>
        </div>

        {/* Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-full border bg-white hover:bg-gray-100"
        >
          <option value="newest">Gần nhất</option>
          <option value="oldest">Cũ nhất</option>
        </select>
      </div>

      {/* Bảng vi phạm */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full table-auto">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Ngày</th>
              <th className="px-4 py-3 text-left">Lý do vi phạm</th>
              <th className="px-4 py-3 text-left">Trạng thái xử lý</th>
              <th className="px-4 py-3 text-left">Report của Staff/Manager</th>
            </tr>
          </thead>
          <tbody>
            {sortedViolations.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{item.date}</td>
                <td className="px-4 py-3">{item.reason}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-xs font-medium px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200">
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination (nếu cần) */}
      <div className="text-center mt-4 text-gray-400 text-sm">...</div>

      {/* Nút Khóa cố định */}
      <button className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-full shadow-lg">
        🔒 Khóa
      </button>
    </div>
  );
};

export default Violations;
