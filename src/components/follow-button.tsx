"use client";

import { followUserAction } from "@/lib/actions/users.actions";
import { Button, MumbleIcon } from "@ost-cas-fea-25-26/pp-design-system";

type FollowButtonProps = {
  userId: string;
};

export const FollowButton = ({ userId }: FollowButtonProps) => {
  const handleFollow = async () => {
    await followUserAction(userId);
  };

  return (
    <Button fullWidth variant="primary" onClick={handleFollow}>
      Follow <MumbleIcon color="white" />
    </Button>
  );
};
