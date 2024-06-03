export type SubmitInputs = {
  requirements: string;
  content: string;
  template: string;
  images: [] | File[];
};

export type Inputs = {
  requirements: string;
  content: string;
  template: null | string;
  images: [] | File[];
};

export type UpdateFormData = {
  requirements: string;
  content: string;
  template: null | string;
  images: undefined | File | File[];
};
