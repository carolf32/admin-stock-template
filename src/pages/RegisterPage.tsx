import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "../schemas/FormSchema";
import { registerFormData } from "../interfaces/users.interface";
import { useUserContext } from "../hooks/useUserContext";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerFormData>({ resolver: zodResolver(FormSchema) });
  const { userRegister } = useUserContext();

  const navigate = useNavigate();

  const submit = (formData: registerFormData) => {
    const formDataWithRole = {
      ...formData,
      role: "Employee",
    };
    userRegister(formDataWithRole);
    console.log(formDataWithRole);
    navigate("/login");
  };

  return (
    <div className="bg-gray-300 h-screen w-screen flex items-center justify-center">
      <div className="bg-white p-5 md:w-1/2 flex items-center justify-center flex-col gap-8 rounded">
        <h1 className="font-semibold text-2xl">Register new Admin</h1>

        <form
          className="flex flex-col gap-5 w-full px-5"
          onSubmit={handleSubmit(submit)}
        >
          <input
            type="text"
            placeholder="Name"
            className="bg-slate-100 rounded p-2"
            {...register("name")}
          />
          <input
            type="text"
            placeholder="E-mail"
            className="bg-slate-100 rounded p-2"
            {...register("email")}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-slate-100 rounded p-2"
            {...register("password")}
          />
          <input
            type="password"
            placeholder="Repeat password"
            className="bg-slate-100 rounded p-2"
            {...register("confirmPassword")}
          />
          {errors.email && <span>{errors.email.message}</span>}
          {errors.password && <span>{errors.password.message}</span>}
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
          <button
            className="bg-blue-500 rounded text-white font-semibold p-2"
            type="submit"
          >
            Register
          </button>
        </form>

        <Link to="/login" className="underline">
          I already have an account
        </Link>
      </div>
    </div>
  );
};
