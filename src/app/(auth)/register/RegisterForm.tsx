"use client";

import Heading from "@/components/Heading";
import { useState } from "react";
import Swal from "sweetalert2";

import { FieldValues, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { rules } from "@/utils/rules";
import Link from "next/link";
import { useRouter } from "next/navigation";
import authApi from "@/apis/authApi";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import { InputForm } from "@/components/Input";

type RegisterFormProps = {};

const RegisterForm = (props: RegisterFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const handleRegister = async (data: any) => {
    setIsLoading(true);
    const response = await authApi.register(data);
    // @ts-ignore
    if (response.status === "OK") {
      Swal.fire({
        title: "Congratulations !",
        text: "Register succerssfull, Please check your email",
        icon: "success",
        showCloseButton: true,
        confirmButtonText: "Close",
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          router.push("/login");
        }
      });
    } else {
      toast.error(response.message);
    }
  };
  return (
    <>
      <Heading title="Sign up for E-Shop" center />
      <hr className="bg-slate-300 w-full h-px" />
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit((data) => handleRegister(data))}
        noValidate
      >
        <div className="flex gap-4">
          <div className="w-full">
            <InputForm
              id="firstName"
              register={register}
              type="text"
              placeholder="First Name"
              lable="First Name"
              errorMessage={errors.firstName?.message?.toString()}
              rules={rules.firsName}
              disabled={isLoading}
            />
          </div>
          <div className="w-full">
            <InputForm
              id="lastName"
              register={register}
              type="text"
              placeholder="Last Name"
              lable="Last Name"
              errorMessage={errors.lastName?.message?.toString()}
              rules={rules.lastName}
              disabled={isLoading}
            />
          </div>
        </div>
        <div>
          <InputForm
            id="email"
            register={register}
            type="email"
            placeholder="Enter your email..."
            lable="Your email"
            errorMessage={errors.email?.message?.toString()}
            rules={rules.email}
            disabled={isLoading}
          />
        </div>
        <div>
          <InputForm
            id="password"
            register={register}
            type="password"
            placeholder="••••••••"
            lable="Password"
            errorMessage={errors.password?.message?.toString()}
            rules={rules.password}
            disabled={isLoading}
          />
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <input
            type="password"
            autoComplete="on"
            id="confirm_password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("confirmPassword", {
              ...rules.confirm_password,
              validate: (value) =>
                value === getValues("password") || "confirm password not match",
            })}
          />
          <div className="mt-1 text-red-600 min-h-[1rem] text-sm">
            {errors.confirmPassword?.message}
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              aria-describedby="terms"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="terms"
              className="font-light text-gray-500 dark:text-gray-300"
            >
              I accept the{" "}
              <a
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                href="#"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {isLoading && (
            <span className="animate-spin">
              <CgSpinner />
            </span>
          )}
          Create an account
        </Button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="login"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Login here
          </Link>
        </p>
      </form>
    </>
  );
};

export default RegisterForm;
