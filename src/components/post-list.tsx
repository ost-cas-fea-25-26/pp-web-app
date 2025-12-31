import { getPostsAction } from "@/lib/actions/posts.actions";
import type { FC } from "react";
import { PostItem } from "./post-item";
import { MumbleWithId, Post } from "@/lib/api/posts/posts.types";
import { mapCreatorUserToUser } from "@/lib/mappers/user.mappers";
import {
  getDeepLinkUrlByMumbleId,
  getTimestampLabelFromUlid,
} from "@/lib/utils";
import Image from "next/image";

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

  const posts: MumbleWithId[] = (postsResult.payload.data ?? []).filter(
    (reply: Post): reply is MumbleWithId => reply.id !== undefined,
  );

  const users = await Promise.all(
    posts.map((post) => mapCreatorUserToUser(post.creator ?? {})),
  );

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post: MumbleWithId, postIndex: number) => (
        <PostItem
          key={post.id}
          id={post.id}
          userName={users[postIndex].fullName}
          userHandle={users[postIndex].handle}
          avatar={
            <Image
              src={users[postIndex].avatarUrl ?? "/avatars/default.png"}
              alt={users[postIndex].fullName}
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          }
          comments={post.replies ?? 0}
          likes={post.likes ?? 0}
          liked={!!post.likedBySelf}
          timestamp={getTimestampLabelFromUlid(post.id)}
          content={<p>{post.text}</p>}
          deepLink={getDeepLinkUrlByMumbleId(post.id)}
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
    </div>
  );
};
