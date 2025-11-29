"use server";

import { api } from "../api";

export const getUserByIdAction = async (userId: string) => {
  return api.users.getUserById(userId);
};
