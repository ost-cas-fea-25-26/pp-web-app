import { getPostsAction } from "@/lib/actions/posts.actions";
import type { FC } from "react";
import { MumbleWithId, Post } from "@/lib/api/posts/posts.types";
import { mapCreatorUserToUser } from "@/lib/mappers/user.mappers";
import { ErrorOverlay } from "@/components/error-overlay";
import { PostListLoader } from "./post-list-loader";
import { PostItems } from "@/components/post-items";
import { getMumbleBaseUrl } from "@/lib/utils";

export type PostListProps = {
  mumbleBaseUrl: string;
  filterByTags?: string[];
  filterLikedBy?: string[];
  filterByCreatorsIds?: string[];
  currentOffset?: number;
};

export const PostList: FC<PostListProps> = async ({
  filterByTags,
  filterLikedBy,
  filterByCreatorsIds,
  mumbleBaseUrl,
  currentOffset = 0,
}) => {
  const LIMIT = 5;

  const postsResult = await getPostsAction({
    creators: filterByCreatorsIds,
    tags: filterByTags,
    likedBy: filterLikedBy,
    offset: currentOffset,
    limit: LIMIT,
  });

  if (!postsResult.success) {
    return <ErrorOverlay message="Failed to load posts" />;
  }

  const posts: MumbleWithId[] = (postsResult.payload.data ?? []).filter(
    (reply: Post): reply is MumbleWithId => reply.id !== undefined,
  );

  const users = await Promise.all(
    posts.map((post) => mapCreatorUserToUser(post.creator ?? {})),
  );

  return (
    <div className="flex flex-col gap-4">
      <PostItems
        posts={posts}
        users={users}
        mumbleBaseUrl={getMumbleBaseUrl()}
      />
      <PostListLoader
        filterByTags={filterByTags}
        filterLikedBy={filterLikedBy}
        filterByCreatorsIds={filterByCreatorsIds}
        currentOffset={LIMIT}
        mumbleBaseUrl={mumbleBaseUrl}
      />
    </div>
  );
};
