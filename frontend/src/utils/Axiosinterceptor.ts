import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

// Extend the request config so we can flag "already retried" requests
interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface RefreshResponse {
  accessToken: string;
}

interface QueuedRequest {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

// ---------------------------------------------------------------------------
// 1. Create a dedicated axios instance (don't intercept the global axios)
// ---------------------------------------------------------------------------
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env?.VITE_API_BASE_URL ?? "https://api.example.com",
  timeout: 15000,
});

// ---------------------------------------------------------------------------
// 2. Token helpers (swap these for your actual auth storage)
// ---------------------------------------------------------------------------
const getAccessToken = (): string | null => localStorage.getItem("accessToken");
const getRefreshToken = (): string | null => localStorage.getItem("refreshToken");
const setAccessToken = (token: string): void => localStorage.setItem("accessToken", token);
const clearTokens = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// ---------------------------------------------------------------------------
// 3. Request interceptor — attach auth header, logging, etc.
// ---------------------------------------------------------------------------
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    if (import.meta.env?.DEV) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// ---------------------------------------------------------------------------
// 4. Response interceptor — handle 401 with token refresh + request queueing
// ---------------------------------------------------------------------------

let isRefreshing = false;
let pendingQueue: QueuedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null): void => {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error || !token) reject(error);
    else resolve(token);
  });
  pendingQueue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (!error.response || !originalRequest) {
      return Promise.reject(error);
    }

    const { status } = error.response;

    // ---- Handle 401: try to refresh the token once ----
    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.set("Authorization", `Bearer ${token}`);
          return api(originalRequest as AxiosRequestConfig);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token available");

        const { data } = await axios.post<RefreshResponse>(`${api.defaults.baseURL}/auth/refresh`, { refreshToken });

        setAccessToken(data.accessToken);
        api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
        processQueue(null, data.accessToken);

        originalRequest.headers.set("Authorization", `Bearer ${data.accessToken}`);
        return api(originalRequest as AxiosRequestConfig);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearTokens();
        // Optional: redirect to login
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // ---- Handle other common statuses ----
    if (status === 403) {
      console.error("Forbidden: insufficient permissions");
    } else if (status === 429) {
      console.error("Rate limited — consider retry with backoff");
    } else if (status >= 500) {
      console.error("Server error:", error.response.data);
    }

    return Promise.reject(error);
  },
);

export default api;
