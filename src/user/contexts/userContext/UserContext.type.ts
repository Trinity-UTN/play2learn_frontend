import type { LoginPayload } from "../../services/login/LoginService";
import type { Role } from "../../../shared/utils/ProtectedRoute";
import type { UserResponseDto } from "../../services/login/LoginService";
import type { StudentResponseDto } from "../../../admin/services/student/StudentService";

export interface UserContextType {
  loading: boolean;
  user: UserResponseDto | null;
  role: Role;
  isAuthenticated: boolean;
  studentData: StudentResponseDto | undefined;
  login: (data: LoginPayload) => Promise<string | null>;
  logout: () => void;
  hasRole: (allowed: Role[]) => boolean;
}
