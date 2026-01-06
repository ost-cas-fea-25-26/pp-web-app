"use client";

import { useState, FC } from "react";
import { getPostsAction } from "@/lib/actions/posts.actions";
import { PostItem } from "./post-item";
import { MumbleWithId, Post } from "@/lib/api/posts/posts.types";
import { mapCreatorUserToUser, MumbleUser } from "@/lib/mappers/user.mappers";
import { getTimestampLabelFromUlid } from "@/lib/utils";
import Image from "next/image";
import { ErrorOverlay } from "@/components/error-overlay";
import { PostListSkeleton } from "@/components/post-list-skeleton";
import { PostListProps } from "@/components/post-list";
import { Button, MumbleIcon } from "@ost-cas-fea-25-26/pp-design-system";

export const PostListLoader: FC<PostListProps> = ({
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
  const LIMIT = 3;

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
    setOffset((prev) => prev + LIMIT);
    setLoading(false);
  };

  if (error) {
    return <ErrorOverlay message={error} />;
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post: MumbleWithId, postIndex: number) => (
        <PostItem
          key={post.id}
          id={post.id}
          userName={users[postIndex]?.fullName}
          userHandle={users[postIndex]?.handle}
          avatar={
            users[postIndex].avatarUrl && (
              <Image
                src={users[postIndex].avatarUrl}
                alt={users[postIndex].fullName}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            )
          }
          comments={post.replies ?? 0}
          likes={post.likes ?? 0}
          liked={!!post.likedBySelf}
          timestamp={getTimestampLabelFromUlid(post.id)}
          content={<p>{post.text}</p>}
          deepLink={"mumble/" + post.id}
          mediaElement={
            post.mediaUrl
              ? {
                  src: post.mediaUrl,
                  alt: post.text ?? post.mediaUrl,
                }
              : undefined
          }
          profileUrl={`/users/${post.creator?.id}`}
        />
      ))}
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
    </div>
  );
};
