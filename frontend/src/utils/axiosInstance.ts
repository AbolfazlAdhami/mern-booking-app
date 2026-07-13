/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data?.message;
    let message = "Somthing is wrong";

    if (typeof data == "string") {
      message = data;
    } else if (Array.isArray(data)) {
      message = data.map((e: any) => e.msg || e.message).join(", ");
    } else if (error.message) {
      message = error.message;
    }

    const normalizedError = new Error(message);
    (normalizedError as any).status = error.response?.status;

    return Promise.reject(normalizedError);
  },
);
