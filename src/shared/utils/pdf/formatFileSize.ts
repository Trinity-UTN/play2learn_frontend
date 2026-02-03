/**
 * Crea una interfaz para formatear el tamaño de un archivo en formato legible.
 *
 * @param {number} bytes - Tamaño del archivo en bytes.
 * @returns {string} - Tamaño del archivo en formato "bytes", "KB" o "MB".
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};
