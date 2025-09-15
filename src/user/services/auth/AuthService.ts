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

  public getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_KEY);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_KEY);
  }

  public setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.ACCESS_KEY, accessToken);
    localStorage.setItem(this.REFRESH_KEY, refreshToken);
  }

  private clearTokens(): void {
    localStorage.removeItem(this.ACCESS_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    localStorage.removeItem(this.ROLE);
    localStorage.removeItem("studentData");
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
    En la linea siguiente obtenemos el tiempo acttual pero esta en milisegundo asi que lo convertimos en segundos.
    Luego comparamos el tiempo de exp del token contra en actual sumado un bufferSeconds.
    Si el exp del token es menor significa que expiro y devuelve true.
    El bufferSecond se utiliza para manejar un margen de error, ya que si al token le queda un segundo se lo considera valido,
    pero quizas justo al momento de llegar al back, para este ya expirto y tira un 401. Por lo tanto con el buffer si al 
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
    Esta funcion siempre devuelve un accesToken valido, ya sea que pidio uno nuevo o el que ya estaba
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
