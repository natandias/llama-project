"use server";
import { revalidateTag } from "next/cache";
import { CreateSiteParams, GenerateSummaryParams } from "./types";
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

    console.log("createSite responseData", responseData);

    if (!response.ok) throw responseData;
    revalidateTag(CONSTANTS.GET_SITES);
    return responseData;
  } catch (error: any) {
    const errorMessage = "Failed to create site";
    throw new Error(errorMessage);
  }
}

export async function getSummary(data: GenerateSummaryParams) {
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

    console.log("getSummary responseData", responseData);

    if (!response.ok) throw responseData;
    revalidateTag(CONSTANTS.GET_CHAT);
    return responseData;
  } catch (error: any) {
    const errorMessage = "Failed to extract";
    throw new Error(errorMessage);
  }
}

