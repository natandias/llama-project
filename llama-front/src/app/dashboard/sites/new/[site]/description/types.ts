export type Conversations = {
  prompt: string;
  response: string;
}[];

export type ChatsReqReturnValue = {
  success: boolean,
  data: {
    _id: any,
    site_id: string,
    conversations: Conversations,
    summary: string
  }
}

export type Inputs = {
  prompt: string;
};

export type CreateSiteReqParams = {
  site_id: string;
};