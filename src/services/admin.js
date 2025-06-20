import axios from "axios";

//Get Discount List

export const getAllDiscount = async () => {
   try {
         const token = localStorage.getItem("token");

      if (!token) {
         console.error("Token không tồn tại.");
         return [];
      }
      const responseDis = await axios.get("http://localhost:9090/admin/discount", {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });


      const discounts = responseDis.data.data;
      console.log("Discounts: ", discounts);
      return discounts
   }catch(error){
      console.error("Lối khi lấy danh sách discounts: ", error);
      return [];
   }
};

//Report
export const getAllReport = async () => {
   try {
      const token = localStorage.getItem("token");

      if (!token) {
         console.error("Token không tồn tại.");
         return [];
      } 

      const responseRep = await axios.get("http://localhost:9090/admin/report", {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });

      const reports = responseRep.data.data;
      console.log("Reports: ", reports);
      return reports;
   } catch (error) {
      console.error("Lỗi khi lấy danh sách report: ", error);
      return [];
   }
};



export const resolveReport = (id, payload) => {
  const token = localStorage.getItem("token"); 

  return axios.put(`http://localhost:9090/admin/report/${id}/resolve`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};


export const getSearchUsers = async (keyword) => {
   try {
      const token = localStorage.getItem("token");

      if (!token) {
         console.error("Token không tồn tại.");
         return [];
      }

      const response = await axios.get("http://localhost:9090/admin/report/users/search", {
         params: { keyword }, // Gửi từ khóa tìm kiếm
         headers: {
            Authorization: `Bearer ${token}`
         }
      });

      const users = response.data.data; // Assuming `data` contains the list of users
      console.log("Users: ", users);
      return users;
   } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng: ", error);
      return [];
   }
};

export const getSearchPartners = async (keyword) => {
   try {
      const token = localStorage.getItem("token");

      if (!token) {
         console.error("Token không tồn tại.");
         return [];
      }

      const response = await axios.get("http://localhost:9090/admin/report/partners/search", {
         params: { keyword }, // Gửi từ khóa tìm kiếm
         headers: {
            Authorization: `Bearer ${token}`
         }
      });

      const partners = response.data.data; // Assuming `data` contains the list of partners
      console.log("Partners: ", partners);
      return partners;
   } catch (error) {
      console.error("Lỗi khi lấy danh sách đối tác: ", error);
      return [];
   }
};

//Sesvices
export const getAllService = async () => {
   try {
      const token = localStorage.getItem("token");

      if (!token) {
         console.error("Token không tồn tại.");
         return [];
      }

      const responseService = await axios.get("http://localhost:9090/admin/service", {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });

      const services = responseService.data.data;
      console.log("Services: ", services);
      return services;
   } catch (error) {
      console.error("Lỗi khi lấy danh sách services: ", error);
      return [];
   }
};


export const getServiceById = async (id) => {
   try {
      const token = localStorage.getItem("token");

      if (!token) {
         console.error("Token không tồn tại.");
         return null;
      }

      const response = await axios.get(`http://localhost:9090/admin/service/${id}`, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });

      const service = response.data.data;
      console.log("Service detail: ", service);
      return service;

   } catch (error) {
      console.error(`Lỗi khi lấy service với id = ${id}: `, error);
      return null;
   }
};

export const updateServicePrice = async (id, updatedPrices) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token không tồn tại.");
      return null;
    }

    const response = await axios.put(
      `http://localhost:9090/admin/service/${id}/update-price`,
      updatedPrices, // object { fixedPrice, pricePerKm }
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    const updatedService = response.data.data;
    console.log("Updated service:", updatedService);
    return updatedService;

  } catch (error) {
    console.error(`Lỗi khi cập nhật giá dịch vụ với id = ${id}: `, error);
    return null;
  }
};
export const searchService = async (keyword) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token không tồn tại.");
      return [];
    }

    const response = await axios.get(
      `http://localhost:9090/admin/service/search/${keyword}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error(`Lỗi khi tìm kiếm dịch vụ với từ khóa "${keyword}":`, error);
    return [];
  }
};
export const filterServiceByType = async (type) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token không tồn tại.");
      return [];
    }

    const response = await axios.get(
      `http://localhost:9090/admin/service/filter/${encodeURIComponent(type)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error(`Lỗi khi lọc dịch vụ theo loại "${type}":`, error);
    return [];
  }
};

// Partner


