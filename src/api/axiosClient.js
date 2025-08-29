import axios from "axios";

const baseURL = "http://localhost:8000/api";
//const baseURL = `${import.meta.env.VITE_API_URL}/api`;

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => {
    const axiosData = response.data;
    return axiosData?.pagination ? axiosData : axiosData.data;
  },
  (error) => {
    const message =
      error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.";
    console.error("API error:", message);
    return Promise.reject(error);
  }
);

export default axiosClient;
