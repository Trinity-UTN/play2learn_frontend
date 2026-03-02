import type { LoginPayload } from "../../services/login/LoginService";
// import type { UserResponseDto } from "../../services/login/LoginService";
import type { StudentResponseDto } from "@/admin";
import type { CustomJwtPayload } from "@/user/utils/jwt-helper";

export interface UserContextType {
  loading: boolean;
  user: CustomJwtPayload | null;
  isAuthenticated: boolean;
  studentData: StudentResponseDto | undefined;
  login: (data: LoginPayload) => Promise<string | null>;
  logout: () => void;
  hasRole: (role: string) => void;
}
