export interface Login {
  email: string;
  password: string;
}

export interface UserContextType {
  loading: boolean;
  isAuthenticated: boolean;
  login: (data: Login) => Promise<boolean>;
  logout: () => void;
}
