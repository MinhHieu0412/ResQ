import React from "react";
import Swal from "sweetalert2";
import { resolveReport } from "../../../../services/admin"; // Đảm bảo import đúng

const ReportDetails = ({ onBack, data, onUpdate }) => {
  if (!data) return null;

  const createdAt = new Date(data.createdAt);
  const sentTime =
    `${createdAt.getHours().toString().padStart(2, "0")}:` +
    `${createdAt.getMinutes().toString().padStart(2, "0")} ` +
    `${createdAt.getDate().toString().padStart(2, "0")}/` +
    `${(createdAt.getMonth() + 1).toString().padStart(2, "0")}/` +
    `${createdAt.getFullYear()}`;

  const showActionButtons = data.status === "pending";

  const handleResolveReject = async (action) => {
    const status = action === "resolve" ? "resolved" : "rejected";
    const resolverId = parseInt(localStorage.getItem("userId"), 10);

    const { value: responseText } = await Swal.fire({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Report`,
      input: "textarea",
      inputLabel: "Response to complainant",
      inputPlaceholder: "Type your response here...",
      showCancelButton: true,
      confirmButtonText: action.charAt(0).toUpperCase() + action.slice(1),
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) return "Response is required!";
      },
    });

    if (responseText) {
      try {
        const payload = {
          status,
          resolverId,
          responseToComplainant: responseText,
        };
        await resolveReport(data.reportId, payload);
        Swal.fire("Success!", `Report ${status} successfully.`, "success");

        // Gọi onUpdate để cha biết cần reload data, hoặc bạn có thể tự reload ở đây
        if (onUpdate) onUpdate();

      } catch (error) {
        Swal.fire("Error", "Something went wrong while updating the report.", "error");
      }
    }
  };

  return (
    <div className="p-6 bg-white max-w-3xl mx-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold text-gray-800">Complaint Details</h1>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
          >
            Back
          </button>
        </div>

        {/* Các thông tin khác */}
        <DetailItem label="Support Staff" value={data.staffName || "--"} />
        <DetailItem label="Staff ID" value={data.staffId || "--"} />

        <DetailItem
          label="Complainant"
          value={`${data.complainantName || "--"} (ID: ${data.complainantId || "--"})`}
        />

        <DetailItem
          label="Defendant"
          value={`${data.defendantName || "--"} (ID: ${data.defendantId || "--"})`}
        />

        {data.resolverId != null && (
          <>
            <DetailItem label="Resolver ID" value={data.resolverId} />
            <DetailItem label="Resolver Name" value={data.resolverName || "--"} />
          </>
        )}

        <DetailItem label="Sent At" value={sentTime} />

        <div>
          <Label>Reason:</Label>
          <p className="mt-1 text-gray-700 bg-gray-50 p-3 rounded-lg">{data.name || "--"}</p>
        </div>

        <div>
          <Label>Description:</Label>
          <p className="mt-1 text-gray-700 bg-gray-50 p-3 rounded-lg">{data.description || "--"}</p>
        </div>

        <div>
          <Label>Request:</Label>
          <p className="mt-1 text-gray-700 bg-gray-50 p-3 rounded-lg">{data.request || "--"}</p>
        </div>

        {(data.status === "Resolved" || data.status === "Rejected") && (
          <div>
            <Label>Response to Complainant:</Label>
            <p className="mt-1 text-gray-700 bg-gray-50 p-3 rounded-lg">
              {data.responseToComplainant || "No response yet"}
            </p>
          </div>
        )}

        <div>
          <Label>Chat Transcript:</Label>
          {data.pdfFile ? (
            <a
              href={data.pdfFile}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-blue-600 hover:text-blue-800 hover:underline"
            >
              Access saved chat transcript PDF
            </a>
          ) : (
            <p className="mt-2 text-gray-500 italic">No transcript available</p>
          )}
        </div>

        {showActionButtons && (
          <div className="pt-4 border-t border-gray-200 flex gap-4">
            <button
              onClick={() => handleResolveReject("resolve")}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
            >
              Resolve
            </button>
            <button
              onClick={() => handleResolveReject("reject")}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="flex gap-4">
    <Label>{label}</Label>
    <span className="text-gray-700 flex-1">{value}</span>
  </div>
);

const Label = ({ children }) => (
  <span className="w-48 flex-shrink-0 text-gray-500 font-medium">{children}</span>
);

export default ReportDetails;
