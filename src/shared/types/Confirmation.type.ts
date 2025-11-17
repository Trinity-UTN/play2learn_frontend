type AlertType = "warning" | "danger" | "info";

export interface ConfirmationConfig {
  title: string;
  message: string;
  type?: AlertType;
  confirmText?: string;
  cancelText?: string;
  rules?: string[];
  showRulesIcon?: boolean;
  hideCancel?: boolean;
  showDoubleConfirmation?: boolean;
  doubleConfirmationText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}
