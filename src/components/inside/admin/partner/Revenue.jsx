import React, { useState } from "react";

const rawData = [
  {
    month: "3/2/2025",
    revenue: "19.950.000 VND",
    commission: "1.950.000 VND",
    paid: true,
    payDate: "3/2/2025",
  },
  {
    month: "3/3/2025",
    revenue: "29.000.000 VND",
    commission: "2.900.000 VND",
    paid: false,
    payDate: "3/2/2025",
  },
];

// const parseVND = (str) => parseInt(str.replaceAll(".", "").replace(" VND", ""));
const parseDate = (str) => {
  const [day, month, year] = str.split("/").map(Number);
  return new Date(year, month - 1, day);
};

const Revenue = () => {
  const [sortBy, setSortBy] = useState("newest");

  const sortedData = [...rawData].sort((a, b) => {
    const dateA = parseDate(a.month);
    const dateB = parseDate(b.month);

    if (sortBy === "newest") return dateB - dateA;
    if (sortBy === "oldest") return dateA - dateB;
    return 0;
  });

  return (
    <div className="p-6">
      {/* Search + Filter */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-1/3 mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full px-4 pr-10 py-2 border rounded-full focus:outline-none"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-2 flex items-center justify-center"
          >
            <img
              src="/images/icon-web/Search.png" // đổi theo đường dẫn icon bạn dùng
              alt="Tìm kiếm"
              className="w-4 h-4"
            />
          </button>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-full border bg-white hover:bg-gray-100"
        >
          <option value="newest">Gần nhất</option>
          <option value="oldest">Cũ nhất</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full table-auto">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Tháng</th>
              <th className="px-4 py-3 text-left">Doanh thu</th>
              <th className="px-4 py-3 text-left">Hoa hồng ResQ</th>
              <th className="px-4 py-3 text-left">Đã thanh toán</th>
              <th className="px-4 py-3 text-left">Ngày thanh toán</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, idx) => (
              <tr
                key={idx}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">{item.month}</td>
                <td className="px-4 py-3">{item.revenue}</td>
                <td className="px-4 py-3">{item.commission}</td>
                <td className="px-4 py-3">
                  <img
                    src={
                      item.paid
                        ? "/images/icon-web/Checked Checkbox.png1.png"
                        : "/images/icon-web/Close Window.png"
                    }
                    alt={item.paid ? "Đã thanh toán" : "Chưa thanh toán"}
                    className="w-5 h-5 mx-auto"
                  />
                </td>
                <td className="px-4 py-3">{item.payDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Revenue;
