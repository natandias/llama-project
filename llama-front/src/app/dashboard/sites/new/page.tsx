"use client";
import { ChromePicker } from "react-color";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import {
  useForm,
  SubmitHandler,
  UseFormRegisterReturn,
  Controller,
} from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Inputs = {
  name: string;
  primaryColor: string;
  secondaryColor: string;
};

type TextInputProps = {
  label: string;
  inputId: string;
  inputProps: UseFormRegisterReturn<any>;
  errorMessage: string | undefined;
};

const Input = ({
  label,
  inputId,
  inputProps,
  errorMessage,
}: TextInputProps) => (
  <div className="flex flex-col gap-3 mb-4">
    <label htmlFor={inputId}>{label}</label>
    <input
      id={inputId}
      className="border border-black rounded p-2"
      type="text"
      {...inputProps}
    />
    <span className="text-red-500 text-sm">{errorMessage}</span>
  </div>
);

export default withPageAuthRequired(function NewSite() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async formValues => {
    console.log("data", formValues);
    try {
      const { name, primaryColor, secondaryColor } = formValues;
      const data = {
        name,
        primaryColor: primaryColor.hex,
        secondaryColor: secondaryColor.hex,
      };

      const response = await fetch("/api/site", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (!response.ok) throw responseData;

      console.log("response", responseData);

      const { site_id } = responseData;

      router.push(`/dashboard/sites/new/${site_id}/description`);
    } catch (error) {
      const errorMessage = error?.message ?? "Failed to create site";
      toast.error(errorMessage);
    }
  };

  const t = watch();
  console.log("t", t);

  return (
    <section className="flex">
      <form
        className="flex flex-col gap-5 min-w-1/4 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Qual será o nome do seu site?"
          inputId="name"
          inputProps={register("name", {
            required: { value: true, message: "Nome é obrigatório" },
          })}
          errorMessage={errors.name?.message}
        />

        {/* <Input
          label="Escolha uma cor principal para seu site"
          inputId="name"
          inputProps={register("name", {
            required: { value: true, message: "Nome é obrigatório" },
          })}
        /> */}

        <div className="mb-4 flex flex-col items-center gap-3">
          <h1>Escolha uma cor principal para seu site</h1>
          <Controller
            control={control}
            name="primaryColor"
            rules={{
              required: { value: true, message: "Cor primária é obrigatório" },
            }}
            render={({ field: { onChange, value } }) => (
              <ChromePicker
                color={value}
                onChangeComplete={onChange}
                disableAlpha
              />
            )}
          />
          <span className="text-red-500 text-sm ">
            {errors.primaryColor?.message}
          </span>
        </div>

        <div className="mb-4 flex flex-col items-center gap-3">
          <h1>Escolha uma cor secundária para seu site</h1>
          <Controller
            control={control}
            name="secondaryColor"
            rules={{
              required: {
                value: true,
                message: "Cor secundária é obrigatório",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <ChromePicker
                color={value}
                onChangeComplete={onChange}
                disableAlpha
              />
            )}
          />
          <span className="text-red-500 text-sm ">
            {errors.secondaryColor?.message}
          </span>
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary_hover text-black font-semibold text-md p-3 px-8 rounded-md mt-auto mb-8"
        >
          Prosseguir
        </button>
      </form>
    </section>
  );
});
