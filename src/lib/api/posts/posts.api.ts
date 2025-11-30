import type { HttpClient } from "../client/http-client";
import { PaginatedPost, Post, PostsGetManyQueryParams } from "./posts.types";
import { buildPostsQueryString } from "@/lib/api/posts/posts.query-builder";

export class PostsApi {
  constructor(private client: HttpClient) {}

  getMany(params?: PostsGetManyQueryParams) {
    const query = buildPostsQueryString(params);

    return this.client.get<PaginatedPost>(`/posts${query}`);
  }

  create(text: string) {
    const form = new FormData();
    form.append("text", text);

    return this.client.post<Post>("/posts", form);
  }
}
