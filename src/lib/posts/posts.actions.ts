"use server";

import { PostResult } from "./posts.type";

// Todo Replace with real data fetching logic
export const loadPostsAction = async (
  offset: number,
  limit: number,
): Promise<PostResult[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  //eslint-disable-next-line no-console
  console.log(`Loading posts from offset ${offset} with limit ${limit}`);

  const samplePosts: PostResult[] = [
    {
      type: "post",
      id: Math.random().toString(),
      creator: "1234567890",
      text: "Hello world!",
      mediaUrl: null,
      mediaType: null,
      likeCount: 5,
      likedByUser: false,
      replyCount: 2,
    },
    {
      type: "post",
      id: Math.random().toString(),
      creator: "1234567890",
      text: "Hello world!",
      mediaUrl: null,
      mediaType: null,
      likeCount: 5,
      likedByUser: false,
      replyCount: 2,
    },
    {
      type: "post",
      id: Math.random().toString(),
      creator: "1234567890",
      text: "Hello world!",
      mediaUrl: null,
      mediaType: null,
      likeCount: 5,
      likedByUser: false,
      replyCount: 2,
    },
    {
      type: "post",
      id: Math.random().toString(),
      creator: "1234567890",
      text: "Hello world!",
      mediaUrl: null,
      mediaType: null,
      likeCount: 5,
      likedByUser: false,
      replyCount: 2,
    },
    {
      type: "post",
      id: Math.random().toString(),
      creator: "1234567890",
      text: "Hello world!",
      mediaUrl: null,
      mediaType: null,
      likeCount: 5,
      likedByUser: false,
      replyCount: 2,
    },
  ];

  return samplePosts;
};
