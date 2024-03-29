"use server";
import { revalidateTag } from "next/cache";
import { Inputs } from "./types";
import CONSTANTS from "./constants";

export async function sendMessage(data: Inputs) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    console.log("sendMessage responseData", responseData);

    if (!response.ok) throw responseData;
    revalidateTag(CONSTANTS.GET_CHAT);
    return responseData;
  } catch (error: any) {
    const errorMessage = "Failed to send message";
    throw new Error(errorMessage);
  }
}
