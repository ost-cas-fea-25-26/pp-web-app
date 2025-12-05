"use server";

import { revalidatePath } from "next/cache";
import { api } from "../api";

export const getUserByIdAction = async (userId: string) => {
  return api.users.getUserById(userId);
};

export const updateAvatarAction = async (
  userId: string,
  formData: FormData,
) => {
  await api.users.updateAvatar(formData);
  revalidatePath(`/users/${userId}`);

  return { success: true };
};
