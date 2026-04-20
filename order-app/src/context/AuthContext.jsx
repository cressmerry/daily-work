import { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../utils/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const currUser = AuthService.getCurrentUser();
    setUser(currUser);
  }, []);

  const login = async (username, password) => {
    const data = await AuthService.login(username, password);
    setUser(data);
    return data;
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);