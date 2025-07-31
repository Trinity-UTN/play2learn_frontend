type AlertType = "warning" | "danger" | "info";

export interface ConfirmationConfig {
  title: string;
  message: string;
  type?: AlertType;
  confirmText?: string;
  cancelText?: string;
  showDoubleConfirmation?: boolean;
  doubleConfirmationText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}
