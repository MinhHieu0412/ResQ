import React, { useState, useEffect } from "react";
import TopbarCustomer from "./TopbarCustomer";
import Information from "./Information";
import History from "./History";
import Transactions from "./Transactions";
import Violations from "./Violations";
import Documents from "./Documents";
import "../../../../styles/admin/customer.css";
import { getAllCustomers } from "../../../../admin";
import { getUserStatus } from "../../../../utils/UserStatus";


const MainCustomer = () => {
  const [selectedTab, setSelectedTab] = useState("information");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [sortOrderTotal, setSortOrderTotal] = useState("asc");
  const [sortOrderPoint, setSortOrderPoint] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState([]);

  //Get Customers from API
  const fetchCustomers = async () => {
    try {
      const response = await getAllCustomers();
      console.log(response.data);
      setCustomers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching customers', error);
      setIsLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "information":
        return <Information customer={selectedCustomer} />;
      case "history":
        return <History customer={selectedCustomer} />;
      case "transactions":
        return <Transactions customer={selectedCustomer} />;
      case "violations":
        return <Violations customer={selectedCustomer} />;
      case "documents":
        return <Documents customer={selectedCustomer} />;
      default:
        return <div>Chọn tab</div>;
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    if (statusFilter === "Other") {
      return !["Waiting", "Active", "Deactive", "Blocked"].includes(customer.status);
    }
    return statusFilter ? customer.status === statusFilter : true;
  });

  const handleSortByTotal = () => {
    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
      return sortOrderTotal === "asc" ? a.total - b.total : b.total - a.total;
    });
    setCustomers(sortedCustomers);
    setSortOrderTotal(sortOrderTotal === "asc" ? "desc" : "asc");
  };

  const handleSortByPoint = () => {
    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
      return sortOrderPoint === "asc" ? a.point - b.point : b.point - a.point;
    });
    setCustomers(sortedCustomers);
    setSortOrderPoint(sortOrderPoint === "asc" ? "desc" : "asc");
  };

  useEffect(()=>{
    fetchCustomers();
  },[]);

  return (
    <div>
      {!selectedCustomer ? (
        <div>
          <div className="flex ml-[40vh]">
            <div className="flex items-center border border-gray-300 rounded-full w-full max-w-xl px-4 py-2 my-[20px] ">
              <input
                type="text"
                placeholder="Search..."
                className="flex-grow outline-none bg-transparent"
              />
              <button>
                <img src="../../../../../public/images/icon-web/Search.png" className="h-6" />
              </button>
            </div>
            <div className="items-center border border-gray-300 rounded-full mt-[20px] h-[43px] w-[19vh] ml-[20vh]">
              <select
                className="mx-4 my-3 w-36"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
              <option value="">--- Status ---</option>
              <option value="Waiting">Waiting</option>
              <option value="Deactive">Deactive</option>
              <option value="Active">Active</option>
              <option value="Block">Block</option>
              <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <table className="w-[96%] mx-8 table-auto border rounded-2xl border-r-0 border-l-0">
            <thead className="font-raleway border bg-[#68A2F0] text-white h-12 border-r-0 border-l-0">
              <tr>
                <th className="w-[4%]">ID</th>
                <th className="w-[15%]">Full Name</th>
                <th className="w-[9%]">Phone No.</th>
                <th className="w-[20%]">Email</th>
                <th className="w-[15%]">Joined Date</th>
                <th className="w-[10%]">
                  Total Rescue
                  <button onClick={handleSortByTotal}>
                    <img
                      src={`../../../../../public/images/icon-web/Chevron ${sortOrderTotal === "asc" ? "Down" : "Up"}.png`}
                      className="h-3 ml-2"
                    />
                  </button>
                </th>
                <th className="w-[9%]">
                  Point
                  <button onClick={handleSortByPoint}>
                    <img
                      src={`../../../../../public/images/icon-web/Chevron ${sortOrderPoint === "asc" ? "Down" : "Up"}.png`}
                      className="h-3 ml-2"
                    />
                  </button>
                </th>
                <th className="w-[8%]">Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((cus, index) => (
                <tr key={index} className="shadow h-12 font-lexend">
                  <td className="text-center">{index+1}</td>
                  <td>{cus.fullName}</td>
                  <td>{cus.sdt}</td>
                  <td>{cus.email}</td>
                  <td>{new Date(cus.createdAt).toLocaleString("vi-VN")}</td>
                  <td>1000</td>
                  <td>{cus.loyaltyPoint}</td>
                  <td>
                    <p
                      className={`text-xs py-1 w-[8vh] h-6 rounded-3xl font-bold text-center ${getUserStatus(
                        cus.status
                      )}`}
                    >
                      {cus.status}
                    </p>
                  </td>
                  <td>
                    <button
                      className="bg-blue-200 text-blue-600 text-xs font-bold border rounded-full px-3 h-6 w-18 text-center align-center"
                      onClick={() => setSelectedCustomer(cus)}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="inline gap-4 maincontent-customer">
          <TopbarCustomer
            onSelect={setSelectedTab}
            activeKey={selectedTab}
            className="topbar-customer"
          />
          <div className="flex-1 h-full rounded-xl shadow p-4 main-customer">
            {renderTabContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainCustomer;
