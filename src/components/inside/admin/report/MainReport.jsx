import React from "react";

const MainReport = ({ onShowDetails }) => {
  // Dummy data with resolved state added
  const complaints = [
    {
      id: 10052,
      cskh: "CSKH Mai Văn Vũ",
      complainant: "Nguyễn Hạ Nhi",
      defendant: "Nguyễn Thanh Phong",
      sent: "12 tiếng",
      resolver: "Manager Trần Trác",
      actions: ["Chi tiết khiếu nại", "Từ chối"],
      resolved: false, // Not resolved
      isUrgent: false,
    },
    {
      id: 10053,
      cskh: "CSKH Mai Văn Vũ",
      complainant: "Nguyễn Hạ Nhi",
      defendant: "Nguyễn Thanh Phong",
      sent: "02 tiếng",
      resolver: "",
      actions: ["Chi tiết khiếu nại", "Giải quyết"],
      resolved: true, // Resolved
      isUrgent: false,
    },
    {
      id: 10054,
      cskh: "CSKH Mai Văn Vũ",
      complainant: "Nguyễn Hạ Nhi",
      defendant: "Nguyễn Thanh Phong",
      sent: "10 tiếng",
      resolver: "Manager Trần Trác",
      actions: ["Chi tiết khiếu nại", "Từ chối"],
      resolved: false,
      isUrgent: true, // Khẩn cấp
    },
    // Add more complaints as needed
  ];

  // Sort complaints: Urgent first, then unresolved, then resolved
  const sortedComplaints = complaints.sort((a, b) => {
    // Put urgent complaints at the top
    if (a.isUrgent && !b.isUrgent) return -1;
    if (!a.isUrgent && b.isUrgent) return 1;
    // Then sort by unresolved (false goes above true)
    if (!a.resolved && b.resolved) return -1;
    if (a.resolved && !b.resolved) return 1;
    return 0; // Keep the order as it is if neither urgent nor resolved status differs
  });

  return (
    <div className="p-4 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CSKH
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Người khiếu nại
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Người bị khiếu nại
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Đã gửi được
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Người giải quyết
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedComplaints.map((item, index) => (
              <tr
                key={index}
                className={`
                  ${item.resolved ? "opacity-50 cursor-not-allowed" : ""}
                  ${item.isUrgent ? "bg-yellow-100  " : ""}
                `}
              >
                <td className="px-4 py-3 text-sm text-gray-900">{item.id}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{item.cskh}</td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {item.complainant}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {item.defendant}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{item.sent}</td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {item.resolver || "--"}
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex space-x-2">
                    {item.actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        className={`px-3 py-1 rounded-md text-xs font-medium ${
                          action === "Chi tiết khiếu nại"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            : action === "Giải quyết"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                        onClick={() =>
                          action === "Chi tiết khiếu nại" && onShowDetails()
                        }
                        disabled={item.resolved} // Disable the button if resolved
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainReport;
