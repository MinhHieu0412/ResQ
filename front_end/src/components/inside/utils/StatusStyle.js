export const getUserStatus = (status) => {
    switch (status) {
      case "Waiting":
        return "bg-yellow-200 text-yellow-800";
      case "Blocked":
        return "bg-red-200 text-red-800";
      case "Active":
        return "bg-green-200 text-green-800";
      case "Deactive":
        return "bg-gray-200 text-gray-800";
      default:
        return "bg-orange-200 text-orange-800";
    }
  };

  export const getReqStatus = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-200 text-blue-800 px-4";
      case "Waiting":
        return "bg-yellow-200 text-yellow-800 px-4";
      case "Processing":
        return "bg-orange-200 text-orange-800 px-1.5";
      case "Canceled":
        return "bg-red-200 text-red-800 px-3";
      case "Completed":
        return "bg-green-200 text-green-800 px-2";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };