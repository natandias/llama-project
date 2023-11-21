import api from "./api";

type responseDataType = {
  success: boolean;
  message: string;
};

type requestDataType = {
  siteName: string;
};

const createSite = (data: requestDataType, token: string | undefined) =>
  api.post<responseDataType>("site", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export { createSite };
