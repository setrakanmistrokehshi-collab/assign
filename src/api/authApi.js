import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers = req.headers || {};
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
// REGISTER
export const registerUser = (formData) =>
  API.post("/register", formData);

// LOGIN
export const loginUser = (formData) =>
  API.post("/login", formData);

// GET ALL USERS (protected)
export const getAllUsers = () =>
  API.get("/");
export default API;