import { useEffect, useState } from "react";
import { partnerAPI } from "../../../../admin";

const SidebarPartner = ({ onSelect, activeKey, selectedPartner, setSelectedPartner, onBack, onReload}) => {
  const buttons = [
    { label: "Performance", key: "performance" },
    { label: "Rescues", key: "rescues" },
    { label: "Revenue", key: "revenue" },
    { label: "Violations", key: "violations" },
    { label: "Documents", key: "documents" },
    { label: "Vehicles", key: "vehicles" },
  ];
  const [confirm, setConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [result, setResult] = useState(false);

  const approvePartner = async (partner) => {
  try {
    const response = await partnerAPI.approveParnter(partner.partnerId);
    setResult(true);
    setConfirm(false);
    setIsSuccess(true);

    const updatedPartner = await partnerAPI.findById(partner.partnerId);
    console.log(updatedPartner.data);
    setSelectedPartner(updatedPartner.data); // 👈 update trạng thái

    setTimeout(() => {
      setResult(false);
      onReload(); 
    }, 3000);
  } catch (error) {
    console.error('Error approve partner', error);
    setResult(true);
    setIsSuccess(false);
    setTimeout(() => {
      setResult(false);
    }, 3000);
  }
};


  return (
    <div>
      <div className="w-60 bg-white rounded-2xl shadow flex flex-col">
        <div className="px-4 py-2">
          <button onClick={onBack}
            className="border border-[#68A2F0] rounded-full w-12 h-8"
          >
            <img alt="Back" src="/images/icon-web/Reply Arrow1.png" className="w-6 m-auto" />
          </button>
        </div>
        <div className="space-y-3 px-4 items-center">
          <img
            src="/images/icon-web/Zero_garage.jpg"
            alt="Garage"
            className="rounded-lg object-cover w-full h-32"
          />
          <h2 className="text-lg font-semibold text-center text-blue-900 mt-2">
            {selectedPartner?.fullName}
          </h2>
          <div className="w-full mt-2 text-[14px]">
            <p className="info-partner font-roboto">Rescue Service: <br />
              <span className="text-black">
                {[selectedPartner?.resTow && "Tow", selectedPartner?.resFix && "Fix", selectedPartner?.resDrive && "Drive"]
                  .filter(Boolean)
                  .join(" || ")
                }
              </span>
            </p>
            <p className="info-partner font-roboto">Address : <br /><span className="text-black">{selectedPartner?.partnerAddress}</span></p>
            <p className="info-partner font-roboto">Phone No : <span className="text-black">{selectedPartner?.sdt}</span></p>
            <p className="info-partner font-roboto">Email : <span className="text-black">{selectedPartner?.email}</span></p>
            <p className="info-partner font-roboto">Status : <span className="text-black">{selectedPartner?.status}</span></p>
            <p className="info-partner font-roboto">Joined Date : <span className="text-black">{new Date(selectedPartner?.createdAt).toLocaleString('vi-VN')}</span></p>
          </div>
          <div className="w-full mt-4 space-y-2 flex flex-col justify-center items-center">
            {buttons.map((btn) => (
              <button
                key={btn.key}
                onClick={() => onSelect(btn.key)}
                className={`w-btn-partner py-1.5  transition font-roboto
              ${activeKey === btn.key
                    ? "bg-blue-900 text-white"
                    : "btn-active-partner"
                  }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
        {!selectedPartner?.verificationStatus &&
          <button onClick={() => setConfirm(true)}
            className="fixed bottom-20 right-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-full shadow-lg">
            Approve
          </button>
        }
      </div>
      {confirm &&
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black px-10 py-4 rounded-lg shadow-lg text-lg">
            <p className="font-lexend">Do you want to approve partner {selectedPartner?.fullName}?</p>
            <div className="flex justify-center gap-5 mt-5">
              <button onClick={() => approvePartner(selectedPartner)}
                className="bg-green-500 text-white px-4 py-2 rounded-3xl hover:bg-green-700 transition font-lexend">
                YES
              </button>
              <button onClick={() => setConfirm(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-3xl hover:bg-red-700 transition font-lexend">
                NO
              </button>
            </div>
          </div>
        </div>
      }
      {result && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black px-10 py-6 rounded-xl shadow-lg text-center max-w-md">
            {isSuccess ?
              <img
                src="/images/icon-web/success.png"
                alt="success"
                className="w-24 mx-auto mb-4"
              /> :
              <img
                src="/images/icon-web/fail.png"
                alt="fail"
                className="w-24 mx-auto mb-4"
              />
            }
            <h2
              className={`text-xl font-semibold mb-2 ${isSuccess ? 'text-green-700' : 'text-red-700'
                }`}
            >
              {isSuccess ? "Partner Approved Successfully!" : "Partner Approval Failed!"}
            </h2> 
            {isSuccess && (
              <p className="text-gray-600">
                You have approved partner <strong>{selectedPartner?.fullName}</strong>.
                <br />
                The partner will receive a notification.
              </p>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default SidebarPartner;
