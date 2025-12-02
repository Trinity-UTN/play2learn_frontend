import type { ChangePassword } from "../../types/ChangePassword";

export interface PasswordContextType {
  loading: boolean;
  changePassword: (data: ChangePassword) => void;
  restorePassword: (type: string, id: number) => void;
}
