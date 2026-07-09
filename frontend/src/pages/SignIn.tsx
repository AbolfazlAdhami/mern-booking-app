import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import * as apiClient from "@/utils/api-client";
import { useAppContext } from "@/contexts/AppContext";
import type { SignInFormData } from "@/types";
import { RegisterPageStyle } from "@/constants/styles";

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <main className="max-w-screen bg-[url('/signin.jpg')] bg-cover bg-bottom bg-no-repeat relative   h-screen flex justify-center items-center">
      <form className={RegisterPageStyle.registerForm} onSubmit={onSubmit}>
        <h2 className="text-3xl text-white font-bold">Sign In</h2>
        <label className={RegisterPageStyle.labelStyle}>
          Email
          <input type="email" className={RegisterPageStyle.textInputStyle} {...register("email", { required: "This field is required" })}></input>
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </label>
        <label className={RegisterPageStyle.labelStyle}>
          Password
          <input
            type="password"
            className={RegisterPageStyle.textInputStyle}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          ></input>
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </label>
        <span className="flex w-full flex-col  gap-3 justify-between">
          <button type="submit" className="bg-blue-600  hover:bg-blue-500 text-white p-3 rounded-lg transition-all ease-in font-bold">
            Login
          </button>
          <span className="text-sm px-1 text-gray-50">
            Not Registered?{" "}
            <Link className="underline text-blue-100 hover:text-blue-50" to="/register">
              Create an account here
            </Link>
          </span>
        </span>
      </form>
    </main>
  );
};

export default SignIn;
