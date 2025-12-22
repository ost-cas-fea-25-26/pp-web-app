"use client";

import { FC, ReactNode, useState } from "react";
import { Mumble, MumbleActions } from "@ost-cas-fea-25-26/pp-design-system";
import { likePostAction, unlikePostAction } from "@/lib/actions/posts.actions";

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
};

type LikeStateProps = {
  liked: boolean;
  likes: number;
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
}) => {
  const [likedState, setLikedState] = useState<LikeStateProps>({
    liked: liked,
    likes: likes,
  });

  const handleLikeToggle = async (nextState: boolean) => {
    if (nextState) {
      await likePostAction(id);
      setLikedState({ liked: true, likes: likedState.likes + 1 });
    } else {
      await unlikePostAction(id);
      setLikedState({ liked: false, likes: likedState.likes - 1 });
    }
  };

  return (
    <Mumble
      id={id}
      profileUrl={"TODO"}
      content={content}
      avatar={avatar}
      userName={userName}
      userHandle={userHandle}
      timestamp={timestamp}
      size="m"
      actions={
        <MumbleActions
          commentCounter={comments}
          likeCounter={likedState.likes}
          deepLink={deepLink}
          onLikeToggleHandler={handleLikeToggle}
          liked={likedState.liked}
        />
      }
    />
  );
};
