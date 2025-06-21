const TopbarCustomer = ({ activeKey, onSelect, onBack }) => {
  const buttons = [
    { label: "Information", key: "information" },
    { label: "History", key: "history" },
    { label: "Transactions", key: "transactions" },
    { label: "Violations", key: "violations" },
    { label: "Documents", key: "documents" },
  ];

  return (
    <div className="w-full mt-4 ">
      <div className="ml-5">
        <button onClick={onBack}
          className="border border-[#68A2F0] rounded-full w-16 h-10"
        >
          <img alt="Back" src="/images/icon-web/Reply Arrow1.png" className="w-7 m-auto" />
        </button>
      </div>
    <div className="flex flex-row space-x-10 justify-center items-center">
      {buttons.map((btn) => (
        <button
          key={btn.key}
          onClick={() => onSelect(btn.key)}
          className={`w-btn-customer py-1.5 transition font-roboto px-4
            ${
              activeKey === btn.key
                ? "bg-blue-900 text-white"
                : "btn-active-customer"
            }`}
        >
            {btn.label}
        </button>
      ))}
    </div>
    </div>
  );
};

export default TopbarCustomer;
