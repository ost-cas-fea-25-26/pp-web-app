"use server";

import { revalidatePath } from "next/cache";
import { api } from "../api";
import { usersStorage } from "../storage/users.storage";
import { Profile } from "@/components/profile-editor";

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

export const updateBannerAction = async (userId: string, file: File) => {
  const result = await usersStorage.updateBannerImage(file);

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

export const getUnfollowedUserSuggestionsAction = async (limit?: number) => {
  return api.users.getUnfollowedUserSuggestions(limit);
};

export const getFolloweeIdsAction = async () => {
  return api.users.getFolloweeIds();
};

type ProfileWithUserId = Profile & { userId: string };

export const updateMeAction = async (data: ProfileWithUserId) => {
  const result = await api.users.updateMe(data);
  //todo handle bio

  if (result.success) {
    revalidatePath(`/users/${data.userId}`);
  }

  return result;
};
