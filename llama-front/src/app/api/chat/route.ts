import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { sendPrompt } from "@/queries/conversation";

const POST = withApiAuthRequired(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  // If your access token is expired and you have a refresh token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const { accessToken } = await getAccessToken(req, res);
  const reqBody = await req.json();
  try {
    const response = await sendPrompt(reqBody, accessToken);
    const data = response.data;

    if (response.status !== 201) {
      return NextResponse.json({ message: data?.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("/api/chat error", error);
    return NextResponse.json(
      { message: "Failed to send message" },
      { status: 400 }
    );
  }
});

const GET = withApiAuthRequired(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  // If your access token is expired and you have a refresh token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const { accessToken } = await getAccessToken(req, res);
  console.log("req", req);
  const { site_id } = req.query;

  const response = await fetch(`chat/${site_id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
  const conversation = await response.json();
  return NextResponse.json(conversation, { status: 200 });
});

export { GET, POST };
