import { HttpClient } from "./client/http-client";
import { PostsApi } from "./posts/posts.api";

const httpClient = new HttpClient(process.env.API_URL);

export const api = {
  posts: new PostsApi(httpClient),
  // todo: add user api here
};
