import { getPostsAction } from "@/lib/actions/posts.actions";
import { FC } from "react";

type PostListProps = {
  filterByTags?: string[];
  filterLikedBy?: string[];
  filterByCreatorsIds?: string[];
};

export const PostList: FC = async ({
  filterByTags,
  filterLikedBy,
  filterByCreatorsIds,
}: PostListProps) => {
  const posts = await getPostsAction({
    creators: filterByCreatorsIds,
    tags: filterByTags,
    likedBy: filterLikedBy,
  });

  return (
    <>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </>
  );
};
