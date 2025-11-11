import axios from "axios";
import { BASE_URL } from "../../../shared/utils/apiAuth";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";

/**
 * AuthService - Singleton para gestión de autenticación
 *
 * Funcionalidad principal:
 * 1. Almacena accessToken (15 min) y refreshToken (8 horas) en cookies.
 * 2. Renueva automáticamente el accessToken cuando expira usando el refreshToken.
 * 3. Evita múltiples refresh simultáneos mediante una promesa compartida.
 * 4. Proporciona getValidAccessToken() que siempre devuelve un token válido.
 * 5. Maneja logout y expiración de sesión.
 *
 * Flujo de renovación:
 *   accessToken (15 min) → expira → getValidAccessToken() detecta expiración
 *   → llama a refreshToken() → envía refreshToken al backend (/refresh)
 *   → recibe nuevo accessToken → lo guarda en cookie → lo devuelve
 *
 * Si no hay refreshToken → logout automático.
 * Si el refresh falla → se muestra toast de error y se cierra sesión.
 *
 * Cookies:
 *  - SameSite=Lax en desarrollo (localhost)
 *  - SameSite=None; Secure en producción (HTTPS)
 *  - path=/ → accesibles en todo el dominio
 */

class AuthService {
  private ACCESS_KEY = "accessToken";
  private REFRESH_KEY = "refreshToken";
  private ROLE = "role";
  private BASE_URL = BASE_URL;
  public static instance: AuthService;
  public onSessionExpiredCallback: (() => void) | null = null;

  // Evita múltiples llamadas simultáneas a /refresh
  private refreshPromise: Promise<string> | null = null;

  private handleApiError!: ReturnType<
    typeof useHandleApiError
  >["handleApiError"];

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
      const { handleApiError } = useHandleApiError();
      AuthService.instance.handleApiError = handleApiError;
    }
    return AuthService.instance;
  }

  public setOnSessionExpiredCallback(cb: () => void) {
    this.onSessionExpiredCallback = cb;
  }

  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || null;
    }
    return null;
  }

  private setCookie(name: string, value: string, minutes: number): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + minutes * 60 * 1000);

    const isDev = window.location.hostname === "localhost";
    const sameSite = isDev ? "Lax" : "None";
    const secure = isDev ? "" : "; Secure";

    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=${sameSite}${secure}`;
  }

  private deleteCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
  }

  public getAccessToken(): string | null {
    return this.getCookie(this.ACCESS_KEY);
  }

  public getRefreshToken(): string | null {
    return this.getCookie(this.REFRESH_KEY);
  }

  public getRole(): string | null {
    return this.getCookie(this.ROLE);
  }

  public setTokens(accessToken: string, refreshToken: string): void {
    this.setCookie(this.ACCESS_KEY, accessToken, 15);
    this.setCookie(this.REFRESH_KEY, refreshToken, 480);
  }

  public setRole(role: string): void {
    this.setCookie(this.ROLE, role, 480);
  }

  private clearTokens(): void {
    this.deleteCookie(this.ACCESS_KEY);
    this.deleteCookie(this.REFRESH_KEY);
    this.deleteCookie(this.ROLE);
  }

  public logout(): void {
    this.clearTokens();
    this.refreshPromise = null;
    this.onSessionExpiredCallback?.();
  }

  // === TOKEN EXPIRATION ===
  /**
   * Verifica si un JWT está expirado.
   *
   * El token tiene formato: <header>.<payload>.<signature>
   * - Decodificamos el payload con atob() (base64 → string)
   * - Lo parseamos a JSON → obtenemos payload.exp (timestamp en segundos)
   * - Comparamos con Date.now() / 1000
   * - bufferSeconds (30s) evita errores por reloj desincronizado
   */
  private isTokenExpired(token: string, bufferSeconds = 30): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp <= now + bufferSeconds;
    } catch {
      return true; // Si falla el parse, asumimos expirado
    }
  }

  public async refreshToken(): Promise<string> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.logout();
      throw new Error("No refresh token available");
    }

    this.refreshPromise = (async () => {
      try {
        const response = await axios.post(
          `${this.BASE_URL}/refresh`,
          { refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        const newAccessToken = response.data.data.accessToken;
        this.setCookie(this.ACCESS_KEY, newAccessToken, 15);
        return newAccessToken;
      } catch (err: any) {
        this.handleApiError(err, "Sesión expirada", { showAsToast: true });
        this.logout();
        throw new Error("Session expired");
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  // === GET VALID TOKEN ===
  /**
   * Siempre devuelve un accessToken válido.
   *
   * Lógica:
   * 1. Si no hay accessToken → intenta refrescar si hay refreshToken
   * 2. Si hay accessToken pero está expirado → refresca
   * 3. Si está válido → lo devuelve
   *
   * Nunca falla por token expirado: renueva automáticamente.
   */
  public async getValidAccessToken(): Promise<string> {
    let accessToken = this.getAccessToken();

    if (!accessToken) {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        this.logout();
        throw new Error("No refresh token available");
      }
      return this.refreshToken();
    }

    if (this.isTokenExpired(accessToken)) {
      return this.refreshToken();
    }

    return accessToken;
  }

  // DEBUG (solo en desarrollo)
  public debugTokens(): void {
    if (import.meta.env.DEV) {
      const access = this.getAccessToken();
      const refresh = this.getRefreshToken();

      console.log("=== DEBUG TOKENS (DEV) ===");
      console.log("Access:", access ? "Existe" : "No existe");
      console.log("Refresh:", refresh ? "Existe" : "No existe");

      if (access) {
        try {
          const payload = JSON.parse(atob(access.split(".")[1]));
          const left = payload.exp - Math.floor(Date.now() / 1000);
          console.log(
            `Access expira en: ${Math.floor(left / 60)}m ${left % 60}s`
          );
        } catch {}
      }

      if (refresh) {
        try {
          const payload = JSON.parse(atob(refresh.split(".")[1]));
          const left = payload.exp - Math.floor(Date.now() / 1000);
          console.log(`Refresh expira en: ${Math.floor(left / 60)}m`);
        } catch {}
      }
      console.log("========================");
    }
  }
}

export default AuthService;
