import { headers } from "next/headers";
import { auth } from "../../../auth";
import { api } from "../api";
import { CUSTOM_PROVIDER_ID } from "./client";

export const getAuthenticatedUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const id = session?.user?.id;
  if (!id) {
    return null;
  }

  const currentUser = await api.users.getUserById(id);
  if (!currentUser.success || !currentUser.data) {
    return null;
  }

  return currentUser.data;
};

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
