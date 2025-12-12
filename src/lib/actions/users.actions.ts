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
  const result = await api.users.updateAvatar(formData);

  if (result.success) {
    revalidatePath(`/users/${userId}`);
  }

  return result;
};

export const followUserAction = async (userId: string) => {
  const result = await api.users.followUser(userId);

  if (result.success) {
    revalidatePath(`/users/${userId}`);
  }

  return result;
};

export const unfollowUserAction = async (userId: string) => {
  const result = await api.users.unfollowUser(userId);

  if (result.success) {
    revalidatePath(`/users/${userId}`);
  }

  return result;
};

export const getAllUnfollowedUsersAction = async () => {
  return api.users.getAllUnfollowedUsers();
};

export const getFolloweeIdsAction = async () => {
  return api.users.getFolloweeIds();
};
