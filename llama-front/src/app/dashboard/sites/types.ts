export type Site = {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  content: string | undefined;
  requirements: string | undefined;
  step: string;
  template: null | string;
};

export type SitesData = Site[];

export type GetSitesReqReturnValue = {
  success: boolean;
  data: SitesData;
};

export type GetSiteReqReturnValue = {
  success: boolean;
  data: SitesData;
};
