"use client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

type Inputs = {
  prompt: string;
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

type ConversationsData = {
  prompt: string;
  response: string;
}[];

export default withPageAuthRequired(function SiteDescription() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [conversations, setConversations] = useState<ConversationsData>([]);
  const formRef = useRef<React.RefObject<HTMLFormElement>>();

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<Inputs>();

  const params = useParams();
  const { site } = params;

  const promptVal = watch("prompt");

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsLoading(true);
      fetch(`/api/chat/${site}`, {
        method: "GET",
      })
        .then(async response => {
          const responseData = await response.json();
          setConversations(responseData.data.conversations);
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
          console.error(`/api/chat/${site} error`, error);
        });
    }
  }, [site, isSubmitSuccessful]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/chat/${site}`, {
      method: "GET",
    })
      .then(async response => {
        const responseData = await response.json();
        setConversations(responseData.data.conversations);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error(`/api/chat/${site} error`, error);
      });
  }, [site]);

  const onSubmit: SubmitHandler<Inputs> = async formValues => {
    try {
      setIsLoading(true);

      const { prompt } = formValues;
      const data = { site_id: site, prompt };

      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (!response.ok) throw responseData;
      setIsLoading(false);

      reset();
    } catch (error) {
      const errorMessage = error?.message ?? "Failed to send message";
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  console.log("isLoading", isLoading);

  const handleKeypress = (e: React.KeyboardEvent) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      formRef.current?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  return (
    <section className="flex mt-10">
      <form
        className={`flex flex-col gap-5 text-center p-2 min-w-1/4 items-center `}
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5 overflow-y-auto">
          {conversations.length ? (
            conversations.map((conv, index) => (
              <div
                key={index}
                className={`flex flex-col gap-5 ${
                  isLoading ? "bg-white blur-lg " : ""
                }`}
              >
                <MyMessage text={conv.prompt} />
                <IaMessage text={conv.response} />
              </div>
            ))
          ) : (
            <h1 className={`text-xl ${isLoading ? "bg-white blur-lg " : ""}`}>
              Descreva para nossa IA o que deseja em seu site
            </h1>
          )}
        </div>
        <div className="flex flex-col mt-auto w-full mb-10">
          <textarea
            id="pages"
            className="border border-b-0 border-zinc-400 p-2 min-h-[60px] resize-none"
            onKeyDown={handleKeypress}
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
          {isLoading ? (
            <span className="text-red-500 text-sm">Gerando resposta...</span>
          ) : (
            ""
          )}
          <span className="text-red-500 text-sm">{errors.prompt?.message}</span>
        </div>
      </form>
    </section>
  );
});
