import axios from "axios";

// ── Base URL — switches between dev and production ────────────────
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Request interceptor — log requests in development ─────────────
api.interceptors.request.use((config) => {
  if (import.meta.env.DEV) {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
  }
  return config;
});

// ── Response interceptor — handle errors globally ─────────────────
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("[API Error]", error.message);
    return Promise.reject(error);
  }
);

// ── Business endpoints ────────────────────────────────────────────
export const businessAPI = {
  getByPhone: (phone) =>
    api.get(`/businesses/${encodeURIComponent(phone)}`),

  register: (data) =>
    api.post("/businesses", data),
};

// ── Transaction endpoints ─────────────────────────────────────────
export const transactionAPI = {
  getAll: (businessId, limit = 50, offset = 0) =>
    api.get(`/api/transactions/${businessId}`, {
      params: { limit, offset },
    }),

  getTodaySummary: (businessId) =>
    api.get(`/api/summary/${businessId}/today`),
};

// ── Stock endpoints ───────────────────────────────────────────────
export const stockAPI = {
  getLevels: (businessId) =>
    api.get(`/api/stock/${businessId}`),
};

// ── Health check ──────────────────────────────────────────────────
export const healthAPI = {
  check: () => api.get("/health"),
};

export default api;