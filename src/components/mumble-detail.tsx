"use client";

import type { FC } from "react";
import {
  IconButton,
  MumbleActions,
  MumbleDetailView,
  ProfileIcon,
} from "@ost-cas-fea-25-26/pp-design-system";
import { Post } from "@/lib/api/posts/posts.types";
import { User } from "@/lib/api/users/users.types";
import { createReplyForPostAction } from "@/lib/actions/posts.actions";

type MumbleDetailTypeProps = {
  mumble: Post;
  currentUser: User;
  replies: Post[];
};

export const MumbleDetail: FC<MumbleDetailTypeProps> = ({
  mumble,
  currentUser,
  replies,
}) => {
  if (!mumble.id) {
    throw new Error("Mumble id is required");
  }

  const currentUserFullName =
    currentUser.firstname + " " + currentUser.lastname;

  return (
    <MumbleDetailView
      mumble={{
        actions: (
          <MumbleActions
            commentCounter={mumble.replies}
            deepLink="/mumbles/" // TODO: replace with actual link
            likeCounter={mumble.likes ?? 0}
          />
        ),
        avatarSrc: mumble.creator?.avatarUrl,
        content: mumble.text,
        size: "l",
        timestamp: "2h ago",
        userHandle: mumble.creator?.username,
        userName: "Rory McIlroy", // TODO: replace with actual name
        mediaElement: mumble.mediaUrl ? ( // TODO: next.js img component
          <img src={mumble.mediaUrl} alt={"Reply Media"} />
        ) : null,
      }}
      replies={replies.map((reply: Post) => {
        return {
          id: reply.id,
          content: reply.text,
          userName: reply.creator?.username,
          userHandle: reply.creator?.username,
          avatarSrc: reply.creator?.avatarUrl,
          timestamp: "1h ago",
          mediaElement: reply.mediaUrl ? ( // TODO: next.js img component
            <img src={reply.mediaUrl} alt={"Reply Media"} />
          ) : null,
        };
      })}
      replyForm={{
        errorMessage: "Field is required",
        onSubmitHandler: async (data: {
          media: File | null | undefined;
          replyContent: string;
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
            data.replyContent,
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
            alt={currentUserFullName}
            className="object-cover w-full h-full"
            src={currentUser.avatarUrl ?? ""}
          />
        ),
        handle: "tommy",
        iconButtons: (
          <IconButton
            IconComponent={ProfileIcon}
            color="primary"
            label={currentUser.username ?? "User"}
            layout="horizontal"
          />
        ),
        name: currentUserFullName,
        showAvatar: true,
        size: "s",
      }}
    />
  );
};
