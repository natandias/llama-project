import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { createSite, listSites } from "@/queries/sites";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const POST = withApiAuthRequired(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  // If your access token is expired and you have a refresh token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const { accessToken } = await getAccessToken(req, res);
  const reqBody = await req.json();
  try {
    const response = await createSite(reqBody, accessToken);
    const data = response.data;

    if (response.status !== 201) {
      return NextResponse.json({ message: data?.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("/api/site error", error);
    return NextResponse.json(
      { message: "Failed to create site" },
      { status: 400 }
    );
  }
});

const GET = withApiAuthRequired(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessToken } = await getAccessToken(req, res);
  const response = await listSites(accessToken);
  const sites = response.data.data;
  return NextResponse.json(sites, { status: 200 });
});

export { GET, POST };
