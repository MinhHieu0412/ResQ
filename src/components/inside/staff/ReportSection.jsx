import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";

const ReportSection = ({ staffName = "CSKH Mai Văn Vũ" }) => {
  const [type, setType] = useState("CUSTOMER"); // CUSTOMER or PARTNER
  const [form, setForm] = useState({
    complainAccount: "",
    reportedAccount: "",
    reason: "",
    request: "",
    chatLink: "",
  });
  const [complainOptions, setComplainOptions] = useState([]);
  const [reportedOptions, setReportedOptions] = useState([]);

  // Fetch search results for users and partners
  const fetchSearchResults = async (keyword, role) => {
    try {
      const response = role === "complain"
        ? await axios.get(`http://localhost:9090/admin/report/users/search/${keyword}`)
        : await axios.get(`http://localhost:9090/admin/report/partners/search/${keyword}`);
      
      const options = response.data.map(item => ({
        value: item.id,
        label: `${item.name} (${item.username})`
      }));
      if (role === "complain") {
        setComplainOptions(options);
      } else {
        setReportedOptions(options);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (urgent = false) => {
    const payload = {
      ...form,
      type,
      staffName,
      urgent,
    };
    console.log("Submitting complaint:", payload);
    alert(urgent ? "Submitted as Urgent (24h)" : "Submitted as Normal");
  };

  // Render dynamic search label
  const renderSearchLabel = (role) => {
    if (type === "CUSTOMER") {
      return role === "complain"
        ? "Search User (Name/Username)"
        : "Search Partner (Name/Username)";
    } else {
      return role === "complain"
        ? "Search Partner (Name/Username)"
        : "Search User (Name/Username)";
    }
  };

  return (
    <div className="max-w-2xl mx-auto border p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold text-center mb-6">
        Complaint Report Form
      </h2>

      <div className="mb-4">
        <label className="block font-semibold">Staff:</label>
        <span className="ml-2">{staffName}</span>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="CUSTOMER">CUSTOMER</option>
          <option value="PARTNER">PARTNER</option>
        </select>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">{renderSearchLabel("complain")}</label>
          <Select
            name="complainAccount"
            options={complainOptions}
            onChange={(selected) => setForm({ ...form, complainAccount: selected })}
            getOptionLabel={(e) => e.label}
            getOptionValue={(e) => e.value}
            onInputChange={(inputValue) => fetchSearchResults(inputValue, "complain")}
          />
        </div>
        <div className="flex-1">
          <label className="block font-semibold mb-1">{renderSearchLabel("reported")}</label>
          <Select
            name="reportedAccount"
            options={reportedOptions}
            onChange={(selected) => setForm({ ...form, reportedAccount: selected })}
            getOptionLabel={(e) => e.label}
            getOptionValue={(e) => e.value}
            onInputChange={(inputValue) => fetchSearchResults(inputValue, "reported")}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Reason:</label>
        <textarea
          name="reason"
          value={form.reason}
          onChange={(e) => handleChange(e.target)}
          className="w-full border rounded px-2 py-2 min-h-[80px]"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Request:</label>
        <textarea
          name="request"
          value={form.request}
          onChange={(e) => handleChange(e.target)}
          className="w-full border rounded px-2 py-2 min-h-[80px]"
        />
      </div>

      <div className="mb-6 text-sm">
        <label className="block font-semibold mb-1">Chat Transcript File:</label>
        <input
          type="file"
          name="chatLink"
          onChange={(e) => handleChange(e.target)}
          className="border rounded px-2 py-1 w-full"
        />
        {form.chatLink && (
          <p className="mt-1 italic text-blue-600">Selected: {form.chatLink}</p>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleSubmit(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
        >
          Submit Urgent (24h)
        </button>
        <button
          onClick={() => handleSubmit(false)}
          className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded"
        >
          Submit Normally
        </button>
      </div>
    </div>
  );
};

export default ReportSection;
