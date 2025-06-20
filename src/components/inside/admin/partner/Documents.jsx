import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getPartnerDocumentary } from "../../../../services/admin"; // sửa theo đường dẫn của bạn

const Documents = () => {
  const [documents, setDocuments] = useState([]);

  // Hàm lấy màu theo trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending Approval":
        return "bg-blue-100 text-blue-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Requires Update":
        return "bg-orange-100 text-orange-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Cấu hình nút cho SweetAlert theo trạng thái
  const getButtonsForStatus = (status) => {
    switch (status) {
      case "Expired":
        return {
          confirmButtonText: "Request Update",
          showDenyButton: true,
          denyButtonText: "Close",
          showCancelButton: false,
        };
      case "Pending":
        return {
          confirmButtonText: "Approve",
          showDenyButton: true,
          denyButtonText: "Request Update",
          showCancelButton: true,
          cancelButtonText: "Close",
        };
      default:
        return {
          confirmButtonText: "Close",
          showCancelButton: false,
        };
    }
  };

  // Hàm hiển thị chi tiết tài liệu bằng SweetAlert
  const handleShowDetail = (doc) => {
    let htmlContent = "";

    // Có thể mở rộng thêm các loại document khác nếu cần
    if (doc.documentType === "Driver License") {
      htmlContent = `
        <div style="text-align:left">
          <p><strong>Full Name:</strong> ${doc.fullName || doc.name || ""}</p>
          <p><strong>Date of Birth:</strong> ${doc.birthDate || ""}</p>
          <p><strong>License Number:</strong> ${doc.licenseNumber || ""}</p>
          <p><strong>License Class:</strong> ${doc.licenseClass || ""}</p>
          <p><strong>Issue Date:</strong> ${doc.issueDate || ""}</p>
          <p><strong>Expiry Date:</strong> ${doc.expiryDate || doc.expiry || ""}</p>
          <p><strong>Issuing Authority:</strong> ${doc.issuingAuthority || ""}</p>
          <p><strong>Verification Status:</strong> ${doc.status || ""}</p>
        </div>
        <div style="display:flex; justify-content:space-around; margin-top:20px;">
          <div><p style="text-align:center">Front Side</p><img src="${doc.frontImg}" alt="Front side" width="120" /></div>
          <div><p style="text-align:center">Back Side</p><img src="${doc.backImg}" alt="Back side" width="120" /></div>
        </div>
      `;
    } else if (doc.type === "Business License") {
      htmlContent = `
        <div style="text-align:left">
          <p><strong>Business Name:</strong> ${doc.name}</p>
          <p><strong>Headquarters Address:</strong> ${doc.address}</p>
          <p><strong>Business Field:</strong> ${doc.businessField || "Not available"}</p>
          <p><strong>Representative:</strong> ${doc.representative || "Not available"}</p>
          <p><strong>Business Type:</strong> ${doc.companyType || "Not available"}</p>
          <p><strong>Verification Status:</strong> ${doc.status}</p>
        </div>
        <div style="display:flex; justify-content:center; margin-top:20px;">
          <img src="${doc.licenseImg}" alt="Business License" width="200" style="border:1px solid #ccc; padding:4px;" />
        </div>
      `;
    } else {
      // Mặc định các loại khác
      htmlContent = `
        <div style="text-align:left">
          <p><strong>Document Holder:</strong> ${doc.name || doc.fullName || ""}</p>
          <p><strong>Document Number:</strong> ${doc.number || doc.licenseNumber || ""}</p>
          <p><strong>Address:</strong> ${doc.address || ""}</p>
          <p><strong>Issue Date:</strong> ${doc.issueDate || ""}</p>
          <p><strong>Expiry Date:</strong> ${doc.expiryDate || doc.expiry || ""}</p>
          <p><strong>Status:</strong> ${doc.status || ""}</p>
        </div>
        <div style="display:flex; justify-content:space-around; margin-top:20px;">
          <div><p style="text-align:center">Front Side</p><img src="${doc.frontImg}" alt="Front" width="100" /></div>
          <div><p style="text-align:center">Back Side</p><img src="${doc.backImg}" alt="Back" width="100" /></div>
        </div>
      `;
    }

    Swal.fire({
      title: `${doc.type}`,
      width: 700,
      html: htmlContent,
      ...getButtonsForStatus(doc.status),
    }).then((result) => {
      if (result.isConfirmed) {
        if (doc.status === "Expired") {
          Swal.fire("✅ Update request sent!", "", "success");
        } else if (doc.status === "Pending Approval") {
          Swal.fire("✅ Document approved!", "", "success");
        }
      } else if (result.isDenied) {
        Swal.fire("📨 Update request sent!", "", "info");
      }
    });
  };

  // Gọi API lấy dữ liệu khi component mount
  useEffect(() => {
    const fetchDocuments = async () => {
      const data = await getPartnerDocumentary(1); // thay số 1 bằng ID đối tác thực tế
      setDocuments(data);
    };
    fetchDocuments();
  }, []);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Document Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Expiry Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {documents.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6">
                No documents found.
              </td>
            </tr>
          ) : (
            documents.map((doc, index) => (
              <tr key={doc.documentId || index}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {index+1}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {doc.documentType}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {doc.expiryDate || doc.expiry || ""}
                </td>
                <td
                  className={`px-6 py-4 text-sm font-medium ${getStatusColor(
                    doc.documentStatus
                  )}`}
                >
                  {doc.documentStatus}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button
                    onClick={() => handleShowDetail(doc)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Documents;
