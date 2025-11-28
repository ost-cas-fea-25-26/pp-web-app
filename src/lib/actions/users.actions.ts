"use server";

import { api } from "../api";
import { getSession } from "../auth/auth";

export const getMeAction = async () => {
  const session = await getSession();
  const zitadelId = session?.user?.zitadelId;
  if (!zitadelId) {
    return null;
  }

  return api.users.getUserById(zitadelId);
};
