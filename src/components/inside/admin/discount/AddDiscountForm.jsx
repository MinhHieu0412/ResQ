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
    <div className="max-w-2xl mx-auto bg-white p-6">
      <h2 className="text-center text-2xl font-semibold mb-6 text-blue-800">
        Add New Discount Code
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center">
          <label className="w-40 font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2"
          />
        </div>

        <div className="flex items-center">
          <label className="w-40 font-medium">Code:</label>
          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2"
          />
        </div>

        <div className="flex items-center">
          <label className="w-40 font-medium">Value:</label>
          <input
            type="text"
            name="value"
            value={form.value}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 me-2"
          />
          <select
            name="valueType"
            value={form.valueType}
            onChange={handleChange}
            className="border border-gray-300 rounded-full px-2 py-2"
          >
            <option value="%">%</option>
            <option value="đ">VNĐ</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="w-40 font-medium">Type:</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2"
          >
            <option value="">-- Select Type --</option>
            <option value="toan_app">App-wide</option>
            <option value="hoi_vien">Member-only</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="w-40 font-medium">Apply Date:</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2"
          />
        </div>

        <div className="flex items-center">
          <label className="w-40 font-medium">Usage Limit:</label>
          <input
            type="number"
            name="usageLimit"
            value={form.usageLimit}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2"
          />
        </div>

        <div className="flex items-start">
          <label className="w-40 font-medium mt-2">Description:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2"
          ></textarea>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-800 text-white px-6 py-2 rounded-full hover:bg-blue-900"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDiscountForm;
