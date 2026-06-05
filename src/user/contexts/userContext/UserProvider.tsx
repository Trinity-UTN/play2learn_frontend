import { useCallback, useEffect, useState, type ReactNode } from "react";
import { UserContext } from "./UserContext";
import type { UserContextType } from "./UserContext.type";
import { LoginService } from "../../services/login/LoginService";
import type { LoginPayload } from "../../services/login/LoginService";
import { roleLandingRoutes } from "../../services/roleLandingRoutes";
import type { StudentResponseDto } from "@/admin";
import { useHandleApiError, type Role } from "@/shared";
import { decodeToken, type CustomJwtPayload } from "@/user/utils/jwt-helper";
import Cookies from "js-cookie";

export interface AuthState {
  user: CustomJwtPayload | null;
  isAuthenticated: boolean;
  isInitialLoading: boolean;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { handleApiError } = useHandleApiError();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState<CustomJwtPayload | null>(null);
  const [studentData, setStudentData] = useState<
    StudentResponseDto | undefined
  >();

  const logout = useCallback(() => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // Verificar autenticación al montar el componente
  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      const decoded = decodeToken(token);
      // Validar expiración (exp está en segundos)
      if (decoded && decoded.exp * 1000 > Date.now()) {
        setUser(decoded);
        setIsAuthenticated(true);
      } else {
        logout();
        setIsAuthenticated(false);
      }
    }
    setLoading(false);
  }, [logout]);

  const login = async (data: LoginPayload): Promise<string | null> => {
    setLoading(true);
    try {
      const response = await LoginService.loginApi(data);
      
      // 'sameSite: strict' evita ataques CSRF.
      const cookieOptions = {
        expires: 7,
        secure: true,
        sameSite: "strict" as const,
      };
      Cookies.set("accessToken", response.data.accessToken, cookieOptions);
      Cookies.set("refreshToken", response.data.refreshToken, cookieOptions);
      
      const decoded: CustomJwtPayload = decodeToken(response.data.accessToken);

      if (response.data.role === "ROLE_STUDENT") {
        const student = response.data.roleData as StudentResponseDto;
        setStudentData(student);
        setUser({
          ...decoded,
          id: student.id,
        });
      } else {
        setUser(decoded);
      }
      setIsAuthenticated(true);
      return roleLandingRoutes[response.data.role as Role];
    } catch (error) {
      handleApiError(error, "Error al iniciar sesión");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const hasRole = (r: string) => user?.role.includes(r);

  const contextValue: UserContextType = {
    loading,
    user,
    isAuthenticated,
    studentData,
    login,
    logout,
    hasRole,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
