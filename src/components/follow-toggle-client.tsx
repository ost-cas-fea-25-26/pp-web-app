"use client";

import { FC } from "react";
import { Button } from "@ost-cas-fea-25-26/pp-design-system";
import {
  followUserAction,
  unfollowUserAction,
} from "@/lib/actions/users.actions";

type FollowToggleClientProps = {
  targetUserId: string;
  isFollowing: boolean;
};

export const FollowToggleClient: FC<FollowToggleClientProps> = ({
  targetUserId,
  isFollowing,
}) => {
  const handleClick = async () => {
    const result = isFollowing
      ? await unfollowUserAction(targetUserId)
      : await followUserAction(targetUserId);

    if (!result.success) {
      // TODO: Replace with a nice toast notification
      // e.g. https://ui.shadcn.com/docs/components/sonner

      // eslint-disable-next-line no-alert
      alert(
        `Failed to ${isFollowing ? "unfollow" : "follow"} user: ${result.error}`,
      );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {isFollowing ? "You follow this user." : "You do not follow this user."}

      <Button
        onClick={handleClick}
        fullWidth
        variant={isFollowing ? "neutral" : "primary"}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};
