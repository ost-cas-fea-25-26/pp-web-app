"use client";

import { useState, FC } from "react";
import { getPostsAction } from "@/lib/actions/posts.actions";
import { MumbleWithId, Post } from "@/lib/api/posts/posts.types";
import { mapCreatorUserToUser, MumbleUser } from "@/lib/mappers/user.mappers";
import { ErrorOverlay } from "@/components/error-overlay";
import { PostListSkeleton } from "@/components/post-list-skeleton";
import { PostListProps } from "@/components/post-list";
import { Button, MumbleIcon } from "@ost-cas-fea-25-26/pp-design-system";
import { PostItems } from "@/components/post-items";

export const PostListLoader: FC<PostListProps> = ({
  mumbleBaseUrl,
  filterByTags,
  filterLikedBy,
  filterByCreatorsIds,
  currentOffset,
}) => {
  const [posts, setPosts] = useState<MumbleWithId[]>([]);
  const [users, setUsers] = useState<MumbleUser[]>([]);
  const [offset, setOffset] = useState(currentOffset);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 5;

  const fetchPosts = async () => {
    if (loading || !hasMore) {
      return;
    }
    setLoading(true);
    setError(null);

    const postsResult = await getPostsAction({
      creators: filterByCreatorsIds,
      tags: filterByTags,
      likedBy: filterLikedBy,
      offset,
      limit: LIMIT,
    });

    if (!postsResult.success) {
      setError("Failed to load posts");
      setLoading(false);

      return;
    }
    const newPosts: MumbleWithId[] = (postsResult.payload.data ?? []).filter(
      (reply: Post): reply is MumbleWithId => reply.id !== undefined,
    );
    if (newPosts.length < LIMIT) {
      setHasMore(false);
    }

    const newUsers: MumbleUser[] = await Promise.all(
      newPosts.map((post) => mapCreatorUserToUser(post.creator ?? {})),
    );
    setPosts((prev) => [...prev, ...newPosts]);
    setUsers((prev) => [...prev, ...newUsers]);
    setOffset((prev) => (prev ?? 0) + LIMIT);
    setLoading(false);
  };

  if (error) {
    return <ErrorOverlay message={error} />;
  }

  return (
    <>
      <PostItems posts={posts} users={users} mumbleBaseUrl={mumbleBaseUrl} />
      {loading && <PostListSkeleton count={LIMIT} />}
      {!loading && hasMore && (
        <div className="w-full flex justify-center items-center">
          <Button
            onClick={fetchPosts}
            variant="neutral"
            size="default"
            fullWidth={false}
          >
            Load more mumbles
            <MumbleIcon color="white" />
          </Button>
        </div>
      )}
      {!hasMore && posts.length > 0 && <div>No more posts.</div>}
    </>
  );
};
