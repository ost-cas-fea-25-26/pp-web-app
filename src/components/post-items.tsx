import { MumbleUser } from "@/lib/mappers/user.mappers";
import { MumbleWithId } from "@/lib/api/posts/posts.types";
import { PostItem } from "@/components/post-item";
import { FC } from "react";
import Image from "next/image";
import { getTimestampLabelFromUlid } from "@/lib/utils";

type PostItemsProps = {
  posts: MumbleWithId[];
  users: MumbleUser[];
  mumbleBaseUrl: string;
};

export const PostItems: FC<PostItemsProps> = ({
  posts,
  users,
  mumbleBaseUrl,
}) => {
  return (
    <>
      {posts.map((post: MumbleWithId, postIndex: number) => (
        <PostItem
          key={post.id}
          id={post.id}
          userName={users[postIndex].fullName}
          userHandle={users[postIndex].handle}
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
          deepLink={`${mumbleBaseUrl} + ${post.id}`}
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
    </>
  );
};