// Revenue
export const getTotal = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token doesn't exist.");
      return 0;
    }

    const response = await axios.get(
      "http://localhost:9090/admin/dashboard/revenue/total",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const revenueData = response.data.data;
    console.log("Revenue Data:", revenueData);
    return revenueData;
  } catch (error) {
    console.error("Errors revenue report:", error);
    return 0;
  }
};
export const getTotalLastMonth = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token does not exist.");
      return 0;
    }

    const response = await axios.get(
      "http://localhost:9090/admin/dashboard/revenue/last-month",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Kiểm tra dữ liệu trả về hợp lệ
    if (response.data && response.data.status === 200) {
      const revenueData = response.data.data;
      console.log("Revenue Data:", revenueData);
      return revenueData;
    } else {
      console.warn("Unexpected response format:", response.data);
      return 0;
    }
  } catch (error) {
    console.error("Error fetching revenue report:", error);
    return 0;
  }
};
export const getRescue = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token doesn't exist.");
      return 0;
    }

    const response = await axios.get(
      "http://localhost:9090/admin/dashboard/rescue/this-month",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const rescueData = response.data.data;
    console.log("Rescue Data:", rescueData);
    return rescueData;
  } catch (error) {
    console.error("Error fetching rescue report:", error);
    return 0;
  }
};
export const getRescueLastMonth = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token doesn't exist.");
      return 0;
    }

    const response = await axios.get(
      "http://localhost:9090/admin/dashboard/rescue/last-month",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data && response.data.status === 200) {
      const rescueData = response.data.data;
      console.log("Rescue Data:", rescueData);
      return rescueData;
    } else {
      console.warn("Unexpected response format or error status:", response.data);
      return 0;
    }
  } catch (error) {
    console.error("Error fetching rescue report:", error);
    return 0;
  }
};
export const getCustomer = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authorization token is missing.");
      return null;
    }

    const response = await axios.get(
      "http://localhost:9090/admin/dashboard/customer/this-month",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 && response.data?.data) {
      const customerData = response.data.data;
      console.log("Customer Data This Month:", customerData);
      return customerData;
    } else {
      console.warn("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error("Error fetching customer data:", error.response?.data || error.message);
    return null;
  }
};
export const getCustomerLastMonth = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authorization token is missing.");
      return null;
    }

    const response = await axios.get(
      "http://localhost:9090/admin/dashboard/customer/last-month",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const customerData = response.data?.data;

    if (response.status === 200 && customerData !== undefined) {
      console.log("Customer Data Last Month:", customerData);
      return customerData;
    } else {
      console.warn("Unexpected response format or status code:", response);
      return null;
    }
  } catch (error) {
    console.error("Error fetching customer data (last month):", error.response?.data || error.message);
    return null;
  }
};
export const getReturnCustomer = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Authorization token is missing.");
    return null;
  }

  try {
    const response = await axios.get(
      "http://localhost:9090/admin/dashboard/customer/returning-this-month",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data?.data;

    if (response.status === 200 && data !== undefined) {
      console.log("Returning Customer Count This Month:", data);
      return data;
    } else {
      console.warn("Unexpected API response:", response);
      return null;
    }
  } catch (error) {
    console.error(
      "Error fetching returning customer data:",
      error.response?.data || error.message
    );
    return null;
  }
};


export const getReturnCustomerLastMonth = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Authorization token is missing.");
    return null;
  }

  try {
    const response = await axios.get(
      "http://localhost:9090/admin/dashboard/customer/returning-last-month",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data?.data;

    if (response.status === 200 && data !== undefined) {
      console.log("Returning Customer Count Last Month:", data);
      return data;
    } else {
      console.warn("Unexpected API response format or status code:", response);
      return null;
    }
  } catch (error) {
    console.error(
      "Error fetching returning customer count (last month):",
      error.response?.data || error.message
    );
    return null;
  }
};

export const fetchDailyRescueData = async (dateStr) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not found in localStorage.");
    return { towing: 0, repairOnSite: 0, driverReplacement: 0 };
  }

  try {
    const res = await axios.get(
      `http://localhost:9090/admin/dashboard/rescue/daily?date=${dateStr}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = res.data?.data;
    console.log("Daily Rescue Data:", data);
    return data || { towing: 0, repairOnSite: 0, driverReplacement: 0 };
  } catch (err) {
    console.error("Error fetching daily rescue data:", err);
    return { towing: 0, repairOnSite: 0, driverReplacement: 0 };
  }
};
export const fetchRangeRescueData = async (start, end) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not found in localStorage.");
    return { towing: 0, repairOnSite: 0, driverReplacement: 0 };
  }

  try {
    const res = await axios.get(
      `http://localhost:9090/admin/dashboard/rescue/range?start=${start}&end=${end}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = res.data?.data;
    console.log(`Rescue Range Data (${start} → ${end}):`, data);
    return data || { towing: 0, repairOnSite: 0, driverReplacement: 0 };
  } catch (err) {
    console.error(`Error fetching rescue range data:`, err);
    return { towing: 0, repairOnSite: 0, driverReplacement: 0 };
  }
};


export const getRevenueBChart = async (start, end) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token isn't exists.");
      return [];
    }

    const response = await axios.post(
      "http://localhost:9090/admin/dashboard/revenue",
      { start, end },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const revenueData = response.data.data;
    console.log("Revenue Data:", revenueData);
    return revenueData;
  } catch (error) {
    console.error("Errors revenue report:", error);
    return [];
  }
};


//Report


// Documentary
export const getPartnerDocumentary = async (partnerId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token không tồn tại.");
      return [];
    }

    const response = await axios.get(
      `http://localhost:9090/admin/documentary/partner/${partnerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error(`Lỗi khi lấy documentary của đối tác có ID ${partnerId}:`, error);
    return [];
  }
};


//Vehicle


