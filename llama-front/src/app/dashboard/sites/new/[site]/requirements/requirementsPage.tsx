"use client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { Site } from "@/app/dashboard/sites/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { Inputs } from "./types";
import { updateSite } from "@/app/dashboard/sites/actions";
import { useParams } from "next/navigation";

type Props = {
  siteInfo: Site;
};

export default withPageAuthRequired(function RequirementsPage({
  siteInfo,
}: Props) {
  const params = useParams();
  const { site } = params;

  const {
    register,
    handleSubmit,
    watch,
    reset,
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

      const responseData = await updateSite(site.toString(), data);

      // router.push(`/dashboard/sites/new/${site_id}/description`);
    } catch (error: any) {
      const errorMessage = error?.message ?? "Failed to update site";
      toast.error(errorMessage);
    }
  };

  return (
    <form
      className="flex flex-col mt-10 items-center gap-10 w-full h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
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
            required: { value: true, message: "Conteúdo não pode ser vazio" },
          })}
          className="min-w-1/2 min-h-[450px]"
        />
      </section>

      <button
        className="bg-primary hover:bg-primary_hover text-black font-semibold text-md p-3 px-8 rounded-md mt-auto mb-10"
        type="submit"
        disabled={false}
      >
        Prosseguir
      </button>
    </form>
  );
});
