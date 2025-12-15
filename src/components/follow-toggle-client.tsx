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
    <div className="flex items-center justify-end gap-3">
      <span className="paragraph text-neutral-500">
        {isFollowing ? `You follow ${name}` : `You do not follow ${name}`}
      </span>

      <Button
        onClick={handleClick}
        variant={isFollowing ? "neutral" : "primary"}
      >
        <>
          {isFollowing ? "Unfollow" : "Follow"}
          {isFollowing ? (
            <CancelIcon color="white" />
          ) : (
            <MumbleIcon color="white" />
          )}
        </>
      </Button>
    </div>
  );
};
