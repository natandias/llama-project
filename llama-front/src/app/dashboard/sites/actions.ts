"use server";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { GetSiteReqReturnValue } from "./types";
import CONSTANTS from "@/constants";
import { Inputs } from "@/app/dashboard/sites/new/[site]/requirements/types";

export async function getSite(siteId: string) {
  const { accessToken } = await getAccessToken({
    refresh: false,
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/site/${siteId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { tags: [CONSTANTS.GET_SITES] },
  });

  if (res.status === 200) {
    const site: GetSiteReqReturnValue = await res.json();
    return site;
  }
  return null;
}

export async function updateSite(siteId: string, data: Inputs) {
  const { accessToken } = await getAccessToken({
    refresh: false,
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/site/${siteId}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    next: { tags: [CONSTANTS.GET_SITES, CONSTANTS.GET_SITE] },
  });

  if (res.status === 200) {
    return true;
  }
  return null;
}
