"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { sendPrompt } from "../../queries/conversation";

type FormData = {
  prompt: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [responses, setResponses] = useState<string[]>([]);
  const [isLoadingResponse, setIsLoadingResponse] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    setIsLoadingResponse(true);
    try {
      const { prompt } = data;
      const { data: apiResponse } = await sendPrompt(prompt);

      if (apiResponse) setResponses([...responses, apiResponse]);
      setIsLoadingResponse(false);
      reset();
    } catch (error) {
      console.error(error);
      setIsLoadingResponse(false);
    }
  };

  console.log("responses", responses);

  return (
    <main className="flex min-h-screen flex-col items-start justify-between p-10">
      <h1 className="text-xl">Criando o seu site</h1>
      <div className="flex flex-col">
        {responses.map(text => (
          <div
            className="bg-white h-auto rounded min-w-40 p-4 m-4 text-black"
            key={text}
          >
            {text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div>
          <textarea
            {...register("prompt", { required: true })}
            className="h-60 w-full text-black"
          />
          {errors.prompt && <span>The prompt is required</span>}
        </div>

        <button
          type="submit"
          className="bg-white text-black p-2 ml-auto mr-0"
          disabled={isLoadingResponse}
        >
          Enviar
        </button>
        {isLoadingResponse && <p>Gerando resposta...</p>}
      </form>
    </main>
  );
}
