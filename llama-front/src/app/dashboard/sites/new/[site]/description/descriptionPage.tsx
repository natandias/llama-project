"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Conversations, Inputs } from "./types";
import { sendMessage } from "./actions";
import { extractSiteSummary } from "../../actions";
import Loading from "@/components/dashboard/Loading";

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
  const router = useRouter();

  const [isExtractingSiteSummary, setIsExtractingSiteSummary] = useState(false);

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
    if ((e.key === "Enter" || e.key === "NumpadEnter") && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  const triggerSiteSummaryExtraction = async () => {
    try {
      const data = { site_id: site.toString() };

      setIsExtractingSiteSummary(true);
      await extractSiteSummary(data);
      setIsExtractingSiteSummary(false);
      reset();
      router.push(`/dashboard/sites/new/${site}/requirements`);
    } catch (error: any) {
      const errorMessage = error?.message ?? "Failed to generate site";
      setIsExtractingSiteSummary(false);
      toast.error(errorMessage);
    }
  };

  return isExtractingSiteSummary ? (
    <Loading />
  ) : (
    <section className="flex w-full justify-center h-mainSection">
      <form
        className={`flex flex-col gap-5 text-center p-2 min-w-1/4 items-center h-full`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5 overflow-y-auto h-4/5">
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

        <div className="w-full flex border border-zinc-400 rounded-sm ">
          <textarea
            id="pages"
            className=" w-5/6 p-2 border-0 min-h-[60px] resize-none focus:ring-0 focus-visible:ring-0 outline-none"
            onKeyDown={handleKeyDown}
            disabled={isSubmitting}
            {...register("prompt", {
              required: {
                value: true,
                message: "É preciso preencher o campo acima",
              },
            })}
          ></textarea>

          <button
            type="submit"
            disabled={!promptVal || isSubmitting}
            className="w-2/6 md:w-1/6 h-10 m-auto rounded-md mr-2 bg-primary hover:bg-primary_hover text-black font-semibold text-md disabled:bg-zinc-200"
          >
            {isSubmitting ? "Processando..." : "Enviar"}
          </button>
        </div>

        {/* {isSubmitting ? (
          <span className="text-red-500 text-sm">Gerando resposta...</span>
        ) : (
          ""
        )}
        <span className="text-red-500 text-sm">{errors.prompt?.message}</span> */}

        <div>
          <h1 className="mb-2">Quando tiver fornecido todos os requisitos:</h1>
          <button
            className="bg-primary hover:bg-primary_hover disabled:bg-gray-100 disabled:text-gray-500 text-black font-semibold text-md p-3 px-8 rounded-md mt-auto "
            type="button"
            disabled={isSubmitting}
            onClick={triggerSiteSummaryExtraction}
          >
            Prosseguir
          </button>
        </div>
      </form>
    </section>
  );
});
