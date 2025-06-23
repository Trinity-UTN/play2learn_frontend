export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserContextType {
  //user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
