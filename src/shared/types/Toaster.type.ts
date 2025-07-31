export type ToastType = "success" | "error" | "warning" | "update" | "info";
export type ToastPosition =
  | "top-center"
  | "top-right"
  | "bottom-right"
  | "bottom-center";

export interface ToastConfig {
  id?: string;
  title: string;
  message?: string;
  type: ToastType;
  position?: ToastPosition;
  duration?: number; // en milisegundos, 0 = no auto-dismiss
  actionButton?: {
    text: string;
    onClick: () => void;
  };
  onClose?: () => void;
}

export interface Toast
  extends Required<Omit<ToastConfig, "actionButton" | "onClose" | "message">> {
  message?: string; // Declarado de nuevo por si es undefined
  actionButton?: ToastConfig["actionButton"];
  onClose?: ToastConfig["onClose"];
  createdAt: number;
}
