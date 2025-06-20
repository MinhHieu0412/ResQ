import React, { useState, useEffect } from "react";
import AddDiscountForm from "./AddDiscountForm";
import UpdateDiscount from "./UpdateDiscount";
import { getAllDiscount } from "../../../../services/admin";

const MainDiscount = () => {
  const [activeTab, setActiveTab] = useState("app");
  const [showForm, setShowForm] = useState(false);
  const [editDiscount, setEditDiscount] = useState(null);
  const [appCodes, setAppCodes] = useState([]);
  const [memberCodes, setMemberCodes] = useState([]);

  //  Fetch discounts from API
  useEffect(() => {
  const loadDiscounts = async () => {
    try {
      const discounts = await getAllDiscount(); // Trả về trực tiếp là mảng

      const apps = discounts.filter((d) => d.typeDis === "toan_app");
      const members = discounts.filter((d) => d.typeDis === "hoi_vien");

      setAppCodes(apps);
      setMemberCodes(members);
    } catch (error) {
      console.error("Lỗi khi load dữ liệu:", error);
    }
  };

  loadDiscounts();
}, []);

  

  const handleAddDiscount = (newDiscount) => {
    const formatted = {
      ...newDiscount,
      id: Date.now(),
      remaining: `${newDiscount.usageLimit}/100`,
      status: "Active",
    };
    if (newDiscount.type === "toan_app") {
      setAppCodes((prev) => [...prev, formatted]);
    } else {
      setMemberCodes((prev) => [...prev, formatted]);
    }
    setShowForm(false);
  };

  const handleUpdateDiscount = (updated) => {
    if (updated.type === "toan_app") {
      setAppCodes((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
    } else {
      setMemberCodes((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
    }
    setEditDiscount(null);
  };

  const handleDoubleClick = (discount) => {
    setEditDiscount(discount);
  };

  const renderTable = () => {
    const tableClass =
      "w-full text-sm border border-gray-200 shadow rounded-xl";
    const thClass = "p-3 border bg-blue-50 text-left text-gray-700";
    const tdClass = "p-3 border text-center";

    const list = activeTab === "app" ? appCodes : memberCodes;

    return (
      <div className="border rounded-2xl shadow-lg p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          {activeTab === "app"
            ? "App-wide Discount Codes"
            : "Member-only Discount Codes"}
        </h2>
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>No.</th>
              <th className={thClass}>Code</th>
              <th className={thClass}>Name</th>
              <th className={thClass}>Value</th>
              {activeTab === "app" ? (
                <th className={thClass}>Remaining Uses</th>
              ) : (
                <th className={thClass}>Status</th>
              )}
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr
                key={item.discountId}
                onDoubleClick={() => handleDoubleClick(item)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className={tdClass}>{index + 1}</td>
                <td className={tdClass}>{item.code}</td>
                <td className={tdClass}>{item.name}</td>
                <td className={tdClass}>
                  {item.amount}
                  {item.type === "Percent" ? "%" : "đ"}
                </td>
                <td className={tdClass}>
                  {activeTab === "app" ? item.quantity : item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {!showForm && !editDiscount && (
        <>
          <div className="relative mb-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">
              🎁 Discount Code Management
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="absolute right-0 top-0 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              ➕ Add New Discount
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
              📱 App-wide Codes
            </button>
            <button
              onClick={() => setActiveTab("member")}
              className={`px-5 py-2 font-medium rounded-full transition ${
                activeTab === "member"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              👤 Member-only Codes
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
        ) : editDiscount ? (
          <UpdateDiscount
            discount={editDiscount}
            onUpdate={handleUpdateDiscount}
            onCancel={() => setEditDiscount(null)}
          />
        ) : (
          renderTable()
        )}
      </div>
    </div>
  );
};

export default MainDiscount;
