"use server";

import { revalidatePath } from "next/cache";
import { api } from "../api";
import { PostsGetManyQueryParams } from "@/lib/api/posts/posts.types";

export const getPostsAction = async (params: PostsGetManyQueryParams) => {
  return api.posts.getMany(params);
};

export const createPostAction = async (text: string) => {
  const result = await api.posts.create(text);
  if (!result.success) {
    return result;
  }

  revalidatePath("/");

  return { success: true };
};

export const likePostAction = async (postId: string) => {
  return api.posts.like(postId);
};

export const unlikePostAction = async (postId: string) => {
  return api.posts.unlike(postId);
};
