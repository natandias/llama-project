import api from "./api";

type requestDataType = {
  prompt: string;
  site_id: string;
};

const sendPrompt = (data: requestDataType, token: string | undefined) =>
  api.post<requestDataType>("chat", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const getConversation = (site_id: string, token: string | undefined) =>
  api.get(`chat/${site_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export { sendPrompt, getConversation };
