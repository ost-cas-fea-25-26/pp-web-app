import { start_mockserver, stop_mockserver } from "mockserver-node";

const MOCKSERVER_PORT = 1080;
const MOCKSERVER_URL = `http://localhost:${MOCKSERVER_PORT}`;

export const startMockServer = async (): Promise<void> => {
  await start_mockserver({
    serverPort: MOCKSERVER_PORT,
    // enable verbose logging for easier debugging
    // verbose: true,
  });
};

export const stopMockServer = async (): Promise<void> => {
  await stop_mockserver({
    serverPort: MOCKSERVER_PORT,
  });
};

export const resetMockServer = async (): Promise<void> => {
  await fetch(`${MOCKSERVER_URL}/mockserver/reset`, {
    method: "PUT",
  });
};

export const mockGetUser = async (): Promise<void> => {
  await fetch(`${MOCKSERVER_URL}/mockserver/expectation`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      httpRequest: {
        method: "GET",
        path: "/users/.*",
      },
      httpResponse: {
        statusCode: 200,
        headers: {
          "Content-Type": ["application/json"],
        },
        body: JSON.stringify({
          id: "351340886451342425",
          name: "Rory McIlroy 💚",
        }),
      },
    }),
  });
};

export const mockGetFollowees = async (): Promise<void> => {
  await fetch(`${MOCKSERVER_URL}/mockserver/expectation`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      httpRequest: {
        method: "GET",
        path: "/users/.*/followees",
      },
      httpResponse: {
        statusCode: 200,
        headers: {
          "Content-Type": ["application/json"],
        },
        body: JSON.stringify({
          data: [],
        }),
      },
    }),
  });
};

export const mockGetPosts = async (): Promise<void> => {
  await fetch(`${MOCKSERVER_URL}/mockserver/expectation`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      httpRequest: {
        method: "GET",
        path: "/posts",
      },
      httpResponse: {
        statusCode: 200,
        headers: {
          "Content-Type": ["application/json"],
        },
        body: JSON.stringify({
          data: [
            {
              id: "post-1",
              text: "Just made a birdie on the 18th hole!",
              likes: 0,
            },
          ],
        }),
      },
    }),
  });
};

export const mockCreatePost = async (): Promise<void> => {
  await fetch(`${MOCKSERVER_URL}/mockserver/expectation`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      httpRequest: {
        method: "POST",
        path: "/posts",
      },
      httpResponse: {
        statusCode: 200,
        headers: {
          "Content-Type": ["application/json"],
        },
        body: JSON.stringify({
          id: "post-1",
          text: "Just made a birdie on the 18th hole!",
          likes: 0,
        }),
      },
    }),
  });
};
