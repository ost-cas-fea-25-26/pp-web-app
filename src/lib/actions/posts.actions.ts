"use server";

import { revalidatePath } from "next/cache";
import { api } from "../api";
import { PostsGetManyQueryParams } from "@/lib/api/posts/posts.types";

export const getPostsAction = async (params: PostsGetManyQueryParams) => {
  return api.posts.getMany(params);
};

export const getPostByIdAction = async (id: string) => {
  return api.posts.getById(id);
};

export const createPostAction = async (text: string) => {
  const result = await api.posts.create(text);

  if (result.success) {
    revalidatePath("/");
  }

  return result;
};

export const likePostAction = async (postId: string) => {
  return api.posts.like(postId);
};

export const unlikePostAction = async (postId: string) => {
  return api.posts.unlike(postId);
};

export const getRepliesByPostIdAction = async (postId: string) => {
  return api.posts.getRepliesByPostId(postId);
};

export const createReplyForPostAction = async (
  postId: string,
  text: string,
) => {
  const result = await api.posts.createReplyForPost(postId, text);

  if (result.success) {
    revalidatePath(`/mumble/${postId}`);
  }

  return result;
};
