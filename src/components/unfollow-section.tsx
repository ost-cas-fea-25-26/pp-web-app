"use client";

import { FC } from "react";
import { Button } from "@ost-cas-fea-25-26/pp-design-system";
import { unfollowUserAction } from "@/lib/actions/users.actions";

type UnfollowSection = {
  userId: string;
};

export const UnfollowSection: FC<UnfollowSection> = ({ userId }) => {
  const handleUnfollow = async () => {
    const result = await unfollowUserAction(userId);
    if (!result.success) {
      console.error("Failed to unfollow user:", result.error);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      You follow this user.
      <Button onClick={handleUnfollow} fullWidth variant="neutral">
        Unfollow
      </Button>
    </div>
  );
};
