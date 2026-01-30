import { useState, useCallback } from "react";
import axios from "axios";
import { useHandleApiError } from "@/shared/hooks";

interface UseFileDownloaderReturn {
  downloadFile: (url: string, fileName?: string) => Promise<void>;
  isDownloading: boolean;
  error: Error | null;
}

/**
 * Hook personalizado para manejar la descarga de archivos.
 * Utiliza axios para realizar la petición y blob para el manejo del archivo.
 *
 * @returns {UseFileDownloaderReturn} Objeto con la función de descarga y los estados.
 */
export const useFileDownloader = (): UseFileDownloaderReturn => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { handleApiError } = useHandleApiError();

  const downloadFile = useCallback(
    async (url: string, fileName: string = "download") => {
      setIsDownloading(true);
      setError(null);

      try {
        const response = await axios.get(url, {
          responseType: "blob",
        });

        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();

        // Limpieza
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } catch (err: unknown) {
        const errorMsg =
          err instanceof Error
            ? err.message
            : "Error desconocido al descargar el archivo";
        const errorObj = err instanceof Error ? err : new Error(errorMsg);

        setError(errorObj);

        handleApiError(err, "Error en la descarga");

        // Comportamiento de respaldo (fallback)
        window.open(url, "_blank", "noopener,noreferrer");
      } finally {
        setIsDownloading(false);
      }
    },
    [handleApiError],
  );

  return { downloadFile, isDownloading, error };
};
