import axios from "axios";

import { BASE_URL } from "./apiAuth";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 1. Obtenemos la URL de la petición que falló
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest) {
      // 2. Si el error es 401 PERO viene del login, NO redireccionamos
      // Dejamos que el componente maneje el error de "Credenciales incorrectas"
      if (originalRequest.url?.includes("/login")) {
        return Promise.reject(error);
      }
      //  Si el error viene del propio endpoint de refresh, significa que el Refresh Token murió
      if (originalRequest.url?.includes("/refresh")) {
        cleanTokes();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // 3. Intento de Refresh (si no lo intentamos ya para esta petición)
      if (!originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (
                originalRequest.headers &&
                typeof originalRequest.headers.set === "function"
              ) {
                originalRequest.headers.set("Authorization", `Bearer ${token}`);
              } else {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return api(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true; // Marcamos que ya estamos reintentando
        isRefreshing = true;

        try {
          const refreshToken = Cookies.get("refreshToken");

          if (!refreshToken) throw new Error("No hay refresh token");

          // Hacemos la petición de refresh usando una instancia limpia de axios
          // para evitar que este request pase por este mismo interceptor
          const response = await axios.post(`${BASE_URL}/refresh`, {
            refreshToken,
          });

          // Dependiendo si el backend envuelve la respuesta en { data: ... }
          const newAccessToken = response.data?.data?.accessToken;
          const newRefreshToken = response.data?.data?.refreshToken;

          if (!newAccessToken) {
            throw new Error("Token de acceso no devuelto por /refresh");
          }

          // 4. Si sale bien, guardamos los tokens
          Cookies.set("accessToken", newAccessToken, {
            secure: true,
            sameSite: "strict",
          });
          if (newRefreshToken) {
            Cookies.set("refreshToken", newRefreshToken, {
              secure: true,
              sameSite: "strict",
            });
          }
          // 5. Actualizamos el header de la petición original y la reintentamos
          if (
            originalRequest.headers &&
            typeof originalRequest.headers.set === "function"
          ) {
            originalRequest.headers.set(
              "Authorization",
              `Bearer ${newAccessToken}`,
            );
          } else {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          processQueue(null, newAccessToken);
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          // 6. Si el refresh falla (token expirado o inválido), limpiamos todo
          cleanTokes();
          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;

const cleanTokes = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};
