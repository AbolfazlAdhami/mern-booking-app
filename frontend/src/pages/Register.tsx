import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const registerPageStyle = {
  labelStyle: "text-gray-700  font-bold flex-1 mb-2",
  textInputStyle: "border rounded-lg  w-full p-2 my-2 font-normal",
  registerForm: "w-full h-full md:h-fit md:w-1/2 p-5 py-10 border border-blue-600 rounded-lg flex flex-col gap-2.5 md:gap-5 shadow bg-white",
  buttonStyle: "bg-orange-400 text-white p-4 rounded-lg  hover:bg-orange-500 transition-all ease-in font-bold",
};

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  // const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  //   const mutation = useMutation(apiClient.register, {
  //     onSuccess: async () => {
  //       showToast({ message: "Registration Success!", type: "SUCCESS" });
  //       await queryClient.invalidateQueries("validateToken");
  //       navigate("/");
  //     },
  //     onError: (error: Error) => {
  //       showToast({ message: error.message, type: "ERROR" });
  //     },
  //   });

  //   const onSubmit = handleSubmit((data) => {
  //     mutation.mutate(data);
  //   });

  return (
    <main className="max-w-screen bg-blue-600 h-screen flex justify-center items-center">
      <form className={registerPageStyle.registerForm}>
        <h2 className="text-3xl font-bold">Create an Account</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <label className={registerPageStyle.labelStyle}>
            First Name
            <input className={registerPageStyle.textInputStyle} {...register("firstName", { required: "This field is required" })} />
            {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
          </label>
          <label className={registerPageStyle.labelStyle}>
            Last Name
            <input className={registerPageStyle.textInputStyle} {...register("lastName", { required: "This field is required" })} />
            {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
          </label>
        </div>
        <label className={registerPageStyle.labelStyle}>
          Email
          <input className={registerPageStyle.textInputStyle} {...register("email", { required: "This field is required" })} />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </label>
        <label className={registerPageStyle.labelStyle}>
          Password
          <input className={registerPageStyle.textInputStyle} {...register("password", { required: "This field is required" })} type="password" />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </label>
        <label className={registerPageStyle.labelStyle}>
          Confirm Password
          <input
            className={registerPageStyle.textInputStyle}
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
        <button className={registerPageStyle.buttonStyle}>Create Account</button>
      </form>
    </main>
  );
};

export default Register;
