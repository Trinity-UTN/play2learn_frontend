import { useEffect, useState, type ReactNode } from "react";
import { UserContext } from "./UserContext";
import type { UserContextType } from "./UserContext.type";
import {
  LoginService,
  type UserResponseDto,
} from "../../services/login/LoginService";
import type { LoginPayload } from "../../services/login/LoginService";
import AuthService from "../../services/auth/AuthService";
import { roleLandingRoutes } from "../../services/roleLandingRoutes";
import type { StudentResponseDto } from "../../../admin/services/student/StudentService";
import type { Role } from "../../../shared/utils/ProtectedRoute";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { handleApiError } = useHandleApiError();
  const authService = AuthService.getInstance();

  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserResponseDto | null>(null);
  const [role, setRole] = useState<Role>(authService.getRole() as Role);
  const [studentData, setStudentData] = useState<
    StudentResponseDto | undefined
  >();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Verificar autenticación al montar el componente
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Verificar si hay un token válido
        const accessToken = authService.getAccessToken();
        const storedRole = authService.getRole() as Role;

        if (accessToken && storedRole) {
          await authService.getValidAccessToken();

          setRole(storedRole);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        handleApiError(error, "Sesión expirada o inválida");
        setIsAuthenticated(false);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [authService]);

  useEffect(() => {
    authService.setOnSessionExpiredCallback(() => {
      setIsAuthenticated(false);
      setUser(null);
    });
  }, [authService]);

  const login = async (data: LoginPayload): Promise<string | null> => {
    setLoading(true);
    try {
      const response = await LoginService.loginApi(data);
      const userRole = response.data.role as Role;

      authService.setTokens(
        response.data.accessToken,
        response.data.refreshToken
      );
      authService.setRole(response.data.role);

      setUser(response.data);
      setRole(response.data.role);

      if (userRole === "ROLE_STUDENT") {
        const student = response.data.roleData as StudentResponseDto;
        setStudentData(student);
      } else if (userRole === "ROLE_TEACHER") {
        // TODO: Agregar setCurrentTeacher en prox sprint
      }

      setIsAuthenticated(true);
      return roleLandingRoutes[userRole];
    } catch (error) {
      handleApiError(error, "Error al iniciar sesión");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    authService.logout();
    setUser(null);
    setStudentData(undefined);
    setIsAuthenticated(false);
  };

  const hasRole = (allowed: Role[]): boolean => {
    if (!role) return false;
    return allowed.includes(role);
  };

  const contextValue: UserContextType = {
    loading,
    user,
    role,
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
