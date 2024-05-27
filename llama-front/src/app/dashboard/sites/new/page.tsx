"use client";
import { SwatchesPicker } from "react-color";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import {
  useForm,
  SubmitHandler,
  UseFormRegisterReturn,
  Controller,
} from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Inputs } from "./types";
import { createSite } from "./actions";
import Loading from "@/components/dashboard/Loading";

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
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      primaryColor: {
        hex: undefined,
      },
      secondaryColor: {
        hex: undefined,
      },
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async formValues => {
    try {
      const { name, primaryColor, secondaryColor } = formValues;
      const data = {
        name,
        primaryColor: primaryColor.hex,
        secondaryColor: secondaryColor.hex,
      };

      const responseData = await createSite(data);
      const { site_id } = responseData.data;

      router.push(`/dashboard/sites/new/${site_id}/description`);
    } catch (error: any) {
      const errorMessage = error?.message ?? "Failed to create site";
      toast.error(errorMessage);
    }
  };

  return isSubmitting ? (
    <Loading />
  ) : (
    <section className="flex mt-14">
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

        <div className="flex flex-row gap-10 flex-wrap items-center">
          <div className="mb-4 flex flex-col items-center gap-3 m-auto">
            <h1>Escolha uma cor principal para seu site</h1>
            <Controller
              control={control}
              name="primaryColor"
              rules={{
                required: {
                  value: true,
                  message: "Cor primária é obrigatório",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <SwatchesPicker
                  color={value.hex}
                  onChangeComplete={onChange}
                  height={600}
                  styles={{
                    default: {
                      overflow: { overflow: "auto" },
                    },
                  }}
                />
              )}
            />
            <span className="text-red-500 text-sm ">
              {errors.primaryColor?.message}
            </span>
          </div>

          <div className="mb-4 flex flex-col items-center gap-3  m-auto">
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
                <SwatchesPicker
                  color={value.hex}
                  onChangeComplete={onChange}
                  height={600}
                  styles={{
                    default: {
                      overflow: { overflow: "auto" },
                    },
                  }}
                />
              )}
            />
            <span className="text-red-500 text-sm ">
              {errors.secondaryColor?.message}
            </span>
          </div>
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-primary hover:bg-primary_hover text-black font-semibold text-md p-3 px-8 rounded-md mt-auto mb-10"
        >
          Prosseguir
        </button>
      </form>
    </section>
  );
});
