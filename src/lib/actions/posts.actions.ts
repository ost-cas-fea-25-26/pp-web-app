"use server";

import { api } from "../api";
import { PostsGetManyQueryParams } from "@/lib/api/posts/posts.types";

export const getPostsAction = async (params: PostsGetManyQueryParams) => {
  return api.posts.getMany(params);
};

export const createPostAction = async (text: string) => {
  return api.posts.create(text);
};

export const likePostAction = async (postId: string) => {
  return api.posts.like(postId);
};

export const unlikePostAction = async (postId: string) => {
  return api.posts.unlike(postId);
};
