import React, { useState } from "react";
import Swal from "sweetalert2";

const Vehicles = () => {
  const [filterStatus, setFilterStatus] = useState("all");

  // Sample vehicle data
  const vehicles = [
    {
      id: "VH001",
      type: "SUV",
      licensePlate: "59A-12345",
      owner: "John Doe",
      driverLicenseClass: "B2",
      inspectionExpiry: "2025-04-21",
      insuranceExpiry: "2024-12-31",
      status: "Active",
      priorityLight: "Installed",
      inspectionStamp: "Valid",
      registration: "☉",
      lastService: "2024-03-15",
    },
    {
      id: "VH002",
      type: "Truck",
      licensePlate: "92B-67890",
      owner: "Jane Smith",
      driverLicenseClass: "C",
      inspectionExpiry: "2024-11-30",
      insuranceExpiry: "2023-12-31",
      status: "Inactive",
      priorityLight: "Not installed",
      inspectionStamp: "Expired",
      registration: "☉",
      lastService: "2024-02-01",
    },
    {
      id: "VH003",
      type: "Sedan",
      licensePlate: "51C-98765",
      owner: "Bob Johnson",
      driverLicenseClass: "B1",
      inspectionExpiry: "2024-09-15",
      insuranceExpiry: "2024-06-30",
      status: "Maintenance",
      priorityLight: "Installed",
      inspectionStamp: "Valid",
      registration: "☉",
      lastService: "2024-01-20",
    },
  ];

  // Filter vehicles based on status
  const filteredVehicles = vehicles.filter((vehicle) =>
    filterStatus === "all" ? true : vehicle.status === filterStatus
  );

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-yellow-100 text-yellow-800";
      case "Maintenance":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle details view with SweetAlert
  const showVehicleDetails = (vehicle) => {
    Swal.fire({
      title: `<strong class="text-sm">${vehicle.licensePlate}</strong>`,
      html: `
        <div class="text-xs space-y-1.5 text-gray-600">
          <div class="grid grid-cols-2 gap-x-4 gap-y-1">
            <div><b class="font-semibold">ID:</b> ${vehicle.id}</div>
            <div><b>Type:</b> ${vehicle.type}</div>
            <div><b>Owner:</b> ${vehicle.owner}</div>
            <div><b>DL Class:</b> ${vehicle.driverLicenseClass}</div>
            <div><b>Inspection:</b> ${vehicle.inspectionExpiry}</div>
            <div><b>Insurance:</b> ${vehicle.insuranceExpiry}</div>
            <div><b>Priority Light:</b> ${vehicle.priorityLight}</div>
            <div><b>Last Service:</b> ${vehicle.lastService}</div>
          </div>
        </div>
      `,
      confirmButtonText: "Close",
      customClass: {
        popup: "!max-w-[320px] !text-xs",
        confirmButton: "!px-3 !py-1 !text-xs",
      },
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm mx-2">
      {/* Filter Section */}
      <div className="mb-4 flex items-center gap-3">
        <label className="text-xs font-medium text-gray-700">
          Filter by Status:
        </label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-2 py-1 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="all">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      {/* Vehicles Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider w-[80px]">
                ID
              </th>
              <th className="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Type
              </th>
              <th className="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                License
              </th>
              <th className="px-3 py-2 text-center text-[10px] font-medium text-gray-500 uppercase tracking-wider w-[50px]">
                Reg
              </th>
              <th className="px-3 py-2 text-center text-[10px] font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Insurance
              </th>
              <th className="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider w-[80px]">
                Status
              </th>
              <th className="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider w-[80px]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredVehicles.map((vehicle, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-3 py-2 text-xs text-gray-900 font-medium truncate">
                  {vehicle.id}
                </td>
                <td className="px-3 py-2 text-xs text-gray-600 hidden sm:table-cell">
                  {vehicle.type}
                </td>
                <td className="px-3 py-2 text-xs text-gray-900 font-mono">
                  {vehicle.licensePlate}
                </td>
                <td className="px-3 py-2 text-xl text-center">
                  {vehicle.registration}
                </td>
                <td className="px-3 py-2 text-xs text-center hidden md:table-cell">
                  {vehicle.insuranceExpiry}
                </td>
                <td className="px-3 py-2">
                  <span
                    className={`px-1.5 py-0.5 inline-flex text-[10px] leading-4 font-medium rounded ${getStatusColor(
                      vehicle.status
                    )}`}
                  >
                    {vehicle.status}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => showVehicleDetails(vehicle)}
                    className="text-indigo-600 hover:text-indigo-900 text-xs font-medium"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vehicles;
