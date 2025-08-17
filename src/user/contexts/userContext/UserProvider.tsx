import { useEffect, useState, type ReactNode } from "react";
import { UserContext } from "./UserContext";
import type { UserContextType } from "./UserContext.type";
import { LoginService } from "../../services/Login/LoginService";
import type { LoginPayload } from "../../services/Login/LoginService";
import type { Role } from "../../../shared/utils/ProtectedRoute";
import { roleLandingRoutes } from "../../services/roleLandingRoutes";
import AuthService from "../../services/auth/AuthService";
import { useToaster } from "../../../shared/hooks/useToaster";
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { showToast } = useToaster();
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState<Role>(localStorage.getItem("role") as Role);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("token") ? true : false
  );
  const authService = AuthService.getInstance();
  useEffect(() => {
    authService.setOnSessionExpiredCallback(() => setIsAuthenticated(false));
  }, []);

  const login = async (data: LoginPayload): Promise<string | null> => {
    setLoading(true);
    try {
      const response = await LoginService.loginApi(data);
      const userRole = response.data.role as Role;

      authService.setTokens(
        response.data.accessToken,
        response.data.refreshToken
      );

      localStorage.setItem("role", response.data.role);

      setIsAuthenticated(true);
      setRole(response.data.role);

      return roleLandingRoutes[userRole];
    } catch (error) {
      showToast({
        title: "Inicio de Sesión Incorrecto",
        message: "Credenciales invalidas.",
        type: "error",
        position: "top-right",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    authService.logout();
    setIsAuthenticated(false);
  };

  //FUNCION QUE DEVUELVE EL ROL PARA VALIDACIONES MAS CONCRETAS
  const hasRole = (allowed: Role[]): boolean => {
    if (!role) return false;
    return allowed.includes(role);
  };

  const contextValue: UserContextType = {
    loading,
    isAuthenticated,
    login,
    logout,
    role,
    hasRole,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
