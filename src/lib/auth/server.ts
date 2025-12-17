import { headers } from "next/headers";
import { auth } from "../../../auth";
import { CUSTOM_PROVIDER_ID } from "./client";

export const getSession = async () =>
  auth.api.getSession({ headers: await headers() });

export const getAccessToken = async () => {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });

  if (!session?.user) {
    return null;
  }

  const token = await auth.api.getAccessToken({
    headers: reqHeaders,
    body: {
      providerId: CUSTOM_PROVIDER_ID,
    },
  });

  if (!token?.accessToken) {
    return null;
  }

  return token;
};
