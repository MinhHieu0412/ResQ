const TopbarCustomer = ({ activeKey, onSelect }) => {
  const buttons = [
    { label: "Information", key: "information" },
    { label: "History", key: "history" },
    { label: "Transactions", key: "transactions" },
    { label: "Violations", key: "violations" },
    { label: "Documents", key: "documents" },
  ];

  return (
    <div className="w-full mt-4 space-x-10 flex flex-row justify-center items-center">
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
  );
};

export default TopbarCustomer;
