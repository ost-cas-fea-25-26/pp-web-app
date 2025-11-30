"use client";

import { FC, ReactNode } from "react";
import { Mumble, MumbleActions } from "@ost-cas-fea-25-26/pp-design-system";

type PostItemProps = {
  id: string;
  content: ReactNode;
  userName: string;
  userHandle: string;
  avatarSrc?: string;
  comments: number;
  likes: number;
};

export const PostItem: FC<PostItemProps> = ({
  id,
  content,
  userName,
  userHandle,
  avatarSrc,
  comments,
  likes,
}) => {
  return (
    <Mumble
      content={content}
      avatarSrc={avatarSrc}
      userName={userName}
      userHandle={userHandle}
      timestamp="2 hours ago"
      size="m"
      actions={
        <MumbleActions
          commentCounter={comments}
          likeCounter={likes}
          deepLink={`/mumble/${id}`}
        />
      }
    />
  );
};
