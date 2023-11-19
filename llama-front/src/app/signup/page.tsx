"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  const doSubmit = (values: FormData) => {
    console.log("submit", values);
  };

  return (
    <section className="flex flex-col my-auto min-w-1/4">
      <h1 className="text-3xl uppercase mb-10">Crie sua conta</h1>

      <form
        className="flex flex-col justify-between mb-4"
        onSubmit={handleSubmit(doSubmit)}
      >
        <div className="flex flex-col justify-between mb-6">
          <label htmlFor="email" className="py-2">
            Seu Email
          </label>
          <input
            type="email"
            className="p-2 border rounded-md border-gray-400 shadow"
            {...register("email", {
              required: { value: true, message: "Digite o email" },
              minLength: { value: 3, message: "Digite o email" },
            })}
          />
          <span className="text-red-500 text-sm">{errors.email?.message}</span>
        </div>

        <div className="flex flex-col justify-between mb-6">
          <label htmlFor="password" className="py-2">
            Senha
          </label>
          <div>
            <input
              type={isPasswordVisible ? "text" : "password"}
              className="p-2 border rounded-md border-gray-400 shadow outline-1 w-full"
              {...register("password", {
                required: { value: true, message: "Digite a senha" },
                minLength: { value: 1, message: "Digite a senha" },
              })}
            />
            <button
              className="absolute -ml-6 mt-1.5 z-50"
              type="button"
              onClick={togglePasswordVisibility}
            >
              <i>
                {isPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </i>
            </button>
          </div>
          <span className="text-red-500 text-sm">
            {errors.password?.message}
          </span>
        </div>

        <div className="flex flex-col justify-between mb-6">
          <label htmlFor="password" className="py-2">
            Confirme sua senha
          </label>
          <div>
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              className="p-2 border rounded-md border-gray-400 shadow outline-1 w-full"
              {...register("confirmPassword", {
                required: { value: true, message: "Confirme a senha" },
                minLength: { value: 1, message: "Confirme a senha" },
                validate: (value, formValues) =>
                  value === formValues.password || "As senhas não estão iguais",
              })}
            />
            <button
              className="absolute -ml-6 mt-1.5 z-50"
              type="button"
              onClick={toggleConfirmPasswordVisibility}
            >
              <i>
                {isConfirmPasswordVisible ? (
                  <EyeOutlined />
                ) : (
                  <EyeInvisibleOutlined />
                )}
              </i>
            </button>
          </div>
          <span className="text-red-500 text-sm">
            {errors.confirmPassword?.message}
          </span>
        </div>

        <button
          type="submit"
          className=" border rounded-md border-black p-2 mt-6 bg-blue-700 text-white"
          // disabled={}
        >
          Criar Conta
        </button>

        <Link href="/login" className="mt-6 text-center">
          Já possui conta?
        </Link>
      </form>
    </section>
  );
}
