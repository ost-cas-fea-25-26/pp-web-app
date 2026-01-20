"use client";

import { FC } from "react";
import {
  Button,
  CancelIcon,
  MumbleIcon,
} from "@ost-cas-fea-25-26/pp-design-system";
import {
  followUserAction,
  unfollowUserAction,
} from "@/lib/actions/users.actions";
import { toastAction } from "@/components/toaster";

type FollowToggleClientProps = {
  targetUserId: string;
  name: string;
  isFollowing: boolean;
};

export const FollowToggleClient: FC<FollowToggleClientProps> = ({
  targetUserId,
  name,
  isFollowing,
}) => {
  const handleClick = async () => {
    const action = isFollowing
      ? unfollowUserAction(targetUserId)
      : followUserAction(targetUserId);

    await toastAction(action, {
      loading: isFollowing ? "Unfollowing user…" : "Following user…",
      success: isFollowing
        ? "User unfollowed successfully"
        : "User followed successfully",
      error: isFollowing ? "Failed to unfollow user" : "Failed to follow user",
    });
  };

  return (
    <div className="flex items-center justify-end gap-3">
      <span className="paragraph text-neutral-500">
        {isFollowing ? `You follow ${name}` : `You do not follow ${name}`}
      </span>

      <Button
        onClick={handleClick}
        variant={isFollowing ? "neutral" : "primary"}
      >
        {isFollowing ? "Unfollow" : "Follow"}
        {isFollowing ? (
          <CancelIcon color="white" />
        ) : (
          <MumbleIcon color="white" />
        )}
      </Button>
    </div>
  );
};
