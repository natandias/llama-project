import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const GET = withApiAuthRequired(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  // If your access token is expired and you have a refresh token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const { accessToken } = await getAccessToken(req, res);
  const response = await fetch(`${API_URL}/user/655a66bb25f70f1082f71012`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
  console.log("accessToken", accessToken);
  const users = await response.json();
  return NextResponse.json(users, { status: 200 });
});

export { GET };
