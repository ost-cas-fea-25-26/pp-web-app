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

export const followUserAction = async (userId: string) => {
  const result = await api.users.followUser(userId);

  if (!result.success) {
    return result;
  }

  revalidatePath(`/users/${userId}`);

  return { success: true };
};

export const unfollowUserAction = async (userId: string) => {
  const result = await api.users.unfollowUser(userId);

  if (!result.success) {
    return result;
  }

  revalidatePath(`/users/${userId}`);

  return { success: true };
};

export const getAllUnfollowedUsersAction = async (selfId: string) => {
  return api.users.getAllUnfollowedUsers(selfId);
};

export const getFolloweesAction = async (userId: string) => {
  return api.users.getFollowees(userId);
};
