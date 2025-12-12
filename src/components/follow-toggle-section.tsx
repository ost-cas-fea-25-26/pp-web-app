import { getFolloweeIdsAction } from "@/lib/actions/users.actions";
import { FollowToggleClient } from "./follow-toggle-client";

type FollowToggleSectionProps = {
  selfId: string;
  targetUserId: string;
};

export const FollowToggleSection = async ({
  selfId,
  targetUserId,
}: FollowToggleSectionProps) => {
  const followeeIds = await getFolloweeIdsAction(selfId);
  const isFollowing = followeeIds.includes(targetUserId);

  return (
    <FollowToggleClient targetUserId={targetUserId} isFollowing={isFollowing} />
  );
};
