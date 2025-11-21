"use server";

import { api } from "../api";

export const getPostsAction = async () => {
  return api.posts.getMany();
};

export const createPostAction = async (text: string) => {
  return api.posts.create(text);
};
