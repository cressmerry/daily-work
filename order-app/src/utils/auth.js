import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", { username, password })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", { username, email, password });
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  return JSON.parse(userStr);
};

const AuthService = {
  login,
  logout,
  register,
  getCurrentUser,
};

export default AuthService;