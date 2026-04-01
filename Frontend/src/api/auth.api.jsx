import API from "./axios";
import { setAccessToken } from "../utils/token";


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