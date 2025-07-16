import axios from "axios";


class AuthService {
    private  ACCESS_KEY = "accessToken";
    private  REFRESH_KEY = "refreshToken";
    private  ROLE = "role";
    private  BASE_URL = "https://play2learn.backend.desarrollo.systemsbinary.com";
    public static instance: AuthService;
    public  onSessionExpiredCallback: (() => void) | null = null;

   private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }
    //Funcion que reaciona ante el cambio de isAuthenticated
    public setOnSessionExpiredCallback(cb: () => void) {
        this.onSessionExpiredCallback = cb;
    }

    //get al access token almacenado en el login
    public getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_KEY);
    }

    //get al refresh token almacenado en el login
    public getRefreshToken(): string | null {
        return localStorage.getItem(this.REFRESH_KEY);
    }

    //Setear ambos token para que esten sincronizados
    public setTokens(accessToken: string, refreshToken: string): void {
        localStorage.setItem(this.ACCESS_KEY, accessToken);
        localStorage.setItem(this.REFRESH_KEY, refreshToken);
    }

    //Limpiar tokens
    private clearTokens(): void {
        localStorage.removeItem(this.ACCESS_KEY);
        localStorage.removeItem(this.REFRESH_KEY);
        localStorage.removeItem(this.ROLE);
    }

    //LogOut
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
        const payload = JSON.parse(atob(token.split(".")[1]));
        const now = Math.floor(Date.now() / 1000);
        return payload.exp <= now + bufferSeconds;
    }


    public async refreshToken(): Promise<string> {

        const refreshToken = this.getRefreshToken(); //si no hay refresh token ya no hay nada que hacer
        if (!refreshToken) {
            this.logout()
            throw new Error("No refresh token available");
        }
        try {
            const response = await axios.post(`${this.BASE_URL}/refresh`, {
            refreshToken,
            });

            const { accessToken, refreshToken: newRefreshToken } = response.data;

            this.setTokens(accessToken, newRefreshToken);

            return accessToken;
        } catch (err) {
            this.logout();
            console.error("Refresh token inválido o vencido:", err);
            throw new Error("Session expired");
        }
    }

    /*
    Esta funcion siempre devuelve un accesTOken valido, ya sea que pidio uno nuevo o el que ya estaba
    */
    public async getValidAccessToken(): Promise<string> {
        const accessToken = this.getAccessToken();
        
        if (!accessToken) {
            this.logout();
            throw new Error("No access token found");
        }

        if (!this.isTokenExpired(accessToken)) { //Si el token es valido lo devuelve, si no es valido sigue y se ejecuta el refresh
            return accessToken;
        }

        return await this.refreshToken(); //aca se obtiene un accesstoken refrescado
    }



}
export default AuthService;