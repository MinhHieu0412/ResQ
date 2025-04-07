const SidebarPartner = ({ onSelect, activeKey }) => {
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
        ZERO GARAGE
      </h2>
      <div className="w-full mt-2">
        <p className="info-partner font-roboto">Loại hình cứu hộ</p>
        <p className="info-partner font-roboto">Địa chỉ</p>
        <p className="info-partner font-roboto">SĐT</p>
        <p className="info-partner font-roboto">Email</p>
        <p className="info-partner font-roboto">Trạng thái</p>
        <p className="info-partner font-roboto">Ngày đăng ký</p>
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
