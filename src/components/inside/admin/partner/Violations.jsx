import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  parse,
  // format,
  isWithinInterval,
  startOfMonth,
  endOfMonth,
} from "date-fns";

const MySwal = withReactContent(Swal);

// Sample data
const initialViolations = [
  {
    date: "2025-03-03",
    reason: "Did not complete the ride",
    status: "Pending",
    report: "Did not show up on time",
  },
  {
    date: "2025-04-04",
    reason: "Poor attitude",
    status: "Resolved",
    report: "Customer reported bad attitude",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Resolved":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const Violations = () => {
  const [violations, setViolations] = useState(initialViolations);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDate, setFilterDate] = useState({ start: "", end: "" });
  const [currentMonthStats, setCurrentMonthStats] = useState(0);
  const [previousMonthStats, setPreviousMonthStats] = useState(0);

  // Handle status change for violation
  const handleStatusChange = (violation, newStatus) => {
    const updatedViolations = violations.map((v) =>
      v === violation ? { ...v, status: newStatus } : v
    );
    setViolations(updatedViolations);
  };

  // Handle "View details" button click
  const handleDetailClick = (violation) => {
    const isResolvedOrRejected =
      violation.status === "Resolved" || violation.status === "Rejected";

    MySwal.fire({
      title: "Violation Details",
      html: (
        <div className="text-left space-y-2">
          <p>
            <strong>📅 Date:</strong> {violation.date}
          </p>
          <p>
            <strong>❌ Reason:</strong> {violation.reason}
          </p>
          <p>
            <strong>📋 Report:</strong> {violation.report}
          </p>
          <p>
            <strong>📌 Status:</strong> {violation.status}
          </p>
        </div>
      ),
      showCancelButton: true,
      showDenyButton: !isResolvedOrRejected,
      showConfirmButton: !isResolvedOrRejected,
      confirmButtonText: "✅ Resolve",
      denyButtonText: "❌ Reject",
      cancelButtonText: "Close",
      customClass: {
        popup: "rounded-xl",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleStatusChange(violation, "Resolved");
        Swal.fire("✔️ Resolved!", "", "success");
      } else if (result.isDenied) {
        handleStatusChange(violation, "Rejected");
        Swal.fire("🚫 Rejected!", "", "info");
      }
    });
  };

  // Filter violations by status and date
  const filteredViolations = violations.filter((violation) => {
    const violationDate = parse(violation.date, "MM/dd/yyyy", new Date());
    const inDateRange =
      !filterDate.start ||
      !filterDate.end ||
      isWithinInterval(violationDate, {
        start: parse(filterDate.start, "yyyy-MM-dd", new Date()),
        end: parse(filterDate.end, "yyyy-MM-dd", new Date()),
      });
    return (
      (filterStatus === "All" || violation.status === filterStatus) &&
      inDateRange
    );
  });

  // Calculate statistics for current month and previous month
  useEffect(() => {
    const currentMonthStart = startOfMonth(new Date());
    const currentMonthEnd = endOfMonth(new Date());
    const prevMonthStart = startOfMonth(
      new Date(new Date().setMonth(new Date().getMonth() - 1))
    );
    const prevMonthEnd = endOfMonth(
      new Date(new Date().setMonth(new Date().getMonth() - 1))
    );

    const currentMonthCount = violations.filter((violation) => {
      const violationDate = parse(violation.date, "MM/dd/yyyy", new Date());
      return isWithinInterval(violationDate, {
        start: currentMonthStart,
        end: currentMonthEnd,
      });
    }).length;

    const prevMonthCount = violations.filter((violation) => {
      const violationDate = parse(violation.date, "MM/dd/yyyy", new Date());
      return isWithinInterval(violationDate, {
        start: prevMonthStart,
        end: prevMonthEnd,
      });
    }).length;

    setCurrentMonthStats(currentMonthCount);
    setPreviousMonthStats(prevMonthCount);
  }, [violations]);

  return (
    <div className="p-6 relative min-h-screen">
      <h1 className="text-xl font-bold mb-4 text-blue-700">Violation List</h1>

      {/* Filter by status */}
      <div className="mb-4">
        <label htmlFor="status-filter" className="mr-2">
          Filter by status:
        </label>
        <select
          id="status-filter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 rounded-full border"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Filter by date range */}
      <div className="mb-4">
        <label htmlFor="date-filter" className="mr-2">
          Filter by date range:
        </label>
        <input
          type="date"
          value={filterDate.start}
          onChange={(e) =>
            setFilterDate({ ...filterDate, start: e.target.value })
          }
          className="px-4 py-2 rounded-full border"
        />
        <span className="mx-2">to</span>
        <input
          type="date"
          value={filterDate.end}
          onChange={(e) =>
            setFilterDate({ ...filterDate, end: e.target.value })
          }
          className="px-4 py-2 rounded-full border"
        />
      </div>

      {/* Display statistics */}
      <div className="mb-4 text-sm">
        <p>
          <strong>Current Month Violations:</strong> {currentMonthStats}
        </p>
        <p>
          <strong>Previous Month Violations:</strong> {previousMonthStats}
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full table-auto">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Violation Reason</th>
              <th className="px-4 py-3 text-left">Processing Status</th>
              <th className="px-4 py-3 text-left">Report</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredViolations.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{item.date}</td>
                <td className="px-4 py-3">{item.reason}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3">{item.report}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDetailClick(item)}
                    className="text-xs font-medium px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                    View Details
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

export default Violations;
