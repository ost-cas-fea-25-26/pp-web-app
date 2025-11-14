type BasePost = {
  id: string;
  creator: string;
  text: string;
  mediaUrl: string | null;
  mediaType: string | null;
  likeCount: number;
  likedByUser: boolean;
};

type Post = BasePost & {
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

export type PostResult = Post | Reply | DeletedPost;
