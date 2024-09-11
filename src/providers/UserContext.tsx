import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";
import {
  loginFormData,
  registerFormData,
  User,
  UserContextProps,
  UserProviderProps,
} from "../interfaces/users.interface";

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

export const UserProvider = ({ children }: UserProviderProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("@USER-ADMIN");
    const storedToken = localStorage.getItem("@TOKEN-ADMIN");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

  const userRegister = async (formData: registerFormData) => {
    try {
      await api.post("/home/signup", formData);
      navigate("/login");
      toast.success("Account created successfully!");
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        toast.error(message);
      } else {
        toast.error("An unexpected error ocurred");
      }
      console.log(error);
    }
  };

  const userLogin = async (formData: loginFormData) => {
    try {
      const { data } = await api.post("/home/login", formData);

      navigate("/");
      setUser(data.user);
      toast.success("Welcome!");
      localStorage.setItem("@TOKEN-ADMIN", data.accessToken);
      localStorage.setItem("@USER-ADMIN", JSON.stringify(data.user));
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        toast.error(message);
      } else {
        toast.error("An unexpected error ocurred");
      }

      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ userRegister, userLogin, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
