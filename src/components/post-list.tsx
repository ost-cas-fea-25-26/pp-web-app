import { getPostsAction } from "@/lib/actions/posts.actions";
import { FC } from "react";

export const PostList: FC = async () => {
  const posts = await getPostsAction();

  return <pre>{JSON.stringify(posts, null, 2)}</pre>;
};
