import axios from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "../utils/token";

const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true, // 🔥 needed for cookies
});

// 🔐 Attach token
API.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔁 Refresh logic
API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await API.post("/refresh"); // 👈 your backend

        const newToken = res.data.accessToken;

        setAccessToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return API(originalRequest);
      } catch (error) {
        clearAccessToken();
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);

export default API;