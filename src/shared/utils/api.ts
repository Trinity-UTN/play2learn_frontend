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
  const token = Cookies.get('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 1. Obtenemos la URL de la petición que falló
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      // 2. Si el error es 401 PERO viene del login, NO redireccionamos
      // Dejamos que el componente maneje el error de "Credenciales incorrectas"
      if (originalRequest.url.includes('/login')) {
        return Promise.reject(error);
      }
      //  Si el error viene del propio endpoint de refresh, significa que el Refresh Token murió
      if (originalRequest.url.includes('/refresh')) {
        cleanTokes()
        window.location.href = '/login';
        return Promise.reject(error);
      }
      // 3. Intento de Refresh (si no lo intentamos ya para esta petición)
      if (!originalRequest._retry) {
        originalRequest._retry = true; // Marcamos que ya estamos reintentando

        try {
          const refreshToken = Cookies.get('refreshToken');

          if (!refreshToken) throw new Error("No hay refresh token");

          // Hacemos la petición de refresh usando una instancia limpia de axios 
          // para evitar que este request pase por este mismo interceptor
          const { data } = await axios.post(`${BASE_URL}/refresh`, {
            refreshToken
          });

          // 4. Si sale bien, guardamos el nuevo token
          Cookies.set('accessToken', data.accessToken, { secure: true, sameSite: 'strict' });

          // 5. Actualizamos el header de la petición original y la reintentamos
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);

        } catch (refreshError) {
          // 6. Si el refresh falla (token expirado o inválido), limpiamos todo
          cleanTokes()
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;

const cleanTokes = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
}