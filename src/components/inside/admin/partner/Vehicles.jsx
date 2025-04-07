import React from "react";

const Vehicles = () => {
  // Dummy data
  const vehicles = [
    {
      id: "VH1",
      type: "SUV",
      license: "55A-T1 76890",
      papers: "☉",
      insurance: "☉",
      status: "Đã bị chân",
      action: "Xem chi tiết",
    },
    {
      id: "VH1",
      type: "SUV",
      license: "55A-T1 76890",
      papers: "☉",
      insurance: "☉",
      status: "Tam nghỉ",
      action: "Xem chi tiết",
    },
    {
      id: "VH1",
      type: "SUV",
      license: "55A-T1 76890",
      papers: "☉",
      insurance: "☉",
      status: "Đang phục vụ",
      action: "Xem chi tiết",
    },
  ];

  // Hàm xác định màu trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case "Đang phục vụ":
        return "bg-green-100 text-green-800";
      case "Tam nghỉ":
        return "bg-yellow-100 text-yellow-800";
      case "Đã bị chân":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className=" rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Loại xe
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Biến số
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Giấy tờ xe
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Bảo hiểm
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Trạng thái
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hành động
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {vehicles.map((vehicle, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {vehicle.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {vehicle.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                {vehicle.license}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-2xl text-center">
                {vehicle.papers}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-2xl text-center">
                {vehicle.insurance}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    vehicle.status
                  )}`}
                >
                  {vehicle.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                  {vehicle.action}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Vehicles;
