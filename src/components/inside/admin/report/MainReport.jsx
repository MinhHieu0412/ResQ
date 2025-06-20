
import "../../../../styles/admin/report.css";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../../../../styles/admin/report.css";
import { getAllReport, resolveReport } from "../../../../services/admin"; // Ensure you have this API

const MainReport = ({ onShowDetails }) => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchReport = async () => {
      const reports = await getAllReport();
      setComplaints(reports);
    };
    fetchReport();
  }, []);

  const refreshReports = async () => {
    const reports = await getAllReport();

    setComplaints([...reports]);
  };

  const sortedComplaints = complaints.sort((a, b) => {
    if (a.isUrgent && !b.isUrgent) return -1;
    if (!a.isUrgent && b.isUrgent) return 1;
    if (!a.resolved && b.resolved) return -1;
    if (a.resolved && !b.resolved) return 1;
    return 0;
  });

  const getStatus = (item) => {
    if (item.status=="rejected") return "REJECTED";
    if (item.status=="pending") return "PENDING";
    return "RESOLVED";
  };

  const getStatusBadgeClass = (item) => {
    if (item.status=="rejected") return "red-status";
    if (item.status=="pending") return "yellow-status";
    return "green-status";
  };

 const getActions = (item) => {
  const actions = ["View Complaint"];
  if (item.status === "pending") actions.push("Resolve", "Reject");
  return actions;
};


  // const getComplainantName = (item) => {
  //   if (item.complainantPartner) return item.complainantName;
  //   if (item.complainantCustomer) return item.complainantCustomer.fullName;
  //   return "--";
  // };

  // const getDefendantName = (item) => {
  //   if (item.defendantPartner) return item.defendantPartner.user.fullName;
  //   if (item.defendantCustomer) return item.defendantCustomer.fullName;
  //   return "--";
  // };

  const handleActionClick = async (item, action) => {
    const status = action === "resolve" ? "resolved" : "rejected";
    const resolverId = parseInt(localStorage.getItem("userId"), 10);

    const { value: responseText } = await Swal.fire({
      title: `${action} Report`,
      input: "textarea",
      inputLabel: "Response to complainant",
      inputPlaceholder: "Type your response here...",
      showCancelButton: true,
      confirmButtonText: action,
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) return "Response is required!";
      }
    });

    if (responseText) {
      try {
        const payload = {
          status,
          resolverId,
          responseToComplainant: responseText
        };
        await resolveReport(item.reportId, payload);
        Swal.fire("Success!", `Report ${status.toLowerCase()} successfully.`, "success");
        refreshReports();
      } catch (error) {
        Swal.fire("Error", "Something went wrong while updating the report.", "error");
      }
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-2 rounded-lg">
        <table className="w-full table">
          <thead className="bg-table">
            <tr>
              <th className="p-2 txt-title-header">ID</th>
              <th className="p-2 txt-title-header">Support Staff</th>
              <th className="p-2 txt-title-header">Complainant</th>
              <th className="p-2 txt-title-header">Defendant</th>
              <th className="p-2 txt-title-header">Resolver</th>
              <th className="p-2 txt-title-header">Status</th>
              <th className="p-2 txt-title-header">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedComplaints.map((item, index) => (
              <tr key={index}>
                <td className="px-3">{index + 1}</td>
                <td className="px-3">{item.staffName}</td>
                <td className="px-3">{item.complainantName}</td>
               <td className="px-3">{item.defendantName}</td> 
                <td className="px-3">
                  {item.resolverName && item.resolverId ? item.resolverName : "--"}
                </td>
                <td className="px-3">
                  <span
                    className={`inline-block rounded-full px-3 py-1 table-status ${getStatusBadgeClass(
                      item
                    )}`}
                  >
                    {getStatus(item)}
                  </span>
                </td>
                <td className="px-2 py-3">
                  <div className="flex space-x-2">
                    {getActions(item).map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        className={`p-2 rounded-md text-action1 ${
                          action === "View Complaint"
                            ? "btn-details"
                            : action === "Resolve"
                            ? "green-status"
                            : "red-status"
                        }`}
                        onClick={() =>
                          action === "View Complaint"
                            ? onShowDetails(item)
                            : handleActionClick(item, action)
                        }
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


