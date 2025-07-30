// types.ts
export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: {
    name: string;
    email: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
}
