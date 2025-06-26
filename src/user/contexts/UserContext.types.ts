import type { LoginPayload } from "../services/Login/LoginService";

export interface UserContextType {
  loading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginPayload) => Promise<boolean>;
  logout: () => void;
}
