import React, { useState, useEffect } from "react";
import TopbarCustomer from "./TopbarCustomer";
import Information from "./Information";
import History from "./History";
import Transactions from "./Transactions";
import Violations from "./Violations";
import Documents from "./Documents";
import "../../../../styles/admin/customer.css";
import { customerAPI } from "../../../../admin";
import { getUserStatus } from "../../utils/StatusStyle";

const items_per_page = 15;

const MainCustomer = () => {

  {/* SETUP API */ }
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [keyword, setKeyword] = useState("");

  //Get Customers
  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const response = await customerAPI.getAllCustomers();
      setCustomers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching customers", error);
      setIsLoading(false);
    }
  };

  //search
  const searchCustomers = async () => {
    try {
      if (keyword.trim() === '') {
        await fetchCustomers();
      } else {
        const response = await customerAPI.search(keyword.trim());
        setCustomers(response.data);
      }
    } catch (err) {
      console.error("Customer search failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  {/* SETUP FILTER & SORT */ }
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("");
  const filteredAndSortedCustomers = customers
    .filter((customer) => {
      if (statusFilter === "Other") {
        return !["Waiting", "Active", "Deactive", "Blocked"].includes(customer.status);
      }
      return statusFilter ? customer.status === statusFilter : true;
    })
    .sort((a, b) => {
      if (!sortField) return 0;

      const fields = {
        point: [a.loyaltyPoint ?? 0, b.loyaltyPoint ?? 0],
        total: [a.totalRescues ?? 0, b.totalRescues ?? 0],
        joined: [new Date(a.createdAt).getTime(), new Date(b.createdAt).getTime()],
      };

      const [valueA, valueB] = fields[sortField] || [0, 0];
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  {/* SETUP PAGINATION */ }
  const [currentPage, setCurrentPage] = useState(1);
  const currentCustomers = filteredAndSortedCustomers.slice(
    (currentPage - 1) * items_per_page,
    currentPage * items_per_page
  );
  const totalPages = Math.ceil(filteredAndSortedCustomers.length / items_per_page);

  {/* RENDER SECTION */ }
  const [selectedTab, setSelectedTab] = useState("information");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  //Back Page
  const handleBack = () => {
    setSelectedCustomer(null)
    fetchCustomers();
  };

  const renderTabContent = () => {
    const components = {
      information: Information,
      history: History,
      transactions: Transactions,
      violations: Violations,
      documents: Documents,
    };
    const Component = components[selectedTab] || (() => <div>Chọn tab</div>);
    return <Component customer={selectedCustomer} />;
  };

  {/* LOAD PAGE */ }
  useEffect(() => {
    fetchCustomers();
    setCurrentPage(1);
  }, [statusFilter]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchCustomers();
    }, 20);
    return () => clearTimeout(delayDebounce);
  }, [keyword]);

  return (
    <div>
      {!selectedCustomer ? (
        <div>
          {/* Search*/}
          <div className="flex ml-[40vh]">
            <form onSubmit={(e) => e.preventDefault()}
              className="flex items-center border border-gray-300 rounded-full w-full max-w-xl px-4 py-2 my-[20px]"
            >
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                type="text"
                placeholder="Search..."
                className="flex-grow outline-none bg-transparent"
              />
              <button type="submit">
                <img src="/images/icon-web/Search.png" className="h-6" alt="Search" />
              </button>
            </form>
            {/* Filter Status */}
            <div className="items-center border border-gray-300 rounded-full mt-[2.2vh] h-[4.7vh] w-36 ml-20">
              <select
                className="mx-3 mt-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">--- Status ---</option>
                <option value="Waiting">Waiting</option>
                <option value="Deactive">Deactive</option>
                <option value="Active">Active</option>
                <option value="Blocked">Blocked</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          {/* List Customer */}
          <table className="w-[96%] mx-8 table-auto border rounded-2xl border-r-0 border-l-0">
            <thead className="font-raleway border bg-[#68A2F0] text-white h-12">
              <tr>
                <th className="w-[4%]">ID</th>
                <th className="w-[15%]">Full Name</th>
                <th className="w-[9%]">Phone No.</th>
                <th className="w-[20%]">Email</th>
                <th className="w-[15%]">
                  Joined Date
                  <button onClick={() => toggleSort("joined")}>
                    <img
                      src={`/images/icon-web/Chevron ${sortField === "joined" && sortOrder === "asc" ? "Up" : "Down"}.png`}
                      className="h-3 ml-2"
                      alt="Sort Joined"
                    />
                  </button>
                </th>
                <th className="w-[10%]">
                  Total Rescue
                  <button onClick={() => toggleSort("total")}>
                    <img
                      src={`/images/icon-web/Chevron ${sortField === "total" && sortOrder === "asc" ? "Up" : "Down"}.png`}
                      className="h-3 ml-2"
                      alt="Sort Total"
                    />
                  </button>
                </th>
                <th className="w-[9%]">
                  Point
                  <button onClick={() => toggleSort("point")}>
                    <img
                      src={`/images/icon-web/Chevron ${sortField === "point" && sortOrder === "asc" ? "Up" : "Down"}.png`}
                      className="h-3 ml-2"
                      alt="Sort Point"
                    />
                  </button>
                </th>
                <th className="w-[8%]">Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((cus, index) => (
                <tr key={index} className="shadow h-12 font-lexend">
                  <td className="text-center">{index + 1}</td>
                  <td>{cus.fullName}</td>
                  <td>{cus.sdt}</td>
                  <td>{cus.email}</td>
                  <td>{new Date(cus.createdAt).toLocaleString("vi-VN")}</td>
                  <td className="text-center">{cus.totalRescues || 0}</td>
                  <td className="text-center">{cus.loyaltyPoint}</td>
                  <td>
                    <p className={`text-xs py-1 w-20 h-6 rounded-3xl text-center mx-auto ${getUserStatus(cus.status)}`}>
                      {cus.status}
                    </p>
                  </td>
                  <td>
                    <div className="text-center">
                      <button
                        className="bg-blue-200 text-blue-600 text-xs border rounded-full px-3 h-6 w-18 text-center"
                        onClick={() => setSelectedCustomer(cus)}
                      >
                        Detail
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          {filteredAndSortedCustomers.length > items_per_page && (
            <div className="flex justify-center mt-2 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <img src={currentPage === 1 ? "/images/icon-web/Back To.png" : "/images/icon-web/Back To1.png"} alt="Back" className="w-9" />
              </button>
              <span className="px-3 py-5 font-semibold">{currentPage} / {totalPages}</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <img src={currentPage === totalPages ? "/images//icon-web/Next page.png" : "/images/icon-web/Next page1.png"} alt="Next" className="w-9" />
              </button>
            </div>
          )}
        </div>
      ) : (
        //Show Customer Detail
        <div className="inline gap-4 maincontent-customer">
          <TopbarCustomer
            onBack={handleBack}
            customer={selectedCustomer}
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