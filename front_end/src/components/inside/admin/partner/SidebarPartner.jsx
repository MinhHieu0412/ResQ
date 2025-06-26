import { useEffect, useState } from "react";
import { partnerAPI } from "../../../../admin";

const SidebarPartner = ({ onSelect, activeKey, selectedPartner, setSelectedPartner, onBack, onReload }) => {
  const buttons = [
    { label: "Performance", key: "performance" },
    { label: "Rescues", key: "rescues" },
    { label: "Revenue", key: "revenue" },
    { label: "Violations", key: "violations" },
    { label: "Documents", key: "documents" },
    { label: "Vehicles", key: "vehicles" },
  ];


  const services = [
    { srvId: 1, srvName: "Rửa xe", srvPrice: 50000 },
    { srvId: 2, srvName: "Thay nhớt", srvPrice: 150000 },
    { srvId: 3, srvName: "Kiểm tra động cơ", srvPrice: 100000 },
    { srvId: 4, srvName: "Bảo dưỡng tổng quát", srvPrice: 250000 },
  ];

  const [confirm, setConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reject, setReject] = useState(false);
  const [result, setResult] = useState(false);
  const [reasonText, setReasonText] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);

  const handleCheckboxChange = (e, srvName) => {
    const isChecked = e.target.checked;
    let updated = [];
    if (isChecked) {
      updated = [...selectedServices, srvName];
    } else {
      updated = selectedServices.filter(name => name !== srvName);
    }
    setSelectedServices(updated);

    if (updated.length > 0) {
      const serviceList = updated.join(', ');
      setReasonText(`Please check your ${serviceList}.`);
    } else {
      setReasonText('');
    }
  };

  const approvePartner = async (partner) => {
    try {
      await partnerAPI.approveParnter(partner.partnerId);
      setResult(true);
      setConfirm(false);
      setIsSuccess(true);

      const updatedPartner = await partnerAPI.findById(partner.partnerId);
      setSelectedPartner(updatedPartner.data);
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
            className="fixed bottom-20 right-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-full shadow-lg">
            Verify Partner
          </button>
        }
      </div>
      {confirm &&
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white text-black px-10 py-4 rounded-lg shadow-lg text-lg">
            <button
              className="absolute top-4 right-4 text-xl font-bold"
              onClick={() => setConfirm(false)}
            >
              ✖
            </button>
            <p className="font-lexend">Do you want to approve partner {selectedPartner?.fullName}?</p>
            <div className="relative flex justify-center gap-5 mt-5">
              <button onClick={() => approvePartner(selectedPartner)}
                className="bg-green-500 text-white px-4 py-2 rounded-3xl hover:bg-green-700 transition font-lexend">
                Approve
              </button>
              <button onClick={() => setReject(true)}
                className="bg-red-500 text-white px-4 py-2 rounded-3xl hover:bg-red-700 transition font-lexend">
                Reject
              </button>
            </div>

          </div>
        </div>
      }
      {reject && (
        <div class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white text-black px-10 py-6 rounded-xl shadow-lg w-[40vw]">
            <button
              className="absolute top-4 right-4 text-xl font-bold"
              onClick={() => {
                setReject(false);
                setReasonText('')
              }}
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-2 text-center text-red-600">REJECT PARTNER</h2>
            <h4 className="font-bold mt-5">Partner's Document</h4>
            <div className="border border-gray-300 rounded-xl p-4 h-60 overflow-y-auto space-y-2">
              {services.map((srv) => (
                <label key={srv.srvId} className="block mb-1">
                  <input
                    type="checkbox"
                    value={srv.srvId}
                    onChange={(e) => handleCheckboxChange(e, srv.srvName)}
                  />
                  <span className="ml-2">{srv.srvName}</span>
                </label>
              ))}
            </div>
            <textarea
              className="border rounded-lg p-2 w-full my-2 h-36"
              placeholder="Reject partner resons"
              value={reasonText}
            ></textarea>
            <button
              //onclick={submitReject()}
              class="bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700 float-right">
              Confirm Reject
            </button>
          </div>
        </div>
      )}

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
