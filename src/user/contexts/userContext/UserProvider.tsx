import { useEffect, useState, type ReactNode } from "react";
import { UserContext } from "./UserContext";
import type { StudentResponseDto } from "../../../admin/services/student/StudentService";
import type { UserContextType } from "./UserContext.type";
import {
  LoginService,
  type UserResponseDto,
} from "../../services/login/LoginService";
import type { LoginPayload } from "../../services/login/LoginService";
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
  const [user, setUser] = useState<UserResponseDto | null>(null);
  const [role, setRole] = useState<Role>(localStorage.getItem("role") as Role);
  const [studentData, setStudentData] = useState<
    StudentResponseDto | undefined
  >();
  // const [teacherData, setTeacherData] = useState<TeacherResponseDto | null>(null);
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

      setUser(response.data);
      setRole(response.data.role);

      if (userRole === "ROLE_STUDENT") {
        setStudentData(response.data.roleData as StudentResponseDto);
      } else if (userRole === "ROLE_TEACHER") {
        // TODO: Agregar setCurrentTeacher en prox sprint
      }

      setIsAuthenticated(true);
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
    setUser(null);
    setIsAuthenticated(false);
  };

  //FUNCION QUE DEVUELVE EL ROL PARA VALIDACIONES MAS CONCRETAS
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
