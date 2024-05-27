export type Inputs = {
  name: string;
  primaryColor: {
    hex: string;
  };
  secondaryColor: {
    hex: string;
  };
};

export type CreateSiteParams = {
  name: string;
  primaryColor: string;
  secondaryColor: string;
};

export type ExtractSummaryParams = { site_id: string };