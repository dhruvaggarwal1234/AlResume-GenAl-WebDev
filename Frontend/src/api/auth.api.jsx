import axios from "axios";
import { setAccessToken } from "../utils/token";

const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true, // 🔥 MUST for cookies
});

// LOGIN
export async function login(data) {
  const res = await API.post("/login", data);

  setAccessToken(res.data.accessToken);
  return res.data;
}

// REGISTER
export async function register(data) {
  const res = await API.post("/register", data);
  setAccessToken(res.data.accessToken);

  return res.data;
}

// LOGOUT
export async function logout() {
  const res = await API.post("/logout");
  return res.data;
}