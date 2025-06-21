import React, { useState, useEffect } from "react";
import "../../../../styles/admin/feedback.css";
import { feedbackAPI } from "../../../../admin";

const MainFeedback = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Số feedback mỗi trang

  const fetchFeedbacks = async () => {
    try {
      const response = await feedbackAPI.getAllFeedbacks();
      setFeedbacks(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Cannot get feedbacks: " + error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFeedbacks = feedbacks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="overflow-x-auto">
      <table className="mx-14 mt-10 w-[130vh] border border-separate border-spacing-0 border-[#D8D8D8] rounded-2xl">
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="9" className="text-center">Loading...</td>
            </tr>
          ) : (
            <>
              <tr>
                <td className="font-raleway tableHead">No.</td>
                {currentFeedbacks.map((_, index) => (
                  <td key={index} className="font-lexend tableContent text-center">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="font-raleway tableHead">Request Rescue No.</td>
                {currentFeedbacks.map((feedback, index) => (
                  <td key={index} className="font-lexend tableContent text-center">{feedback.rrId}</td>
                ))}
              </tr>
              <tr>
                <td className="font-raleway tableHead">Rescue Rate</td>
                {currentFeedbacks.map((feedback, index) => (
                  <td key={index} className="font-lexend tableContent">
                    <div className="flex items-center">
                      {[...Array(feedback.rateRequest)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118l-3.39-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                        </svg>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="font-raleway tableHead">Feedback For Request</td>
                {currentFeedbacks.map((feedback, index) => (
                  <td key={index} className="font-lexend tableContent">{feedback.feedbackRequest ? feedback.feedbackRequest : "-"}</td>
                ))}
              </tr>
              <tr>
                <td className="font-raleway tableHead">Customer</td>
                {currentFeedbacks.map((feedback, index) => (
                  <td key={index} className="font-lexend tableContent">{feedback.userName}</td>
                ))}
              </tr>
              <tr>
                <td className="font-raleway tableHead">Customer's Rate</td>
                {currentFeedbacks.map((feedback, index) => (
                  <td key={index} className="font-lexend tableContent">
                    <div className="flex items-center">
                      {[...Array(feedback.rateCustomer)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118l-3.39-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                        </svg>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="font-raleway tableHead">Feedback For Customer</td>
                {currentFeedbacks.map((feedback, index) => (
                  <td key={index} className="font-lexend tableContent">{feedback.feedbackCustomer ? feedback.feedbackCustomer : "-"}</td>
                ))}
              </tr>
              <tr>
                <td className="font-raleway tableHead">Partner</td>
                {currentFeedbacks.map((feedback, index) => (
                  <td key={index} className="font-lexend tableContent">{feedback.partnerName}</td>
                ))}
              </tr>
              <tr>
                <td className="font-raleway tableHead">Partner's Rate</td>
                {currentFeedbacks.map((feedback, index) => (
                  <td key={index} className="font-lexend tableContent">
                    <div className="flex items-center">
                      {[...Array(feedback.ratePartner)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118l-3.39-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                        </svg>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="font-raleway tableHead">Feedback For Partner</td>
                {currentFeedbacks.map((feedback, index) => (
                  <td key={index} className="font-lexend tableContent">{feedback.feedbackPartner ? feedback.feedbackPartner : "-"}</td>
                ))}
              </tr>
            </>
          )}
        </tbody>
      </table>

      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2 items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <img
              src={`/images/icon-web/${currentPage === 1 ? "Back To" : "Back To1"}.png`}
              alt="Back"
              className="w-9"
            />
          </button>
          <span className="px-3 py-2 font-semibold text-lg">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage >= totalPages}
          >
            <img
              src={`/images/icon-web/${currentPage >= totalPages ? "Next page" : "Next page1"}.png`}
              alt="Next"
              className="w-9"
            />
          </button>
        </div>
      )}

    </div>
  );
};

export default MainFeedback;
