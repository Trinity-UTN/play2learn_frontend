import type { ChangePassword } from "../../types/ChangePassword";

export interface PasswordContextType {
  loading: boolean;
  changePassword: (data: ChangePassword) => void;
}
