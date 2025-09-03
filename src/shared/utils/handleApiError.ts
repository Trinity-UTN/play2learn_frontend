// shared/utils/handleApiError.ts
import { AxiosError } from "axios";
import { showToast } from "../components/Toast"; // ajustá según tu estructura real

interface ErrorOptions {
  showAsToast?: boolean; // por si querés sólo loguear en consola (p.ej. en desarrollo)
  customMessage?: string;
}

export const handleApiError = (
  error: unknown,
  options: ErrorOptions = {}
): void => {
  const { showAsToast = true, customMessage } = options;

  let title = "Error inesperado";
  let message = "Ocurrió un error inesperado. Intenta nuevamente.";

  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;
    const status = axiosError.response?.status;
    const data = axiosError.response?.data;

    // Analizar el error del backend
    if (typeof data?.message === "string") {
      message = data.message;
    } else if (typeof data === "string") {
      message = data;
    }

    // Personalizar según código de estado si es necesario
    switch (status) {
      case 400:
        title = "Solicitud inválida";
        break;
      case 401:
        title = "No autorizado";
        break;
      case 403:
        title = "Acceso denegado";
        break;
      case 404:
        title = "Recurso no encontrado";
        break;
      case 409:
        title = "Conflicto";
        break;
      case 500:
        title = "Error del servidor";
        break;
      default:
        title = "Error";
    }
  }

  if (customMessage) {
    message = customMessage;
  }

  if (showAsToast) {
    showToast({
      title,
      message,
      type: "error",
      position: "bottom-right",
    });
  }

  // Para debugging en dev (solo si no lo vas a borrar completamente)
  if (process.env.NODE_ENV === "development") {
    console.error(error); // TODO: REMOVE_DEBUG (si querés borrarlo igual)
  }
};

// Helper
const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError)?.isAxiosError === true;
};
