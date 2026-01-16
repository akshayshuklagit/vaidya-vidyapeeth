import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
    if (auth.sessionId) {
      config.headers["x-session-id"] = auth.sessionId;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "SESSION_EXPIRED"
    ) {
      console.warn("❌ Session expired → logged in from another device");

      // 🔔 Inform app (DO NOT logout here)
      window.dispatchEvent(
        new CustomEvent("session-expired", {
          detail: {
            reason: "Logged in from another device",
          },
        })
      );
    }

    return Promise.reject(error);
  }
);

export default api;
