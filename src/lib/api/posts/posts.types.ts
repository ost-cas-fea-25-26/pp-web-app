import type { PaginatedResponse } from "../common/common.types";

type BasePost = {
  id: string;
  creator: string;
  text: string;
  mediaUrl: string | null;
  mediaType: string | null;
  likeCount: number;
  likedByUser: boolean;
};

export type Post = BasePost & {
  type: "post";
  replyCount: number;
};

type Reply = BasePost & {
  type: "reply";
  parentId: string;
};

type DeletedPost = {
  type: "deleted";
  id: string;
  creator: string;
  parentId: string | null;
  text?: string;
  mediaUrl?: string | null;
  mediaType?: string | null;
  likeCount?: number;
  likedByUser?: boolean;
  replyCount?: number;
};

type PostListItem = Post | Reply | DeletedPost;

export type PostListResponse = PaginatedResponse<PostListItem>;
