import { createContext, useState } from "react";
import { loginUser } from "../api/authApi";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token"));
  const login = async (formData) => {
    const res = await loginUser(formData);
    setUser(res.data.user);
    setToken(res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.token);
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>); };
