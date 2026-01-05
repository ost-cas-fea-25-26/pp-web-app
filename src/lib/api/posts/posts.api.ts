import type { HttpClient } from "../client/http-client";
import { PaginatedPost, Post, PostsGetManyQueryParams } from "./posts.types";
import { buildPostsQueryString } from "@/lib/api/posts/posts.query-builder";

export class PostsApi {
  constructor(private client: HttpClient) {}

  getMany(params?: PostsGetManyQueryParams) {
    const query = buildPostsQueryString(params);

    return this.client.get<PaginatedPost>(`/posts${query}`);
  }

  getById(id: string) {
    return this.client.get<Post>(`/posts/${id}`);
  }

  create(text: string, mediaBlob?: Blob, fileName?: string) {
    const form = new FormData();
    form.append("text", text);
    if (mediaBlob) {
      form.append("media", mediaBlob, fileName);
    }

    return this.client.post<Post>("/posts", form);
  }

  like(postId: string) {
    return this.client.put(`/posts/${postId}/likes`);
  }

  unlike(postId: string) {
    return this.client.delete(`/posts/${postId}/likes`);
  }

  getRepliesByPostId(postId: string) {
    return this.client.get<PaginatedPost>(`/posts/${postId}/replies`);
  }

  createReplyForPost(
    postId: string,
    text: string,
    mediaBlob?: Blob,
    fileName?: string,
  ) {
    const form = new FormData();

    form.append("text", text);

    if (mediaBlob) {
      form.append("media", mediaBlob, fileName);
    }

    return this.client.post(`/posts/${postId}/replies`, form);
  }
}
