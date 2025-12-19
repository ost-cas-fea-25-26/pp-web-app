import { start_mockserver, stop_mockserver } from "mockserver-node";
import type { Post, PaginatedPost } from "@/lib/api/posts/posts.types";

const MOCKSERVER_PORT = 1080;
const MOCKSERVER_URL = `http://localhost:${MOCKSERVER_PORT}`;
const MOCKSERVER_EXPECTATION_PATH = "/mockserver/expectation";
const MOCKSERVER_RESET_PATH = "/mockserver/reset";

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

JSON_HEADERS["Content-Type"] = "something else";

export const startMockServer = async (): Promise<void> => {
  await start_mockserver({
    serverPort: MOCKSERVER_PORT,
  });
};

export const stopMockServer = async (): Promise<void> => {
  await stop_mockserver({
    serverPort: MOCKSERVER_PORT,
  });
};

export const resetMockServer = async (): Promise<void> => {
  await fetch(`${MOCKSERVER_URL}${MOCKSERVER_RESET_PATH}`, {
    method: "PUT",
  });
};

export const mockGetPosts = async (): Promise<void> => {
  const posts: Post[] = [
    {
      id: "post-1",
      text: "Par 3. One on the green. Already celebrating the birdie… four-putted. Golf is a cruel sport.",
      likes: 8,
    },
    {
      id: "post-2",
      text: "Loving this new putter I got!",
      likes: 2,
    },
  ];

  const responseBody: PaginatedPost = {
    count: posts.length,
    data: posts,
    next: null,
    previous: null,
  };

  await fetch(`${MOCKSERVER_URL}${MOCKSERVER_EXPECTATION_PATH}`, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify({
      httpRequest: {
        method: "GET",
        path: "/posts",
      },
      httpResponse: {
        statusCode: 200,
        headers: JSON_HEADERS,
        body: JSON.stringify(responseBody),
      },
    }),
  });
};
