"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const doSubmit = (values: FormData) => {
    console.log("submit", values);
  };

  return (
    <section className="flex flex-col my-auto min-w-1/4">
      <h1 className="text-3xl uppercase mb-10">Entre na sua conta</h1>

      <form
        className="flex flex-col justify-between mb-4"
        onSubmit={handleSubmit(doSubmit)}
      >
        <div className="flex flex-col justify-between mb-6">
          <label htmlFor="email" className="py-2">
            Seu email
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

        <button
          type="submit"
          className=" border rounded-md border-black p-2 mt-6 bg-blue-700 text-white"
          // disabled={}
        >
          Entrar
        </button>

        <Link href="/signup" className="mt-8 text-center">
          Ainda não possui conta?
        </Link>
      </form>
    </section>
  );
}
