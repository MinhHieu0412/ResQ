import React, { useState, useEffect } from "react";
import NewCustomer from "./NewCustomer";
import { customerAPI } from "../../../../admin";
import Select from "react-select";

const FormRequest = ({ onBack, isEdit, req }) => {
  const [newCustomer, setNewCustomer] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [fileName, setFileName] = useState("No file chosen");

  const [formData, setFormData] = useState({
    customer: '',
    service: '',
    address: '',
    description: '',
    image: '',
    requestTime: '',
    price: '',
    paymentMethod: '',
    note: '',
  });

  const fetchCustomers = async () => {
    try {
      const res = await customerAPI.getAllCustomers();
      setCustomers(res.data || []);
    } catch (err) {
      console.error("Failed to fetch customers", err);
    }
  };

  // Xử lý khi edit
  useEffect(() => {
    if (isEdit && req) {
      setFormData({
        customer: req.user?.userid || '',
        service: req.user?.rescueType || '',
        address: req.ulocation || '',
        description: req.description || '',
        image: req.image || '',
        requestTime: req.updatedAt ? new Date(req.updatedAt).toISOString().slice(0, 16) : '',
        price: req.bill?.totalPrice || '',
        paymentMethod: req.bill?.method || '',
        note: req.note || '',
      });

      if (req.image) {
        setFileName(typeof req.image === "string" ? req.image : "Selected");
      }
    }
  }, [isEdit, req]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFormData(prev => ({ ...prev, image: file }));
    } else {
      setFileName("No file chosen");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value);
    });

    console.log("Submitting form data...");
    for (let pair of submissionData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    // TODO: Gửi API
  };

  const handleBackCreate = () => {
    setNewCustomer(false);
    fetchCustomers();
  };

  // Fetch danh sách khách hàng
  useEffect(() => {
    fetchCustomers();
  }, []);
  const inputClass = "w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#68A2F0] transition";
  const labelClass = "font-medium text-gray-700";

  return (
    <div>
      {newCustomer ? (
        <NewCustomer onBack={handleBackCreate} />
      ) : (
        <div className="min-h-screen px-4 py-10">
          <div className="ml-5">
            <button onClick={onBack} className="border border-[#68A2F0] rounded-full w-16 h-10">
              <img alt="Back" src="/images/icon-web/Reply Arrow1.png" className="w-7 m-auto" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-3xl rounded-2xl">
              <h1 className="text-3xl font-bold text-center text-[#013171] mb-10">
                {isEdit ? "Edit Rescue Request" : "Create New Request"}
              </h1>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Customer dropdown */}
                <div>
                  <label className={labelClass}>Customer</label>
                  <Select
                    options={customers.map(cus => ({
                      value: cus.userid,
                      label: cus.fullName
                    }))}
                    value={customers
                      .map(cus => ({ value: cus.userid, label: cus.fullName }))
                      .find(option => option.value === formData.customer)}
                    onChange={(selected) =>
                      setFormData(prev => ({ ...prev, customer: selected ? selected.value : '' }))
                    }
                    placeholder="Select or search customer..."
                    isClearable
                  />
                  <button
                    type="button"
                    className="bg-[#68A2F0] text-white text-sm mt-2 px-4 py-2 rounded-full cursor-pointer hover:bg-[#4e8ad6] transition"
                    onClick={() => setNewCustomer(true)}
                  >
                    New Customer
                  </button>
                </div>
                <div>
                  <label className={labelClass}>Customer's Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Enter address"
                  />
                </div>
                <div>
                  <label className={labelClass}>Service</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">-- Select service --</option>
                    <option>Replace Driver</option>
                    <option>On Site</option>
                    <option>Towing</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Specific service</label>
                  <select
                    name="specificService"
                    value={formData.service}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">-- Select service --</option>
                    <option>Replace Driver</option>
                    <option>On Site</option>
                    <option>Towing</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Destination</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Enter address"
                  />
                </div>
                <div>
                  <label className={labelClass}>Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Enter price"
                  />
                </div>
                <div>
                  <label className={labelClass}>Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option>Cash</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Request Time</label>
                  <input
                    type="datetime-local"
                    name="requestTime"
                    value={formData.requestTime}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={`${inputClass} resize-none`}
                    placeholder="Describe the issue or request details..."
                  />
                </div>
                <div>
                  <label className={labelClass}>Upload Image</label>
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="imageUpload"
                      className="bg-[#68A2F0] text-white text-sm px-4 py-2 rounded-full cursor-pointer hover:bg-[#4e8ad6] transition"
                    >
                      Choose File
                    </label>
                    <input
                      type="file"
                      id="imageUpload"
                      name="image"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <span className="text-sm text-gray-600">{fileName}</span>
                  </div>
                </div>
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="bg-[#68A2F0] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#6094d7] transition duration-300 shadow-md"
                  >
                    {isEdit ? "Update Request" : "Create New"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormRequest;
