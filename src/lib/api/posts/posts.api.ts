import type { HttpClient } from "../client/http-client";
import type { Post, PostListResponse } from "./posts.types";

export class PostsApi {
  constructor(private client: HttpClient) {}

  getMany() {
    return this.client.get<PostListResponse>("/posts");
  }

  create(text: string) {
    const form = new FormData();
    form.append("text", text);

    return this.client.post<Post>("/posts", form);
  }
}
