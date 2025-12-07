import { getPostsAction } from "@/lib/actions/posts.actions";
import { FC } from "react";
import { PostItem } from "./post-item";
import { Post } from "@/lib/api/posts/posts.types";

type PostListProps = {
  filterByTags?: string[];
  filterLikedBy?: string[];
  filterByCreatorsIds?: string[];
};

export const PostList: FC<PostListProps> = async ({
  filterByTags,
  filterLikedBy,
  filterByCreatorsIds,
}) => {
  const posts = await getPostsAction({
    creators: filterByCreatorsIds,
    tags: filterByTags,
    likedBy: filterLikedBy,
  });

  return (
    <div className="flex flex-col gap-2">
      {posts?.data?.data?.map((post: Post) => (
        <PostItem
          key={post.id ?? "key"}
          id={post.id ?? "id"}
          content={<p>{post.text}</p>}
          userName={post.creator?.username ?? "TODO: Name"}
          userHandle={post.creator?.username ?? "TODO: Handle"}
          avatarSrc={post.creator?.avatarUrl ?? undefined}
          comments={post.replies ?? 0}
          likes={post.likes ?? 0}
          liked={!!post.likedBySelf}
        />
      ))}
    </div>
  );
};
