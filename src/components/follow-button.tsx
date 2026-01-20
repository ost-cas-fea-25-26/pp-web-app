"use client";

import { followUserAction } from "@/lib/actions/users.actions";
import { toastAction } from "@/components/toaster";
import { Button, MumbleIcon } from "@ost-cas-fea-25-26/pp-design-system";

type FollowButtonProps = {
  userId: string;
};

export const FollowButton = ({ userId }: FollowButtonProps) => {
  const handleFollow = async () => {
    await toastAction(followUserAction(userId), {
      loading: "Following user…",
      success: "You are now following this user",
      error: "Failed to follow user",
    });
  };

  return (
    <Button fullWidth variant="primary" onClick={handleFollow}>
      Follow <MumbleIcon color="white" />
    </Button>
  );
};
