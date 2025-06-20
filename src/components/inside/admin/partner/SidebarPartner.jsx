const SidebarPartner = ({ onSelect, activeKey, selectedPartner }) => {
  const buttons = [
    { label: "Hiệu suất", key: "performance" },
    { label: "Cuộc cứu hộ", key: "rescues" },
    { label: "Doanh thu", key: "revenue" },
    { label: "Vi phạm", key: "violations" },
    { label: "Giấy tờ", key: "documents" },
    { label: "Phương tiện", key: "vehicles" },
  ];

  return (
    <div className="w-60 bg-white rounded-2xl shadow p-4 flex flex-col items-center space-y-3">
      <img
        src="/images/icon-web/Zero_garage.jpg"
        alt="Garage"
        className="rounded-lg object-cover w-full h-32"
      />
      <h2 className="text-lg font-semibold text-center text-blue-900 mt-2">
        {selectedPartner?.fullName}
      </h2>
      <div className="w-full mt-2">
        <p className="info-partner font-roboto">Rescue Service: <br/>
          <span className="text-black">
            {[selectedPartner?.resTow && "Tow", selectedPartner?.resFix && "Fix", selectedPartner?.resDrive && "Drive"]
              .filter(Boolean)
              .join(" || ")
            }
          </span>
        </p>
        <p className="info-partner font-roboto">Address : <br/><span className="text-black">{selectedPartner?.partnerAddress}</span></p>
        <p className="info-partner font-roboto">Phone No : <span className="text-black">{selectedPartner?.sdt}</span></p>
        <p className="info-partner font-roboto">Email : <span className="text-black">{selectedPartner?.email}</span></p>
        {/* <p className="info-partner font-roboto">Status : <span className="text-black">{selectedPartner?.user.status}</span></p> */}
        <p className="info-partner font-roboto">Joined Date : <span className="text-black">{new Date(selectedPartner?.createdAt).toLocaleString('vi-VN')}</span></p>
      </div>

      <div className="w-full mt-4 space-y-2 flex flex-col justify-center items-center">
        {buttons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => onSelect(btn.key)}
            className={`w-btn-partner py-1.5  transition font-roboto
              ${
                activeKey === btn.key
                  ? "bg-blue-900 text-white"
                  : "btn-active-partner"
              }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SidebarPartner;
