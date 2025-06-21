import React, { useState } from "react";

const AddDiscountForm = ({ onAdd, onCancel }) => {
  const [form, setForm] = useState({
    name: "",
    code: "",
    value: "",
    type: "",
    valueType: "%",
    date: "",
    usageLimit: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form); // Passing the form data back to MainDiscount component
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 ">
      <h2 className="text-center text-2xl font-semibold mb-6 text-blue-800">
        Thêm mã khuyến mãi mới
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center">
          <label className="w-40 font-medium">Tên mã:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex items-center">
          <label className="w-40 font-medium">Mã rút gọn:</label>
          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="w-40 font-medium">Giá trị:</label>
          <input
            type="text"
            name="value"
            value={form.value}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
          />
          <select
            name="valueType"
            value={form.valueType}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-2 py-2"
          >
            <option value="%">%</option>
            <option value="đ">đ</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="w-40 font-medium">Loại mã:</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="">-- Chọn loại --</option>
            <option value="toan_app">Toàn App</option>
            <option value="hoi_vien">Hội viên</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="w-40 font-medium">Ngày áp dụng:</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex items-center">
          <label className="w-40 font-medium">Số lần sử dụng:</label>
          <input
            type="number"
            name="usageLimit"
            value={form.usageLimit}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex items-start">
          <label className="w-40 font-medium mt-2">Nội dung:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
          ></textarea>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onCancel} // This will close the form and show the table
            className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600"
          >
            Quay lại
          </button>
          <button
            type="submit"
            className="bg-blue-800 text-white px-6 py-2 rounded-full hover:bg-blue-900"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDiscountForm;
