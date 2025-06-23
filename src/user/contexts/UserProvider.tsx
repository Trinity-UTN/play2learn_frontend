import { useState, type ReactNode } from "react";
import { UserContext } from "./UserContext";
import { LogIn } from "../services/LoginService";
import type { Login } from "../types/userTypes";
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  // const [token, setToken] = useState<string>(
  //   () => localStorage.getItem("token") || ""
  // );

  const [isAuthenticated, setIsAuth] = useState<boolean>(
    localStorage.getItem("token") ? true : false
  );

  //login
  const login = async (data: Login) => {
    setLoading(true);
    try {
      const respuesta = await LogIn(data);
      localStorage.setItem("token", respuesta.data.token);
      setIsAuth(true);
      return true;
    } catch (error) {
      console.error("Error al obtener Logines:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    setIsAuth(false);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ login, loading, isAuthenticated, logout }}>
      {children}
    </UserContext.Provider>
  );
};
