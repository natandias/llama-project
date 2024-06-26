"use server";
import { revalidateTag } from "next/cache";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { Inputs, CreateSiteReqParams } from "./types";
import CONSTANTS from "../../../../../../constants";

export async function sendMessage(data: Inputs) {
  try {
    const { accessToken } = await getAccessToken({
      refresh: false,
    });
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) throw responseData;
    revalidateTag(CONSTANTS.GET_CHAT);
    return responseData;
  } catch (error: any) {
    const errorMessage = "Failed to send message";
    throw new Error(errorMessage);
  }
}

export async function generateSite(siteId: string) {
  try {
    const { accessToken } = await getAccessToken({
      refresh: false,
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/code/${siteId}`,
      {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) throw responseData;
    revalidateTag(CONSTANTS.GET_CHAT);
    revalidateTag(CONSTANTS.DOWNLOAD_SITE);
    return responseData;
  } catch (error: any) {
    const errorMessage = "Failed to generate site. Try again!";
    throw new Error(errorMessage);
  }
}