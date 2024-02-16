import api from "./api";

type createSiteResponseType = {
  success: boolean;
  message: string;
};

type createSiteRequestType = {
  siteName: string;
};

type sitesDataType = {
  _id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
}[];

type listSitesResponseType = {
  success: boolean;
  data: sitesDataType;
};

const createSite = (data: createSiteRequestType, token: string | undefined) =>
  api.post<createSiteResponseType>("site", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const listSites = (token: string | undefined) =>
  api.get<listSitesResponseType>("site/list", {
    headers: { Authorization: `Bearer ${token}` },
  });

export { createSite, listSites };
