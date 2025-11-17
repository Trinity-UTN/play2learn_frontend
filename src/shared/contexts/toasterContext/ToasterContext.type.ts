import type { ToastConfig, ToastPosition } from "../../types/Toaster.type";

export interface ToasterContextType {
  showToast: (config: ToastConfig) => string;
  closeToast: (id: string) => void;
  closeAllToasts: (position?: ToastPosition) => void;
}
