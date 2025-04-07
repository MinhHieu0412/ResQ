import React, { useState } from "react";
import MainReport from "./MainReport";
import ReportDetails from "./ReportDetails";

const ReportPart = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className=" p-8">
      {showDetails ? (
        <ReportDetails onBack={() => setShowDetails(false)} />
      ) : (
        <MainReport onShowDetails={() => setShowDetails(true)} />
      )}
    </div>
  );
};

export default ReportPart;
