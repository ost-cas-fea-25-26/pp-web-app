import { HttpClient } from "./client/http-client";
import { PostsApi } from "./posts/posts.api";
import { UsersApi } from "./users/users.api";

const httpClient = new HttpClient(process.env.API_URL);

export const api = {
  posts: new PostsApi(httpClient),
  users: new UsersApi(httpClient),
};
