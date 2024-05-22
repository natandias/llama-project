"use client";
import { useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { Site } from "@/app/dashboard/sites/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { Inputs } from "./types";
import { updateSite } from "@/app/dashboard/sites/actions";
import { generateSite } from "@/app/dashboard/sites/new/[site]/description/actions";

import { useParams, useRouter } from "next/navigation";
import Loading from "@/components/dashboard/Loading";

type Props = {
  siteInfo: Site;
};

export default withPageAuthRequired(function RequirementsPage({
  siteInfo,
}: Props) {
  const params = useParams();
  const router = useRouter();

  const { site } = params;

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      content: siteInfo.content,
      requirements: siteInfo.requirements,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async formValues => {
    try {
      const { content, requirements } = formValues;
      const data = {
        content,
        requirements,
      };

      const siteId = site.toString();
      await updateSite(siteId, data);
      await generateSite(siteId);

      router.push(`/dashboard/sites/new/${siteId}/view`);
    } catch (error: any) {
      const errorMessage = error?.message ?? "Failed to update site";
      toast.error(errorMessage);
    }
  };

  const toggleSubmitModal = () => setIsSubmitModalOpen(!isSubmitModalOpen);

  return isSubmitting ? (
    <Loading />
  ) : (
    <form
      className="flex flex-col pt-10 items-center gap-10 w-full h-full backdrop-blur-xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      {isSubmitModalOpen ? (
        <dialog
          className="flex flex-col items-center justify-around mx-4 md:mx-auto h-72 lg:h-80 mt-[25%] p-5 border border-black rounded-md text-center backdrop-blur-xl"
          open
        >
          <p className="font-semibold ">O seu site será gerado agora.</p>
          <p>Essa operação pode levar alguns minutos.</p>
          <p>É preciso manter a aba aberta enquanto o site é gerado.</p>
          <p>Podemos continuar?</p>
          <div className="flex flex-wrap justify-center gap-5 mt-5 md:mt-10">
            <button
              className="bg-white hover:bg-red-500 transition-all duration-500 text-black font-semibold text-md p-3 px-8 rounded-md mt-auto "
              type="button"
              disabled={isSubmitting}
              onClick={toggleSubmitModal}
            >
              Cancelar
            </button>
            <button
              className="bg-primary hover:bg-primary_hover text-black font-semibold text-md p-3 px-8 rounded-md mt-auto "
              type="submit"
              disabled={isSubmitting}
            >
              Continuar
            </button>
          </div>
        </dialog>
      ) : (
        <>
          {" "}
          <p className="text-xl text-center">
            Abaixo você pode editar detalhes sobre o seu site
          </p>
          <section className="flex flex-col w-5/6">
            <label htmlFor="requirements" className="text-xl bold mb-4">
              Requisitos
            </label>
            <textarea
              {...register("requirements", {
                required: {
                  value: true,
                  message: "Requisitos não podem ser vazios",
                },
              })}
              className="min-w-1/2 min-h-[450px]"
            />
          </section>
          <section className="flex flex-col w-5/6">
            <label htmlFor="content" className="text-xl bold mb-4">
              Conteúdo
            </label>
            <textarea
              {...register("content", {
                required: {
                  value: true,
                  message: "Conteúdo não pode ser vazio",
                },
              })}
              className="min-w-1/2 min-h-[450px]"
            />
          </section>
          <button
            className="bg-primary hover:bg-primary_hover text-black font-semibold text-md p-3 px-8 rounded-md mt-auto mb-10"
            type="button"
            disabled={isSubmitting}
            onClick={toggleSubmitModal}
          >
            Gerar site
          </button>
        </>
      )}
    </form>
  );
});
