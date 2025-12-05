"use server";

import { api } from "../api";

export const getUserByIdAction = async (userId: string) => {
  return api.users.getUserById(userId);
};

export const updateAvatarAction = async (formData: FormData) => {
  const file = formData.get("media") as File;
  if (!file) {
    return { success: false, error: "No file" };
  }

  return api.users.updateAvatar(file);
};
