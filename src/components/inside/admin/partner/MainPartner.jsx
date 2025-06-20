import React, { useState, useEffect } from "react";
import { getAllPartners } from "../../../../admin";
import { searchPartnersByName } from "../../../../admin";
import SidebarPartner from "./SidebarPartner";
import Performance from "./Performance";
import RescueCalls from "./RescueCalls";
import Revenue from "./Revenue";
import Violations from "./Violations";
import Documents from "./Documents";
import Vehicles from "./Vehicles";
import "../../../../styles/admin/partner.css";
import { getUserStatus } from "../../../../utils/UserStatus";


const MainPartner = () => {
  const [selectedTab, setSelectedTab] = useState("performance");
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [approving, setApproving] = useState(false);
  const [waitingPartners, setWaitingPartners] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [partners, setPartners] = useState([]);
  const [keyword, setKeyword] = useState('');

  /*API*/

  // Get Partners from API
  const fetchPartners = async () => {
    try {
      const response = await getAllPartners();
      setPartners(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching partners', error);
      setIsLoading(false);
    }
  };

  const searchPartner = async () => {
    console.log("IN")
    if (keyword.trim() === '') {
      fetchPartners();
    } else {
      try {
        const response = await searchPartnersByName(keyword);
        setPartners(response.data);
      } catch (err) {
        console.error('Cannot search partner!', err);
      }
    }
  };

  /*HANDLE FILTER - CHANGE PAGE*/

  // Count Approving List
  // const countWaitingPartners = partners.filter((partner) => partner.user.status === "Waiting").length;

  // Check Approving
  const handleApproval = () => {
    setApproving(true);
    const waitingList = partners.filter((p) => p.user.status === "Waiting");
    setWaitingPartners(waitingList);
  };

  //Handle Filter
  const filteredPartners = (approving ? waitingPartners : partners).filter((partner) => {
    if (statusFilter === "Other") {
      return !["Waiting", "Active", "Deactive", "Blocked"].includes(partner.user.status);
    }
    const statusMatch = statusFilter ? partner.user.status === statusFilter : true;
    const serviceMatch = serviceFilter ? partner[serviceFilter] === true : true;
    return statusMatch && serviceMatch;
  });

  // Handle Sort
  const handleSortByRate = () => {
    const sortedPartners = [...filteredPartners].sort((a, b) => {
      return sortOrder === "asc" ? a.rate - b.rate : b.rate - a.rate;
    });
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    if (approving) {
      setWaitingPartners(sortedPartners);
    } else {
      setPartners(sortedPartners);
    }
  };

  /* RENDER */

  const renderContent = () => {
    switch (selectedTab) {
      case "performance":
        return <Performance />;
      case "rescues":
        return <RescueCalls />;
      case "revenue":
        return <Revenue />;
      case "violations":
        return <Violations />;
      case "documents":
        return <Documents />;
      case "vehicles":
        return <Vehicles />;
      default:
        return <div>Chọn chức năng từ sidebar</div>;
    }
  };

  const renderTableHeaders = () => (
    <thead className="font-raleway border bg-[#68A2F0] text-white h-12 border-r-0 border-l-0">
      <tr>
        <th className="w-[4%]">ID</th>
        <th className="w-[13%]">Username</th>
        <th className="w-[10%]">Phone No.</th>
        <th className="w-[14%]">Email</th>
        <th className="w-[20%]">Address</th>
        <th className="w-[5%]">
          Rate
          <button onClick={handleSortByRate}>
            <img
              src={`../../../../../public/images/icon-web/Chevron ${sortOrder === "asc" ? "Down" : "Up"}.png`}
              className="h-3 ml-2"
            />
          </button>
        </th>
        <th className="w-[10%]">Service</th>
        <th>Status</th>
        <th>Joined Date</th>
        <th>Action</th>
      </tr>
    </thead>
  );

  const renderTableBody = () => (
    <tbody className="font-lexend text-[14px]">
      {filteredPartners.map((part, index) => (
        <tr key={index} className="shadow h-14 font-lexend">
          <td className="text-center">{index+1}</td>
          <td>{part.fullName}</td>
          <td>{part.sdt}</td>
          <td>{part.email}</td>
          <td>{part.address}</td>
          <td className="text-center">3.25</td>
          <td className="pl-2">
            {[part.resTow && "Tow", part.resFix && "Fix", part.resDrive && "Drive"]
              .filter(Boolean)
              .join(" || ")
            }
          </td>
          <td>
            {/* <p className={`text-xs py-2 w-22 h-8 rounded-3xl font-bold text-center ${getUserStatus(part.user.status)}`}>
              {part.user.status}
            </p> */}No
          </td>
          <td className="text-center">
            {new Date(part.createdAt).toLocaleString('vi-VN')}
          </td>
          <td>
            <button
              className="bg-blue-200 text-blue-600 text-xs font-bold border rounded-full px-3 h-6 w-18 text-center align-center"
              onClick={() => setSelectedPartner(part)}
            >
              Detail
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <div>
      {!selectedPartner ? (
        <div>
          {approving ? (
            <div>
              <div className="flex">
                <form
                  onSubmit={searchPartner}
                  className="flex items-center border border-gray-300 rounded-full w-[75vh] ml-[40vh] px-4 py-2 my-[2vh]">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-grow outline-none bg-transparent"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button
                    type="submit"
                  >
                    <img src="../../../../../public/images/icon-web/Search.png" className="h-6" />
                  </button>
                </form>
                <div className="items-center border border-gray-300 rounded-full mt-[2vh] h-[43px] w-48 ml-[8vh]">
                  <select className="mx-4 my-3 w-40" value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}>
                    <option value="">--- Service ---</option>
                    <option value="resTow">Towing</option>
                    <option value="resFix">Fixing</option>
                    <option value="resDrive">Driving</option>
                  </select>
                </div>
              </div>
              <table className="w-[96%] mx-8 table-auto border rounded-2xl border-r-0 border-l-0">
                {renderTableHeaders()}
                {renderTableBody()}
              </table>
            </div>
          ) : (
            <div>
              <div className="flex">
                <div className="items-center bg-[#013171] border border-gray-300 rounded-full mt-[2vh] h-[43px] w-[20vh] ml-[5vh]">
                  <button className="text-white mx-3 my-2 w-48 flex px-1" onClick={handleApproval}>
                    Approve Partner
                    {/* <div className="bg-red-500 border-red-500 rounded-full min-w-6 px-1 ml-2">{countWaitingPartners}</div> */}
                  </button>
                </div>
                <div className="flex items-center border border-gray-300 rounded-full w-[75vh] ml-[5vh] px-4 py-2 my-[2vh]">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-grow outline-none bg-transparent"
                  />
                  <button>
                    <img src="../../../../../public/images/icon-web/Search.png" className="h-6" />
                  </button>
                </div>
                <div className="items-center border border-gray-300 rounded-full mt-[2vh] h-[43px] w-48 ml-[6vh]">
                  <select className="mx-4 my-3 w-40" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">--- Status ---</option>
                    <option value="Waiting">Waiting</option>
                    <option value="Deactive">Deactive</option>
                    <option value="Active">Active</option>
                    <option value="Block">Block</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="items-center border border-gray-300 rounded-full mt-[2vh] h-[43px] w-48 ml-[2vh]">
                  <select className="mx-4 my-3 w-40" value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}>
                    <option value="">--- Service ---</option>
                    <option value="resTow">Towing</option>
                    <option value="resFix">Fixing</option>
                    <option value="resDrive">Driving</option>
                  </select>
                </div>
              </div>
              <table className="w-[96%] mx-8 table-auto border rounded-2xl border-r-0 border-l-0">
                {renderTableHeaders()}
                {renderTableBody()}
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-4 maincontent-partner">
          <SidebarPartner
            onSelect={setSelectedTab}
            activeKey={selectedTab}
            selectedPartner={selectedPartner}
            className="sidebar-partner"
          />
          <div className="flex-1 rounded-xl shadow p-4 main-partner">
            {renderContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPartner;
