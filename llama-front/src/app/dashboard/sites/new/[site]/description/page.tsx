import { getAccessToken } from "@auth0/nextjs-auth0";
import DescriptionPage from "./description-page";
import { ChatsReqReturnValue, Conversations } from "./types";
import CONSTANTS from "@/constants";

type PageProps = {
  params: {
    site: string;
  };
};

type GetChats = (props: PageProps) => Promise<ChatsReqReturnValue | null>;

const getChats: GetChats = async ({ params }) => {
  const { site } = params;
  const { accessToken } = await getAccessToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/${site}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { tags: [CONSTANTS.GET_CHAT] },
  });

  if (res.status === 200) {
    const chats: ChatsReqReturnValue = await res.json();
    console.log("chats", chats);
    return chats;
  }
  return null;
};

export default async function Page(props: PageProps) {
  // Fetch data directly in a Server Component
  const result = await getChats(props);
  let conversations: Conversations = [];
  if (result?.success && result.data) {
    const { data: chatsData } = result;
    conversations = chatsData.conversations;
  }

  // Forward fetched data to your Client Component
  return <DescriptionPage conversations={conversations} />;
}
