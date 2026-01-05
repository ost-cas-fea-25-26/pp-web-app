import { start_mockserver, stop_mockserver } from "mockserver-node";
import type { Post, PaginatedPost } from "@/lib/api/posts/posts.types";
import type { User, PaginatedUser } from "@/lib/api/users/users.types";

const MOCKSERVER_PORT = 1080;
const MOCKSERVER_URL = `http://localhost:${MOCKSERVER_PORT}`;
const EXPECTATION_PATH = "/mockserver/expectation";
const RESET_PATH = "/mockserver/reset";

const JSON_HEADERS = { "Content-Type": "application/json" } as const;

export const startMockServer = async () => {
  await start_mockserver({ serverPort: MOCKSERVER_PORT, verbose: false });
};

export const stopMockServer = async () => {
  await stop_mockserver({ serverPort: MOCKSERVER_PORT });
};

export const resetMockServer = async () => {
  await fetch(`${MOCKSERVER_URL}${RESET_PATH}`, { method: "PUT" });
};

const currentUser: User = {
  id: "351340886451342425",
  firstname: "Rory",
  lastname: "McIlroy",
  username: "rory_mcilroy",
};

const tigerUser: User = {
  id: "179944860378202369",
  firstname: "Tiger",
  lastname: "Woods",
  username: "tiger_woods",
};

const posts: Post[] = [
  {
    id: "01GDMMR85BEHP8AKV8ZGGM259K",
    text: "Just made a birdie on the 18th hole!",
    likes: 8,
    likedBySelf: true,
    replies: 1,
    creator: {
      id: tigerUser.id,
      username: tigerUser.username,
      avatarUrl: tigerUser.avatarUrl,
    },
  },
  {
    id: "01GDMMR85BEHP8AKV8ZGGM259L",
    text: "Loving this new putter I got!",
    likes: 2,
    likedBySelf: false,
    replies: 0,
    creator: {
      id: currentUser.id,
      username: currentUser.username,
      avatarUrl: currentUser.avatarUrl,
    },
  },
];

export const mockGetUserById = async () => {
  await fetch(`${MOCKSERVER_URL}${EXPECTATION_PATH}`, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify({
      priority: 20,
      httpRequest: {
        method: "GET",
        path: "/users/[^/]+$",
      },
      httpResponse: {
        statusCode: 200,
        headers: JSON_HEADERS,
        body: JSON.stringify(currentUser),
      },
    }),
  });
};

export const mockGetFollowees = async () => {
  const response: PaginatedUser = {
    count: 1,
    data: [tigerUser],
    next: null,
    previous: null,
  };

  await fetch(`${MOCKSERVER_URL}${EXPECTATION_PATH}`, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify({
      priority: 15,
      httpRequest: {
        method: "GET",
        path: "/users/[^/]+/followees",
      },
      httpResponse: {
        statusCode: 200,
        headers: JSON_HEADERS,
        body: JSON.stringify(response),
      },
    }),
  });
};

export const mockGetPosts = async () => {
  const response: PaginatedPost = {
    count: posts.length,
    data: posts,
    next: null,
    previous: null,
  };

  await fetch(`${MOCKSERVER_URL}${EXPECTATION_PATH}`, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify({
      httpRequest: {
        method: "GET",
        path: "/posts.*",
      },
      httpResponse: {
        statusCode: 200,
        headers: JSON_HEADERS,
        body: JSON.stringify(response),
      },
    }),
  });
};

export const mockPostLikes = async () => {
  for (const method of ["PUT", "DELETE"]) {
    await fetch(`${MOCKSERVER_URL}${EXPECTATION_PATH}`, {
      method: "PUT",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        httpRequest: {
          method,
          path: "/posts/[^/]+/likes",
        },
        httpResponse: {
          statusCode: 204,
        },
      }),
    });
  }
};
