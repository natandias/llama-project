"use server";
import { revalidateTag } from "next/cache";
import { CreateSiteParams, ExtractSummaryParams } from "./types";
import CONSTANTS from "@/constants";

export async function createSite(data: CreateSiteParams) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/site`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (!response.ok) throw responseData;
    revalidateTag(CONSTANTS.GET_SITES);
    revalidateTag(CONSTANTS.GET_SITE);
    revalidateTag(CONSTANTS.DOWNLOAD_SITE);
    return responseData;
  } catch (error: any) {
    const errorMessage = "Failed to create site";
    throw new Error(errorMessage);
  }
}

export async function extractSiteSummary(data: ExtractSummaryParams) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat/${data.site_id}/extract`,
      {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) throw responseData;
    revalidateTag(CONSTANTS.GET_CHAT);
    revalidateTag(CONSTANTS.DOWNLOAD_SITE);
    return responseData;
  } catch (error: any) {
    const errorMessage = "Failed to extract";
    throw new Error(errorMessage);
  }
}

