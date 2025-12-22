import { getPostsAction } from "@/lib/actions/posts.actions";
import type { FC } from "react";
import { PostItem } from "./post-item";
import type { Post } from "@/lib/api/posts/posts.types";
import { mapCreatorUserToUser } from "@/lib/mappers/user.mappers";

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
  const postsResult = await getPostsAction({
    creators: filterByCreatorsIds,
    tags: filterByTags,
    likedBy: filterLikedBy,
  });

  if (!postsResult.success) {
    return <p>Failed to load posts</p>;
  }

  const posts = postsResult.payload.data ?? [];

  const users = await Promise.all(
    posts.map((post) => mapCreatorUserToUser(post.creator ?? {})),
  );

  return (
    <div className="flex flex-col gap-2">
      {posts.map((post: Post, postIndex: number) => (
        <PostItem
          key={post.id ?? "key"}
          id={post.id ?? "id"}
          content={<p>{post.text}</p>}
          userName={users[postIndex]?.fullName}
          userHandle={users[postIndex]?.handle}
          avatarSrc={users[postIndex]?.avatarUrl}
          comments={post.replies ?? 0}
          likes={post.likes ?? 0}
          liked={!!post.likedBySelf}
        />
      ))}
    </div>
  );
};
