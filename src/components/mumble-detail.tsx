"use client";

import type { FC } from "react";
import {
  IconButton,
  MumbleActions,
  MumbleDetailView,
  ProfileIcon,
} from "@ost-cas-fea-25-26/pp-design-system";
import { Post } from "@/lib/api/posts/posts.types";
import { createReplyForPostAction } from "@/lib/actions/posts.actions";
import { MumbleUser } from "@/lib/mappers/user.mappers";

type MumbleDetailTypeProps = {
  mumble: Post;
  author: MumbleUser;
  replies: Post[];
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
    throw new Error("Mumble id is required");
  }

  return (
    <MumbleDetailView
      mumble={{
        id: mumble.id,
        actions: (
          <MumbleActions
            commentCounter={mumble.replies}
            deepLink={deepLink}
            likeCounter={mumble.likes ?? 0}
            liked={!!mumble.likedBySelf}
          />
        ),
        avatarSrc: author.avatarUrl,
        content: mumble.text,
        timestamp: "2h ago",
        userHandle: author.handle,
        userName: author.fullName,
        mediaElement: mumble.mediaUrl ? (
          <img src={mumble.mediaUrl} alt={"Reply Media"} />
        ) : null,
        profileUrl: "/users/" + author.id,
        size: "l" as const,
      }}
      replies={replies}
      replyForm={{
        errorMessage: "Field is required",
        onSubmitHandler: async (data: {
          media: File | null | undefined;
          text: string;
        }) => {
          if (!mumble.id) {
            throw new Error("Mumble id is required");
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
          <img // TODO: next.js img component
            alt={currentUser.fullName}
            className="object-cover w-full h-full"
            src={currentUser.avatarUrl}
          />
        ),
        handle: currentUser.handle,
        iconButtons: (
          <IconButton
            IconComponent={ProfileIcon}
            color="primary"
            label={currentUser.handle}
            layout="horizontal"
          />
        ),
        name: currentUser.fullName,
        showAvatar: true,
        size: "s",
      }}
    />
  );
};
