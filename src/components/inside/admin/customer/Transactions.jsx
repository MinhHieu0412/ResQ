import React from "react";

const transactions = [
  {
    id: "TRAN1",
    customer: "Nguyễn Văn A",
    code: "RES1",
    service: "Kéo xe",
    location: "222 CMT*, P8 , Q3, TPHCM",
    time: "17:59 22/02/2025",
    price: "1.200.000 VND",
    status: "Chưa thanh toán",
  },
  {
    id: "TRAN1",
    customer: "Nguyễn Văn A",
    code: "RES1",
    service: "Kéo xe",
    location: "222 CMT*, P8 , Q3, TPHCM",
    time: "17:59 22/02/2025",
    price: "1.200.000 VND",
    status: "Đã thanh toán",
  },
];

const statusStyle = {
  "Chưa thanh toán": "bg-yellow-200 text-yellow-800",
  "Đã thanh toán": "bg-green-200 text-green-800",
};

const Transactions = () => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full text-xs text-left bg-white">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Khách hàng</th>
            <th className="px-4 py-2">Mã cước</th>
            <th className="px-4 py-2">Dịch vụ</th>
            <th className="px-4 py-2">Địa điểm</th>
            <th className="px-4 py-2">Thời gian thanh toán</th>
            <th className="px-4 py-2">Giá</th>
            <th className="px-4 py-2">Trạng thái</th>
            <th className="px-4 py-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{txn.id}</td>
              <td className="px-4 py-2">{txn.customer}</td>
              <td className="px-4 py-2">{txn.code}</td>
              <td className="px-4 py-2">{txn.service}</td>
              <td className="px-4 py-2">{txn.location}</td>
              <td className="px-4 py-2">{txn.time}</td>
              <td className="px-4 py-2">{txn.price}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    statusStyle[txn.status]
                  }`}
                >
                  {txn.status}
                </span>
              </td>
              <td className="px-4 py-2 flex gap-2">
                <button className="bg-blue-400 text-white text-xs px-3 py-1 rounded hover:bg-blue-500">
                  Xem chi tiết
                </button>
                <button className="text-blue-600 hover:text-blue-800">
                  ✏️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
