export type SitesData = {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
}[];

export type GetSitesReqReturnValue = {
  success: boolean;
  data: SitesData;
};
