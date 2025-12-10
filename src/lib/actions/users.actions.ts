"use server";

import { revalidatePath } from "next/cache";
import { api } from "../api";

export const getUsersAction = async () => {
  return api.users.getMany();
};

export const getUserByIdAction = async (userId: string) => {
  return api.users.getUserById(userId);
};

export const updateAvatarAction = async (
  userId: string,
  formData: FormData,
) => {
  const result = await api.users.updateAvatar(formData);

  if (!result.success) {
    return result;
  }

  revalidatePath(`/users/${userId}`);

  return { success: true };
};
