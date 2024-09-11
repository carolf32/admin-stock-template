import { useForm } from "react-hook-form";
import { useUserContext } from "../hooks/useUserContext";
import { loginFormData } from "../interfaces/users.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../schemas/LoginSchema";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({ resolver: zodResolver(LoginSchema) });
  const { userLogin } = useUserContext();

  const submit = (formData: loginFormData) => {
    userLogin(formData);
  };

  return (
    <div className="bg-gray-300 h-screen w-screen flex items-center justify-center">
      <div className="bg-white p-5 md:w-1/2 flex items-center justify-center flex-col gap-8 rounded">
        <h1 className="font-semibold text-2xl">Welcome, Admin!</h1>

        <form
          className="flex flex-col gap-5 w-full px-5"
          onSubmit={handleSubmit(submit)}
        >
          <input
            type="text"
            placeholder="E-mail"
            {...register("email")}
            className="bg-slate-100 rounded p-2"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="bg-slate-100 rounded p-2"
          />
          {errors.email && <span>{errors.email.message}</span>}
          {errors.password && <span>{errors.password.message}</span>}

          <button
            className="bg-blue-500 rounded text-white font-semibold p-2"
            type="submit"
          >
            Enter
          </button>
        </form>

        <Link to="/register" className="underline">
          Register new admin
        </Link>
      </div>
    </div>
  );
};
