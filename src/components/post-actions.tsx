import { FC, useState } from "react";
import { likePostAction, unlikePostAction } from "@/lib/actions/posts.actions";
import {
  CommentButton,
  MumbleActions,
  ReplyFilledIcon,
  ReplyIcon,
} from "@ost-cas-fea-25-26/pp-design-system";
import Link from "next/link";

type PostActionsProps = {
  mumbleId: string;
  comments: number;
  likes: number;
  liked: boolean;
  deepLink: string;
  isReply?: boolean;
};

type LikeStateProps = {
  liked: boolean;
  likes: number;
};

export const PostActions: FC<PostActionsProps> = ({
  mumbleId,
  comments,
  likes,
  liked,
  deepLink,
  isReply = false,
}) => {
  const [likedState, setLikedState] = useState<LikeStateProps>({
    liked: liked,
    likes: likes,
  });

  const handleLikeToggle = async (nextState: boolean) => {
    if (nextState) {
      await likePostAction(mumbleId);
      setLikedState({ liked: true, likes: likedState.likes + 1 });
    } else {
      await unlikePostAction(mumbleId);
      setLikedState({ liked: false, likes: likedState.likes - 1 });
    }
  };

  let commentLabel = "Comment";
  if (comments === 1) {
    commentLabel = "1 Comment";
  } else if (comments > 1) {
    commentLabel = `${comments} Comments`;
  }

  const commentIcon =
    comments === 0 ? (
      <ReplyIcon color="neutral" />
    ) : (
      <ReplyFilledIcon color="primary" />
    );

  const commentButton = isReply ? null : (
    <Link title="View Comments" href={`/mumble/${mumbleId}`}>
      <CommentButton label={commentLabel} icon={commentIcon} />
    </Link>
  );

  return (
    <MumbleActions
      commentButton={commentButton}
      likeCounter={likedState.likes}
      deepLink={deepLink}
      onLikeToggleHandler={handleLikeToggle}
      liked={likedState.liked}
    />
  );
};
