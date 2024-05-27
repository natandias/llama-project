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
    next: { tags: [CONSTANTS.GET_SITE] },
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
  });

  if (res.status === 200) {
    return true;
  }
  return null;
}

export async function deleteSite(siteId: string) {
  const { accessToken } = await getAccessToken({
    refresh: false,
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/site/${siteId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 200) {
    return true;
  }
  return null;
}

export async function downloadSite(siteId: string) {
  const { accessToken } = await getAccessToken({
    refresh: false,
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/site/${siteId}/download`,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/octet-stream",
      },
      next: { tags: [CONSTANTS.DOWNLOAD_SITE] },
    }
  );

  const blob = await response.blob();
  console.log("blob", blob);

  if (response.status === 200) {
    return blob;
  }
  return null;
}
