"use client";

import type { FC } from "react";
import {
  Avatar,
  IconButton,
  MumbleDetailView,
  ProfileIcon,
} from "@ost-cas-fea-25-26/pp-design-system";
import { MumbleWithId } from "@/lib/api/posts/posts.types";
import { createReplyForPostAction } from "@/lib/actions/posts.actions";
import { MumbleUser } from "@/lib/mappers/user.mappers";
import { PostActions } from "@/components/post-actions";
import Image from "next/image";
import {
  getAvatarFallbackLetters,
  getTimestampLabelFromUlid,
} from "@/lib/utils";
import { ErrorOverlay } from "@/components/error-overlay";
import Link from "next/link";

type MumbleDetailTypeProps = {
  mumble: MumbleWithId;
  author: MumbleUser;
  replies: MumbleWithId[];
  deepLink: string;
  currentUser: MumbleUser;
};

export const MumbleDetail: FC<MumbleDetailTypeProps> = ({
  mumble,
  author,
  currentUser,
  replies,
  deepLink,
}) => {
  if (!mumble.id) {
    return <ErrorOverlay message="Failed to load mumble, try again." />;
  }

  return (
    <>
      <MumbleDetailView
        mumble={{
          id: mumble.id,
          actions: (
            <PostActions
              liked={!!mumble.likedBySelf}
              likes={mumble.likes ?? 0}
              deepLink={deepLink}
              mumbleId={mumble.id}
              comments={mumble.replies ?? 0}
            />
          ),
          avatar: (
            <Link href={`/users/${author.id}`} title={author.fullName}>
              <Image
                src={author.avatarUrl ?? "/avatars/default.png"}
                alt={author.fullName}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </Link>
          ),
          content: mumble.text,
          timestamp: getTimestampLabelFromUlid(mumble.id),
          userHandle: author.handle,
          userName: author.fullName,
          mediaElement: mumble.mediaUrl && (
            <Image
              src={mumble.mediaUrl}
              alt="Reply Media"
              width={600}
              height={450}
            />
          ),
          profileUrl: "/users/" + author.id,
          size: "l" as const,
        }}
        replies={replies.map((reply: MumbleWithId) => ({
          ...reply,
          actions: (
            <PostActions
              mumbleId={reply.id}
              comments={reply.replies ?? 0}
              likes={reply.likes ?? 0}
              liked={!!reply.likedBySelf}
              deepLink={deepLink}
              isReply={true}
            />
          ),
        }))}
        replyForm={{
          errorMessage: "Field is required",
          onSubmitHandler: async (data: {
            media: File | null | undefined;
            text: string;
          }) => {
            if (!mumble.id) {
              return (
                <ErrorOverlay message="Failed to load mumble, try again." />
              );
            }

            let mediaBlob: Blob | undefined = undefined;
            let fileName: string | undefined = undefined;

            if (data?.media instanceof File) {
              fileName = data.media.name;
              const buffer = await data.media.arrayBuffer();
              mediaBlob = new Blob([buffer], { type: data.media.type });
            }

            await createReplyForPostAction(
              mumble.id,
              data.text,
              mediaBlob,
              fileName,
            );
          },
          placeholder: "Write your reply...",
          submitButtonText: "Send Reply",
          uploadButtonText: "Upload Image",
        }}
        user={{
          avatarImageElement: (
            <Link
              href={`/users/${currentUser.id}`}
              title={currentUser.fullName}
            >
              <Avatar
                fallbackText={getAvatarFallbackLetters(
                  currentUser.firstName,
                  currentUser.lastName,
                )}
                imageElement={
                  currentUser.avatarUrl ? (
                    <Image
                      src={currentUser.avatarUrl}
                      alt={author.fullName}
                      fill
                    />
                  ) : null
                }
                size="s"
              />
            </Link>
          ),
          handle: currentUser.handle,
          iconButtons: (
            <Link href={"/users/" + currentUser.id} title="View user profile">
              <IconButton
                IconComponent={ProfileIcon}
                color="primary"
                label={currentUser.handle}
                layout="horizontal"
              />
            </Link>
          ),
          name: currentUser.fullName,
          showAvatar: true,
          size: "s",
        }}
      />
    </>
  );
};
