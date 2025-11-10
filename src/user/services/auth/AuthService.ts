import axios from "axios";
import { BASE_URL } from "../../../shared/utils/apiAuth";

class AuthService {
  private ACCESS_KEY = "accessToken";
  private REFRESH_KEY = "refreshToken";
  private ROLE = "role";
  private BASE_URL = BASE_URL;
  public static instance: AuthService;
  public onSessionExpiredCallback: (() => void) | null = null;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
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

    // Configuración de seguridad para cookies
    const cookieOptions = [
      `${name}=${value}`,
      `expires=${expires.toUTCString()}`,
      "path=/",
      "SameSite=Strict", // Protección contra CSRF
      // Descomentar en producción con HTTPS:
      // "Secure", // Solo se envía por HTTPS
    ];

    document.cookie = cookieOptions.join("; ");
  }

  private deleteCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
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
    // Access token expira en 15 minutos
    this.setCookie(this.ACCESS_KEY, accessToken, 15);

    // Refresh token expira en 8 horas (480 minutos)
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
    this.onSessionExpiredCallback?.();
  }

  /*
    Se recibe el token y en la primera linea se los desglosa
    ya que esta conformado por <header>.<payload>.<signature> 
    en el payload esta la info de la expiracion, entonces obtenemos esta data
    y con el atob() decodificamos base64 y lo convertimos en un JSON.
    En la linea siguiente obtenemos el tiempo actual pero esta en milisegundos asi que lo convertimos en segundos.
    Luego comparamos el tiempo de exp del token contra el actual sumado un bufferSeconds.
    Si el exp del token es menor significa que expiro y devuelve true.
    El bufferSecond se utiliza para manejar un margen de error, ya que si al token le queda un segundo se lo considera valido,
    pero quizas justo al momento de llegar al back, para este ya expiro y tira un 401. Por lo tanto con el buffer si al 
    token le queda 30 ya es considerado como expirado
    */
  private isTokenExpired(token: string, bufferSeconds = 30): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp <= now + bufferSeconds;
    } catch (error) {
      console.error("Error parsing token:", error);
      return true;
    }
  }

  public async refreshToken(): Promise<string> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.logout();
      throw new Error("No refresh token available");
    }

    try {
      const response = await axios.post(`${this.BASE_URL}/refresh`, {
        refreshToken,
      });

      const accessToken = response.data.data.accessToken;
      this.setTokens(accessToken, refreshToken);
      return accessToken;
    } catch (err) {
      this.logout();
      console.error("Refresh token inválido o vencido:", err);
      throw new Error("Session expired");
    }
  }

  /*
    Esta funcion siempre devuelve un accessToken valido, ya sea que pidio uno nuevo o el que ya estaba
    */
  public async getValidAccessToken(): Promise<string> {
    const accessToken = this.getAccessToken();

    if (!accessToken) {
      this.logout();
      throw new Error("No access token found");
    }

    if (!this.isTokenExpired(accessToken)) {
      return accessToken;
    }

    return await this.refreshToken();
  }
}

export default AuthService;
