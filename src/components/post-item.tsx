"use client";

import { FC, ReactNode } from "react";
import Link from "next/link";
import { Mumble } from "@ost-cas-fea-25-26/pp-design-system";
import { PostActions } from "@/components/post-actions";

type PostItemProps = {
  id: string;
  content: ReactNode;
  userName: string;
  userHandle: string;
  avatar?: ReactNode;
  comments: number;
  likes: number;
  liked: boolean;
  timestamp: string;
  deepLink: string;
  mediaElement?: {
    alt: string;
    src: string;
  };
  profileUrl: string;
};

export const PostItem: FC<PostItemProps> = ({
  id,
  content,
  userName,
  userHandle,
  avatar,
  comments,
  likes,
  liked,
  timestamp,
  deepLink,
  mediaElement,
  profileUrl,
}) => {
  return (
    <Mumble
      id={id}
      content={content}
      userName={userName}
      userHandle={userHandle}
      profileUrl={profileUrl}
      avatar={avatar && <Link href={profileUrl}>{avatar}</Link>}
      timestamp={timestamp}
      size="l"
      actions={
        <PostActions
          liked={liked}
          likes={likes}
          deepLink={deepLink}
          mumbleId={id}
          comments={comments}
        />
      }
      mediaElement={
        mediaElement && (
          <img
            alt={mediaElement.alt}
            className="object-cover w-full h-full"
            src={mediaElement.src}
          />
        )
      }
    />
  );
};
