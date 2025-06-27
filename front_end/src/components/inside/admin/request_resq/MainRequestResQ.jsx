import React, { useEffect, useState } from "react";
import { getReqStatus } from "../../utils/StatusStyle";
import { reqResQsAPI, feedbackAPI, extraSrvAPI } from "../../../../admin";
import FormRequest from "./FormRequest";
import FeedbackDetail from "../feedback/FeedbackDetail";
import "../../../../styles/admin/requestResQ.css";

const RescueReQs = ({ partner }) => {
  /*API ALL*/
  const [reqResQ, setReqResQ] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fetchRequests = async () => {
    try {
      const response = await reqResQsAPI.getAllReqResQs();
      setReqResQ(response.data);
    } catch (err) {
      console.error("Cannot fetch request: " + err);
      setIsLoading(false);
    }
  }

  const searchRequestResQ = async (e) => {
    e.preventDefault();
    if (keyword.trim() === '') {
      setStatusFilter('');
      fetchRequests();
    } else {
      try {
        const response = await reqResQsAPI.searchRequestResQ(keyword);
        setReqResQ(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Cannot find any request: " + err)
        setIsLoading(false);
      }
    }
  }

  /* OTHER FUNC */
  const [recordStatus, setRecordStatus] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [extraSrv, setExtraSrv] = useState(null);
  const [detail, selectDetail] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleViewDetail = async (req) => {
    try {
      const response = await reqResQsAPI.relatedRecordCheck(req.rrid);
      setRecordStatus(response.data);
    } catch (err) {
      console.error("Cannot check related records status: " + err);
      setIsLoading(false);
    }
    try {
      const response = await extraSrvAPI.findExtrasByResResQ(req.rrid);
      setExtraSrv(response.data);
    } catch (err) {
      console.error("Cannot find extra service: " + err);
      setIsLoading(false);
    }
    selectDetail(req);
    setIsLoading(false);
  };

  const handleViewFeedback = async (req) => {
    try {
      const response = await feedbackAPI.findFeedbacksByReqResQ(req.rrid);
      setFeedback(response.data);
      setShowFeedback(true);
      setIsLoading(false);
    } catch (err) {
      console.error("Cannot get feedbacks of this request: " + err);
      setIsLoading(false);
    }
  }

  const handleEdit = (req) => {
    setSelectedReq(req);
    setIsCreating(true);
    setIsEdit(true);
  };

  const handleBack = () => {
    setSelectedReq(null);
    setIsEdit(false);
    setIsCreating(false);
    fetchRequests();
  };

  /* SORT & FILTER */
  const [statusFilter, setStatusFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [sortField, setSortField] = useState('');
  const [selectedReq, setSelectedReq] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredReq = reqResQ
    .filter((req) => {
      const statusMatch = statusFilter ? req.reqStatus === statusFilter : true;
      const serviceMatch = serviceFilter ? req.rescueType === serviceFilter : true;
      return statusMatch && serviceMatch;
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      let valueA, valueB;
      if (sortField === "price") {
        valueA = a.totalPrice ?? 0;
        valueB = b.totalPrice ?? 0;
      }
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });

  const toggleSort = (field) => {
    setSortOrder(sortField === field && sortOrder === "asc" ? "desc" : "asc");
    setSortField(field);
  };

  /* PAGINATION */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReqResQ = filteredReq.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredReq.length / itemsPerPage);
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  useEffect(() => {
    if (statusFilter === '' && keyword.trim() === '') {
      fetchRequests();
    }
    setCurrentPage(1);
  }, [statusFilter, statusFilter, keyword]);

  return (
    <div>
      {isCreating ? (
        <FormRequest onBack={handleBack}
          req={selectedReq}
          isEdit={isEdit} />
      ) : (
        <div>
          <div className="flex">
            <div className="items-center bg-[#013171] border border-gray-300 rounded-full mt-4 h-[5vh] w-[15%] ml-[5vh]">
              <button className="text-white mx-2 mt-2 w-48 flex px-1" onClick={() => setIsCreating(true)}>
                New Rescue Request
              </button>
            </div>
            <form
              onSubmit={searchRequestResQ}
              onChange={searchRequestResQ}
              className="flex items-center border border-gray-300 rounded-full w-[75vh] ml-[2vw] px-4 py-2 my-[2vh]">
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                type="text"
                placeholder="Search..."
                className="flex-grow outline-none bg-transparent" />
              <button type="submit">
                <img src="/images/icon-web/Search.png" className="h-6" alt="Search" />
              </button>
            </form>
            <div className="items-center border border-gray-300 rounded-full mt-[2vh] h-[5vh] w-36 ml-[1vw]">
              <select className="mx-3 mt-2" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">--- Status ---</option>
                <option value="Pending">Pending</option>
                <option value="On trip">On trip</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="items-center border border-gray-300 rounded-full mt-[2vh] h-[5vh] w-36 ml-[1vw]">
              <select className="mx-3 mt-2" value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}>
                <option value="">--- Service ---</option>
                <option value="ResTow">ResTow</option>
                <option value="ResFix">ResFix</option>
                <option value="ResDrive">ResDrive</option>
              </select>
            </div>
          </div>
          <table className="w-[96%] mx-8 table-auto border rounded-2xl border-r-0 border-l-0">
            <thead className="font-raleway border bg-[#68A2F0] text-white h-12 border-r-0 border-l-0">
              <tr>
                <th className="w-[5%]">ID</th>
                <th className="w-[15%]">Customer</th>
                <th className="w-[15%]">Partner</th>
                <th className="w-[8%]">Service</th>
                <th className="w-[25%]">Address</th>
                <th className="w-[10%]">Status</th>
                <th className="w-[11%]">
                  Total Price
                  <button onClick={() => toggleSort("price")}>
                    {sortField === "price" ? (
                      <img
                        src={`/images/icon-web/Chevron ${sortOrder === "asc" ? "Up" : "Down"}.png`}
                        className="h-3 ml-2 inline-block"
                      />
                    ) : (
                      <img
                        src={`/images/icon-web/sort.png`}
                        className="h-3 ml-2 inline-block"
                      />
                    )}
                  </button>
                </th>
                <th className="w-[10%]">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentReqResQ.map((req) => (
                <tr key={req.rrid} className="shadow h-12 font-lexend">
                  <td className="text-center">{req.rrid}</td>
                  <td>{req.userName}</td>
                  <td>{req.partnerName}</td>
                  <td className="text-center">{req.rescueType}</td>
                  <td>{req.ulocation}</td>
                  <td>
                    <p
                      className={`text-xs py-1 w-20 h-6 rounded-3xl text-center mx-auto ${getReqStatus(req.reqStatus)}`}
                    >
                      {req.reqStatus}
                    </p>
                  </td>
                  <td className="text-center">
                    {new Intl.NumberFormat('vi-VN').format(req.totalPrice)} {req.currency}
                  </td>
                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-blue-100 text-blue-600 text-xs border border-blue-300 rounded-full px-3 h-6"
                        onClick={() => handleViewDetail(req)}
                      >
                        Detail
                      </button>
                      {
                        ["pending", "on trip"].includes(req.reqStatus?.toLowerCase()) && (
                          <button
                            className="bg-white border border-gray-400 rounded-full h-6 w-8 flex items-center justify-center"
                            onClick={() => handleEdit(req)}
                          >
                            <img src="/images/icon-web/edit.png" className="w-4 h-4" alt="edit" />
                          </button>
                        )
                      }
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {filteredReq.length > itemsPerPage && (
            <div className="flex justify-center mt-2 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <img src={isPrevDisabled ? "/images/icon-web/Back To.png" : "/images/icon-web/Back To1.png"} alt="Back" className="w-9" />
              </button>
              <span className="px-3 py-5 font-semibold">{currentPage} / {totalPages}</span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage >= totalPages}
              >
                <img src={isNextDisabled ? "/images//icon-web/Next page.png" : "/images/icon-web/Next page1.png"} alt="Next" className="w-9" />
              </button>
            </div>
          )}

          {/* Detail */}
          {detail && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white w-[1000px] rounded-xl p-8 relative text-[#013171]">
                <button className="absolute top-4 right-4 text-xl font-bold" onClick={() => selectDetail(null)}>
                  ✖
                </button>
                <h2 className="text-center text-2xl font-bold mb-4">Rescue No #{detail.rrid}</h2>
                {(recordStatus?.hasCustomerReport || recordStatus?.hasPartnerReport) && (
                  <div className="float-right italic text-red-500 font-semibold text-sm text-center">
                    {recordStatus.hasCustomerReport && recordStatus.hasPartnerReport ? (
                      <span>
                        *There are <strong>2 reports</strong> for this request rescue
                      </span>
                    ) : recordStatus.hasCustomerReport ? (
                      <span>
                        *There is <strong>1 report from Customer</strong> for this request rescue
                      </span>
                    ) : (
                      <span>
                        *There is <strong>1 report from Partner</strong> for this request rescue
                      </span>
                    )}
                  </div>
                )}
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-500 ">
                      <th colSpan={2} className="text-center py-2 border-r border-gray-500">Customer's Information</th>
                      <th colSpan={2} className="text-center py-2">Partner's Information</th>
                    </tr>
                  </thead>
                  <tbody className="border-b border-gray-400">
                    <tr>
                      <td className="InformationTitle">Full Name</td>
                      <td className="InformationContent">{detail.userName}</td>
                      <td className="InformationTitle">Name</td>
                      <td className="InformationContent">{detail.partnerName}</td>
                    </tr>
                    <tr>
                      <td className="InformationTitle">Phone No</td>
                      <td className="InformationContent">{detail.userPhone}</td>
                      <td className="InformationTitle">Phone No</td>
                      <td className="InformationContent">{detail.partnerPhone}</td>
                    </tr>
                  </tbody>
                </table>
                {!extraSrv || (extraSrv.reason === "" && extraSrv.price === 0) ? (
                  <table className="border-b border-gray-500 w-[70vh] ml-28">
                    <tbody>
                      <tr>
                        <td className="w-[35%] detailTitle pl-5">Rescue Service</td>
                        <td className="detailContent">{detail.rescueType}</td>
                      </tr>
                      <tr>
                        <td className="detailTitle">Rescue Address</td>
                        <td className="detailContent">{detail.ulocation}</td>
                      </tr>
                      <tr>
                        <td className="detailTitle">Booking Time</td>
                        <td className="detailContent">{new Date(detail.startTime).toLocaleString("vi-VN")}</td>
                      </tr>
                      <tr>
                        <td className="detailTitle">Finish Time</td>
                        <td className="detailContent">{new Date(detail.endTime).toLocaleString("vi-VN")}</td>
                      </tr>
                      <tr>
                        <td className="detailTitle">App Fee</td>
                        <td className="detailContent">{new Intl.NumberFormat('vi-VN').format(detail.appFee)} {detail.currency}</td>
                      </tr>
                      <tr>
                        <td className="detailTitle">Total Paid</td>
                        <td className="detailContent">{new Intl.NumberFormat('vi-VN').format(detail.totalPrice)} {detail.currency}</td>
                      </tr>
                      <tr>
                        <td className="detailTitle">Payment Method</td>
                        <td className="detailContent">{detail.paymentMethod}</td>
                      </tr>
                      <tr>
                        <td className="detailTitle">Payment Status</td>
                        <td className="detailContent"> {detail.paymentStatus}</td>
                      </tr>
                      <tr>
                        <td className="detailTitle">Rescue Status</td>
                        <td className="detailContent">{detail.reqStatus}</td>
                      </tr>
                      <tr>
                        <td className="detailTitle">Note</td>
                        <td className="detailContent">
                          <span className={detail.cancelNote == "NULL" ? "text-gray-500 italic" : ""}>
                            {detail.cancelNote == "NULL" ? "(None)" : detail.cancelNote}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <table className="border-b border-gray-500 w-[70vh] ml-28">
                    <tbody>
                      <tr>
                        <td className="w-[35%] detailTitle pl-5">Rescue Service</td>
                        <td className="detailContent">{detail.rescueType}</td>
                      </tr>
                      <tr>
                        <td className="detailTitle">Rescue Address</td>
                        <td className="detailContent">{detail.ulocation}</td>
                      </tr>
                      <tr>
                        <td className="detailTitle">Booking Time</td>
                        <td className="detailContent">{new Date(detail.startTime).toLocaleString("vi-VN")}</td>
                      </tr>
                      <tr>
                        <td className="detailTitle">Finish Time</td>
                        <td className="detailContent">{new Date(detail.endTime).toLocaleString("vi-VN")}</td>
                      </tr>
                      <tr>
                        <td className="detailTitle">App Fee</td>
                        <td className="detailContent">{new Intl.NumberFormat('vi-VN').format(detail.appFee)} {detail.currency}</td>
                      </tr>
                      <tr>
                        <td className="detailTitle">
                          Extra Fee (if have)
                          <ul className="pl-10 list-disc">
                            <li>Reason</li>
                            <li>Cost</li>
                          </ul>
                        </td>
                        <td className="detailContent pt-5">
                          <p className="mt-4">{extraSrv.reason}</p>
                          <p className="mt-4">{new Intl.NumberFormat('vi-VN').format(extraSrv.price)} {detail.currency}</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="detailTitle">Total Before Extra Fee</td>
                        <td className="detailContent">{new Intl.NumberFormat('vi-VN').format(detail.totalPrice - extraSrv.price)} {detail.currency}</td>
                      </tr>
                      <tr>
                        <td className="detailTitle">Total Paid</td>
                        <td className="detailContent">{new Intl.NumberFormat('vi-VN').format(detail.totalPrice)} {detail.currency}</td>
                      </tr>
                      <tr>
                        <td className="detailTitle">Payment Method</td>
                        <td className="detailContent">{detail.paymentMethod}</td>
                      </tr>
                      <tr>
                        <td className="detailTitle">Payment Status</td>
                        <td className="detailContent"> {detail.paymentStatus}</td>
                      </tr>
                      <tr>
                        <td className="detailTitle">Rescue Status</td>
                        <td className="detailContent">{detail.reqStatus}</td>
                      </tr>
                      <tr>
                        <td className="detailTitle">Note</td>
                        <td className="detailContent">
                          <span className={detail.cancelNote == "NULL" ? "text-gray-500 italic" : ""}>
                            {detail.cancelNote == "NULL" ? "(None)" : detail.cancelNote}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
                <div className="flex justify-center gap-4 mt-6">
                  {recordStatus && recordStatus.hasFeedbacks && (
                    <button
                      className="bg-blue-400 text-white px-4 py-2 rounded-full"
                      onClick={() => handleViewFeedback(detail)}
                    >
                      Feedback
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white text-[#013171] w-[1000px] rounded-xl p-8 relative">
                <button
                  className="absolute top-4 right-4 text-xl font-bold"
                  onClick={() => setShowFeedback(null)}
                  aria-label="Close feedback detail">
                  ✖
                </button>
                <h2 className="text-center text-2xl font-bold mb-4">Feedback No #{feedback.feedbackId}</h2>
                <FeedbackDetail feedback={feedback} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RescueReQs;
