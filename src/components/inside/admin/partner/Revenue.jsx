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

const parseDate = (str) => {
  const [day, month, year] = str.split("/").map(Number);
  return new Date(year, month - 1, day);
};

const parseVND = (str) => parseInt(str.replaceAll(".", "").replace(" VND", ""));

const formatVND = (number) =>
  number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const Revenue = () => {
  const [sortBy, setSortBy] = useState("newest");
  const [searchText, setSearchText] = useState("");
  const [filterPaid, setFilterPaid] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const sortedData = [...rawData].sort((a, b) => {
    const dateA = parseDate(a.month);
    const dateB = parseDate(b.month);
    return sortBy === "newest" ? dateB - dateA : dateA - dateB;
  });

  const filteredData = sortedData.filter((item) => {
    const matchText =
      item.month.includes(searchText) ||
      item.revenue.includes(searchText) ||
      item.commission.includes(searchText);

    const matchPaid =
      filterPaid === "all" ||
      (filterPaid === "paid" && item.paid) ||
      (filterPaid === "unpaid" && !item.paid);

    const date = parseDate(item.month);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const matchDate = (!from || date >= from) && (!to || date <= to);

    return matchText && matchPaid && matchDate;
  });

  const totalRevenue = filteredData.reduce(
    (sum, item) => sum + parseVND(item.revenue),
    0
  );
  const totalCommission = filteredData.reduce(
    (sum, item) => sum + parseVND(item.commission),
    0
  );

  return (
    <div className="p-6">
      {/* Search + Filter */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search by month, amount..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full px-4 pr-10 py-2 border rounded-full focus:outline-none"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-2 flex items-center justify-center"
          >
            <img
              src="/images/icon-web/Search.png"
              alt="Search"
              className="w-4 h-4"
            />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label>From:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="px-3 py-2 border rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <label>To:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="px-3 py-2 border rounded"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-full border bg-white hover:bg-gray-100"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>

        <select
          value={filterPaid}
          onChange={(e) => setFilterPaid(e.target.value)}
          className="px-4 py-2 rounded-full border bg-white hover:bg-gray-100"
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full table-auto">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Month</th>
              <th className="px-4 py-3 text-left">Revenue</th>
              <th className="px-4 py-3 text-left">ResQ Commission</th>
              <th className="px-4 py-3 text-left">Paid</th>
              <th className="px-4 py-3 text-left">Payment Date</th>
            </tr>
          </thead>

          {/* ✅ Total Row placed here */}
          <tbody>
            <tr className="bg-gray-100 font-semibold border-b">
              <td className="px-4 py-3">Total</td>
              <td className="px-4 py-3">{formatVND(totalRevenue)}</td>
              <td className="px-4 py-3">{formatVND(totalCommission)}</td>
              <td colSpan="2"></td>
            </tr>

            {/* ✅ Data Rows */}
            {filteredData.map((item, idx) => (
              <tr
                key={idx}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">{item.month}</td>
                <td className="px-4 py-3">
                  {formatVND(parseVND(item.revenue))}
                </td>
                <td className="px-4 py-3">
                  {formatVND(parseVND(item.commission))}
                </td>
                <td className="px-4 py-3 text-center">
                  {item.paid ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Unpaid</span>
                  )}
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
