import { PostResult } from "@/lib/posts/posts.type";
import { FC } from "react";

type PostProps = {
  post: PostResult;
};

export const Post: FC<PostProps> = ({ post }) => {
  return (
    <div className="h-96 border border-gray-200">
      <p className="text-gray-800">{post.text}</p>
    </div>
  );
};
