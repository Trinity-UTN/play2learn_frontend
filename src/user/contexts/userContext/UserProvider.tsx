import { useState, type ReactNode } from "react";
import { UserContext } from "./UserContext";
import type { UserContextType } from "./UserContext.type";
import { LoginService } from "../../services/login/LoginService";
import type { LoginPayload } from "../../services/login/LoginService";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("token") ? true : false
  );

  const login = async (data: LoginPayload): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await LoginService.loginApi(data);
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Error al obtener Logines:", error); // TODO: REMOVE_DEBUG
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  const contextValue: UserContextType = {
    loading,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
