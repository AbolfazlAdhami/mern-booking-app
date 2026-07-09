import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // replaces credentials: "include" everywhere
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — good place for auth headers, logging, etc.
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

// Response interceptor — centralizes error shape + 401 handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || "Something went wrong";

    // Normalize into a plain Error so callers don't need to know about axios
    const normalizedError = new Error(message);

    // Tag it so AppContext / components can special-case auth failures
    (normalizedError as any).status = error.response?.status;

    return Promise.reject(normalizedError);
  },
);
