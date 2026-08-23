/**
 * Patrones de diseño aplicados en este archivo:
 *
 * 1. Facade (GoF): expone una interfaz simple (`getItem` / `setItem` /
 *    `removeItem` / `clearAppStorage`) por delante de la Web Storage API.
 *    Esconde el `JSON.parse/stringify`, el `try/catch` y la elección entre
 *    `localStorage` y `sessionStorage`. El resto de la app no toca
 *    `window.localStorage` directamente, así que este es el único punto de
 *    cambio si mañana se migra el mecanismo de persistencia.
 *
 * 2. Module pattern (JS): el módulo expone solo su API pública; los detalles
 *    (`getStore`, el manejo de errores, el prefijo) quedan encapsulados acá.
 *
 * 3. Manejo de errores "fail-soft": cada operación atrapa su excepción y
 *    degrada a un valor neutro (`null` / no-op) en vez de propagarla. Web
 *    Storage puede tirar (modo privado, cuota llena) y un fallo de persistencia
 *    no debe romper el flujo de la UI.
 */

import { STORAGE_PREFIX } from "./storageKeys";

export type StorageKind = "local" | "session";

const getStore = (kind: StorageKind): Storage =>
  kind === "session" ? window.sessionStorage : window.localStorage;

export const getItem = <T>(
  key: string,
  kind: StorageKind = "local",
): T | null => {
  try {
    const raw = getStore(kind).getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (error) {
    console.warn(`[storage] No se pudo leer "${key}"`, error);
    return null;
  }
};

export const setItem = <T>(
  key: string,
  value: T,
  kind: StorageKind = "local",
): void => {
  try {
    getStore(kind).setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`[storage] No se pudo guardar "${key}"`, error);
  }
};

export const removeItem = (key: string, kind: StorageKind = "local"): void => {
  try {
    getStore(kind).removeItem(key);
  } catch (error) {
    console.warn(`[storage] No se pudo eliminar "${key}"`, error);
  }
};

export const clearAppStorage = (): void => {
  [window.localStorage, window.sessionStorage].forEach((store) => {
    try {
      Object.keys(store)
        .filter((key) => key.startsWith(STORAGE_PREFIX))
        .forEach((key) => store.removeItem(key));
    } catch (error) {
      console.warn("[storage] No se pudo limpiar el storage de la app", error);
    }
  });
};
