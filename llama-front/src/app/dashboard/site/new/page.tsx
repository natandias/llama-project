"use client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useForm, SubmitHandler, UseFormRegisterReturn } from "react-hook-form";
import { createSite } from "@/queries/sites";

type Inputs = {
  name: string;
};

type TextInputProps = {
  label: string;
  inputId: string;
  inputProps: UseFormRegisterReturn<any>;
};

const Input = ({ label, inputId, inputProps }: TextInputProps) => (
  <div className="flex flex-col gap-3">
    <label htmlFor={inputId}>{label}</label>
    <input
      id={inputId}
      className="border border-black rounded p-2"
      type="text"
      {...inputProps}
    />
  </div>
);

export default withPageAuthRequired(function NewSite() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    console.log("data", data);
    try {
      const response = await fetch("/api/site", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log("response", responseData.data);
    } catch (error) {
      console.error("Failed to create site", error);
    }
  };

  const t = watch();
  console.log("t", t);

  return (
    <section className="flex">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Qual será o nome do seu site?"
          inputId="name"
          inputProps={register("name", {
            required: { value: true, message: "Nome é obrigatório" },
          })}
        />

        <button
          type="submit"
          className="bg-primary  hover:bg-primary_hover text-black font-semibold text-md p-3 px-8 rounded-md"
        >
          Prosseguir
        </button>
      </form>
    </section>
  );
});
