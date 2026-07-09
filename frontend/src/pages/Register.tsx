import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import * as apiClient from "@/utils/api-client";
import { useAppContext } from "@/contexts/AppContext";

import type { RegisterFormData } from "@/types";
import { RegisterPageStyle } from "@/constants/styles";

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    mutation.mutate(data);
  });

  return (
    <main className="max-w-screen bg-[url('/register.jpg')] bg-cover bg-bottom bg-no-repeat relative   h-screen flex justify-center items-center">
      <form onSubmit={onSubmit} className={RegisterPageStyle.registerForm}>
        <h2 className="text-3xl text-white font-bold">Create an Account</h2>
        <div className="flex flex-col md:flex-row gap-2.5 md:gap-5">
          <label className={RegisterPageStyle.labelStyle}>
            First Name
            <input className={RegisterPageStyle.textInputStyle} {...register("firstName", { required: "This field is required" })} />
            {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
          </label>
          <label className={RegisterPageStyle.labelStyle}>
            Last Name
            <input className={RegisterPageStyle.textInputStyle} {...register("lastName", { required: "This field is required" })} />
            {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
          </label>
        </div>
        <label className={RegisterPageStyle.labelStyle}>
          Email
          <input className={RegisterPageStyle.textInputStyle} {...register("email", { required: "This field is required" })} />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </label>
        <label className={RegisterPageStyle.labelStyle}>
          Password
          <input className={RegisterPageStyle.textInputStyle} {...register("password", { required: "This field is required" })} type="password" />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </label>
        <label className={RegisterPageStyle.labelStyle}>
          Confirm Password
          <input
            className={RegisterPageStyle.textInputStyle}
            {...register("confirmPassword", {
              required: "This field is required",
              validate: (value) => {
                if (value !== watch("password")) {
                  return "Passwords do not match";
                }
              },
            })}
            type="password"
          />
          {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
        </label>
        <button type="submit" className={RegisterPageStyle.buttonStyle}>
          Create Account
        </button>
      </form>
    </main>
  );
};

export default Register;
