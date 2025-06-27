import axios from "axios";

export const adminApi = axios.create({
  baseURL: 'http://localhost:9090/api/resq/admin',
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

/*PARTNER*/
export const partnerAPI = {
  getAllPartners: () => adminApi.get('/partners'),
  search: (keyword) => adminApi.get(`/partners/searchPartners/${keyword}`),
  findById: (partnerId) => adminApi.get(`/partners/findPartnerById/${partnerId}`),
  dashboard: (partnerId) => adminApi.get(`/partners/partnerDashboard/${partnerId}`),
  approveParnter: (partnerId) => adminApi.get(`/partners/approvePartner/${partnerId}`)
};

/*USER*/
export const userAPI = {
  findById: (id) => adminApi.get(`/users/${id}`),
}


/*STAFF*/
export const staffAPI = {
  getStaffs: () => adminApi.get('/staffs'),
  searchStaff: (keyword) => adminApi.get(`/staffs/searchStaffs/${keyword}`),
  createNew: (data) => adminApi.post('/staffs/createStaff', data),
  updateStaff: (staffId, data) => adminApi.put(`/staffs/${staffId}`, data)
};


/*MANAGER*/
export const managerAPI = {
  getManagers: () => adminApi.get('/managers'),
  searchManager: (keyword) => adminApi.get(`/managers/searchManagers/${keyword}`),
  createNew: (data) => adminApi.post('/managers/createManager', data),
  updateManager: (managerId, data) => adminApi.put(`/managers/${managerId}`, data)
}

/*CUSTOMER*/
export const customerAPI = {
  getAllCustomers: () => adminApi.get('/customers'),
  findCustomerById: (customerId) => adminApi.get(`/customer/searchCustomerById/${customerId}`),
  search: (keyword) => adminApi.get(`/customers/searchCustomers/${keyword}`),
  dashboard: (userId) => adminApi.get(`/customers/customerDashboard/${userId}`),
  createNew: (data) => adminApi.post('/customers/createCustomer', data),
}

/*FEEDBACK*/
export const feedbackAPI = {
  getAllFeedbacks: () => adminApi.get('/feedbacks'),
  findFeedbacksByPartner: (partId) => adminApi.get(`/feedbacks/searchFeedbackByPartner/${partId}`),
  findFeedbacksByReqResQ: (rrId) => adminApi.get(`/feedbacks/searchFeedbackByRR/${rrId}`),
  averageRate: (partnerId) => adminApi.get(`/feedbacks/averageRate/${partnerId}`)
}

/*REQUEST RESQ*/
export const reqResQsAPI = {
  getAllReqResQs: () => adminApi.get('/reqResQs'),
  findReqResQsByPartner: (partId) => adminApi.get(`/reqResQs/searchByPartner/${partId}`),
  findReqResQsByUser: (userId) => adminApi.get(`/reqResQs/searchByUser/${userId}`), //Rescue Calls - Partner
  searchWithPartner: (keyword, partId) => adminApi.get(`/reqResQs/searchWithPartner/${partId}/${keyword}`), //History - User
  findReqResQById: (rrId) => adminApi.get(`/reqResQs/${rrId}`), //Detail Request Rescue
  searchCustomer: (userId, keyword) => adminApi.get(`/reqResQs/searchWithUser/${userId}/${keyword}`),
  searchRequestResQ: (keyword) => adminApi.get(`/reqResQs/searchRequestResQ/${keyword}`),
  relatedRecordCheck: (rrId) => adminApi.get(`/reqResQs/existedRecords/${rrId}`),
  createNew: (data) => adminApi.post('/reqResQs/createRequest', data),
  updateRequest: (requestId, data) => adminApi.put(`/reqResQs/${requestId}`, data)
}

/*SERVICE*/
export const serviceAPI = {
  findBySrvType: (srvType) => adminApi.get(`/services/searchBySrvType/${srvType}`),
}

/*EXTRA SERVICE*/
export const extraSrvAPI = {
  findExtrasByResResQ: (rrId) => adminApi.get(`/extraSrv/searchByReqResQ/${rrId}`),
}

/*PAYMENT*/
export const paymentAPI = {
  customerPayments: (customerId) => adminApi.get(`/payments/getCustomerPayments/${customerId}`),
}

/*REQUEST SERVICE*/
export const requestSrvAPI = {
  getRequestServices: (rrId) => adminApi.get(`/requestServices/getByResquest/${rrId}`),
}

/*PERSONAL DATA*/
export const personalDataAPI = {
  getUnverifiedUserData: (customerId) => adminApi.get(`/personalDatas/getUnverifiedUserData/${customerId}`),
  approveCustomer:(customerId) => adminApi.put(`/personalDatas/approvedCustomer/${customerId}`),
  rejectCustomer:(customerId, rejectData) => adminApi.put(`/personalDatas/rejectedCustomer/${customerId}`, rejectData),
}

/*DOCUMENT*/
export const documentAPI = {
  getUnverifiedPartnerDoc: (partnerId) => adminApi.get(`/documents/getUnverifiedPartnerDoc/${partnerId}`),
  updatePartnerDoc: (partnerId, rejectData) => adminApi.put(`/documents/updatePartnerDoc/${partnerId}`, rejectData)
}