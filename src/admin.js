import axios from "axios";

export const adminApi = axios.create({
    baseURL: 'http://localhost:9090/api/resq/admin',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
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

export const getAllPartners = () => adminApi.get('/partners');

export const searchPartnersByName = (name) => adminApi.get(`/partners/search/${name}`);

export const getAllCustomers = () => adminApi.get('/customers');