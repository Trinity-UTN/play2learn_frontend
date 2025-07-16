import type { GetPaginated } from "../types/PaginacionType";

// Función para limpiar parámetros de paginación para evitar enviar valores vacíos
export function buildCleanPaginatedParams(
  params: GetPaginated
): Record<string, any> {
  const allowedKeys: (keyof GetPaginated)[] = [
    "page",
    "page_size",
    "order_by",
    "order_type",
    "search",
    "filters",
    "filtersValues",
  ];

  const result: Record<string, any> = {};

  for (const key of allowedKeys) {
    const value = params[key];
    if (
      value !== undefined &&
      value !== null &&
      (typeof value !== "string" || value.trim() !== "") &&
      (!Array.isArray(value) || value.length > 0)
    ) {
      result[key as string] = value;
    }
  }

  return result;
}
