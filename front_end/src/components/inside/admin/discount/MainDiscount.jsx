import React, { useState } from "react";
import AddDiscountForm from "./AddDiscountForm"; // Adjust the path according to where AddDiscountForm is located

const MainDiscount = () => {
  const [activeTab, setActiveTab] = useState("app");
  const [showForm, setShowForm] = useState(false);
  const [appCodes, setAppCodes] = useState([
    {
      id: 1,
      code: "SSR20250303",
      name: "3-3 Giảm giá ...",
      value: "33.000",
      remaining: "23/100",
    },
    {
      id: 2,
      code: "SSR20250303",
      name: "3-3 Giảm giá ...",
      value: "33.000",
      remaining: "23/100",
    },
    {
      id: 3,
      code: "SSR20250315",
      name: "Giảm giá mở rộng",
      value: "15%",
      remaining: "23/100",
    },
  ]);
  const [memberCodes, setMemberCodes] = useState([
    {
      id: 1,
      code: "HVV20000",
      name: "Giảm 20k cho ...",
      value: "20.000",
      status: "Đang hoạt động",
    },
    {
      id: 2,
      code: "HVV20000",
      name: "3-3 Giảm giá ...",
      value: "10.000",
      status: "Đang hoạt động",
    },
  ]);

  const handleAddDiscount = (newDiscount) => {
    if (activeTab === "app") {
      setAppCodes((prevCodes) => [
        ...prevCodes,
        { ...newDiscount, id: Date.now() },
      ]);
    } else {
      setMemberCodes((prevCodes) => [
        ...prevCodes,
        { ...newDiscount, id: Date.now(), status: "Đang hoạt động" },
      ]);
    }
    setShowForm(false); // Close the form after adding
  };

  const renderTable = () => {
    const tableClass =
      "w-full text-sm border border-gray-200 shadow rounded-xl";
    const thClass = "p-3 border bg-blue-50 text-left text-gray-700";
    const tdClass = "p-3 border text-center";

    if (activeTab === "app") {
      return (
        <div className="border rounded-2xl shadow-lg p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">
            Mã chung toàn App
          </h2>
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={thClass}>STT</th>
                <th className={thClass}>Mã</th>
                <th className={thClass}>Tên mã</th>
                <th className={thClass}>Giá trị</th>
                <th className={thClass}>Số lần còn lại</th>
              </tr>
            </thead>
            <tbody>
              {appCodes.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className={tdClass}>{index + 1}</td>
                  <td className={tdClass}>{item.code}</td>
                  <td className={tdClass}>{item.name}</td>
                  <td className={tdClass}>{item.value}</td>
                  <td className={tdClass}>{item.remaining}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="border rounded-2xl shadow-lg p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">
            Mã Hội viên
          </h2>
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={thClass}>STT</th>
                <th className={thClass}>Mã</th>
                <th className={thClass}>Tên mã</th>
                <th className={thClass}>Giá trị</th>
                <th className={thClass}>Hoạt động</th>
              </tr>
            </thead>
            <tbody>
              {memberCodes.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className={tdClass}>{index + 1}</td>
                  <td className={tdClass}>{item.code}</td>
                  <td className={tdClass}>{item.name}</td>
                  <td className={tdClass}>{item.value}</td>
                  <td
                    className={`${tdClass} text-blue-600 underline cursor-pointer`}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {!showForm && (
        <>
          <div className="relative mb-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">
              🎁 Bảng mã khuyến mãi
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="absolute right-0 top-0 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              ➕ Thêm khuyến mãi mới
            </button>
          </div>

          <div className="mb-6 flex space-x-4 justify-center">
            <button
              onClick={() => setActiveTab("app")}
              className={`px-5 py-2 font-medium rounded-full transition ${
                activeTab === "app"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              📱 Mã toàn App
            </button>
            <button
              onClick={() => setActiveTab("member")}
              className={`px-5 py-2 font-medium rounded-full transition ${
                activeTab === "member"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              👤 Mã Hội viên
            </button>
          </div>
        </>
      )}

      <div className="relative">
        {showForm ? (
          <AddDiscountForm
            onAdd={handleAddDiscount}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          renderTable()
        )}
      </div>
    </div>
  );
};

export default MainDiscount;
