"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { Conversations, Inputs } from "./types";
import { sendMessage, generateSite } from "./actions";
import { getSummary } from "../../actions";

type Props = {
  conversations: Conversations | [];
};

const IaMessage = ({ text }: { text: string }) => (
  <div className="max-w-[900px] p-4 rounded-md bg-gray-200 text-left">
    <h1>{text}</h1>
  </div>
);

const MyMessage = ({ text }: { text: string }) => (
  <div className="max-w-[900px] p-4 rounded-md bg-primary text-right">
    <h1>{text}</h1>
  </div>
);

export default withPageAuthRequired(function SiteDescription({
  conversations,
}: Props) {
  const [isGeneratingSite, setIsGeneratingSite] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<Inputs>();

  const params = useParams();
  const { site } = params;

  const promptVal = watch("prompt");

  const onSubmit: SubmitHandler<Inputs> = async formValues => {
    try {
      const { prompt } = formValues;
      const data = { site_id: site, prompt };

      await sendMessage(data);

      reset();
    } catch (error: any) {
      const errorMessage = error?.message ?? "Failed to send message";
      toast.error(errorMessage);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    //it triggers by pressing the enter key
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  const triggerGenerateSite = async () => {
    try {
      const data = { site_id: site };

      setIsGeneratingSite(true);
      await getSummary(data);
      setIsGeneratingSite(false);

      reset();
    } catch (error: any) {
      const errorMessage = error?.message ?? "Failed to generate site";
      setIsGeneratingSite(false);
      toast.error(errorMessage);
    }
  };

  return isGeneratingSite ? (
    <section className="flex flex-col items-center my-auto">
      <h1 className="text-lg">Processando os dados... Aguarde um momento.</h1>
      {/* <h2 className="text-lg">Por favor aguarde um momento</h2> */}
      <div className="flex space-x-2 justify-center items-center bg-black h-10 dark:invert">
        <span className="sr-only">Loading...</span>
        <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-4 w-4 bg-white rounded-full animate-bounce"></div>
      </div>
    </section>
  ) : (
    <section className="flex mt-10">
      <form
        className={`flex flex-col gap-5 text-center p-2 min-w-1/4 items-center `}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5 overflow-y-auto">
          {conversations.length ? (
            conversations.map((conv, index) => (
              <div
                key={index}
                className={`flex flex-col gap-5 ${
                  isSubmitting ? "bg-white blur-lg " : ""
                }`}
              >
                <MyMessage text={conv.prompt} />
                <IaMessage text={conv.response} />
              </div>
            ))
          ) : (
            <h1
              className={`text-xl ${isSubmitting ? "bg-white blur-lg " : ""}`}
            >
              Descreva para nossa IA o que deseja em seu site
            </h1>
          )}
        </div>
        <div className="flex flex-col mt-auto w-full mb-10">
          <textarea
            id="pages"
            className="border border-b-0 border-zinc-400 p-2 min-h-[60px] resize-none"
            onKeyDown={handleKeyDown}
            {...register("prompt", {
              required: {
                value: true,
                message: "É preciso preencher o formulário acima",
              },
            })}
          ></textarea>
          <button
            type="submit"
            disabled={!promptVal || isSubmitting}
            className="bg-primary hover:bg-primary_hover text-black font-semibold text-md p-3 px-8 disabled:bg-zinc-200"
          >
            Enviar
          </button>
          {isSubmitting ? (
            <span className="text-red-500 text-sm">Gerando resposta...</span>
          ) : (
            ""
          )}
          <span className="text-red-500 text-sm">{errors.prompt?.message}</span>
        </div>
        <div>
          <h1>
            Quando tiver fornecido todos os requisitos, clique em Prosseguir.
          </h1>
          <button
            className="bg-primary hover:bg-primary_hover text-black font-semibold text-md p-3 px-8 rounded-md mt-auto mb-10"
            type="button"
            disabled={isSubmitting}
            onClick={triggerGenerateSite}
          >
            Prosseguir
          </button>
        </div>
      </form>
    </section>
  );
});
