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
   } catch (error) {
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

//Services
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



