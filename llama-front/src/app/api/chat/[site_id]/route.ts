import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getConversation } from "@/queries/conversation";

const GET = withApiAuthRequired(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  // If your access token is expired and you have a refresh token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const { accessToken } = await getAccessToken(req, res);
  const site_id = req.url?.split("/").slice(-1)[0];

  const response = await getConversation(site_id, accessToken);
  const conversations = response.data;
  return NextResponse.json(conversations, { status: 200 });
});

export { GET };
