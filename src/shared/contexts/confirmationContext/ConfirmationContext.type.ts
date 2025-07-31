import type { ConfirmationConfig } from "../../types/Confirmation.type";

export interface ConfirmationContextType {
  showConfirmation: (config: ConfirmationConfig) => void;
  closeConfirmation: () => void;
}
