import { ReactNode } from "react";

export interface registerFormData {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface loginFormData {
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
}

export interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userRegister: (formData: registerFormData) => Promise<void>;
  userLogin: (formData: loginFormData) => Promise<void>;
}

export interface UserProviderProps {
  children: ReactNode;
}
