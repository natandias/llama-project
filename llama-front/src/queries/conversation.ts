import api from "./api";

type sendPromptResponse = string;

const sendPrompt = (prompt: string) =>
  api.post<sendPromptResponse>("code", { prompt });

export { sendPrompt };
