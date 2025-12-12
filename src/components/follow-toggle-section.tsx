import { getFolloweeIdsAction } from "@/lib/actions/users.actions";
import { FollowToggleClient } from "./follow-toggle-client";

type FollowToggleSectionProps = {
  userId: string;
};

export const FollowToggleSection = async ({
  userId,
}: FollowToggleSectionProps) => {
  const followeeIds = await getFolloweeIdsAction();
  const isFollowing = followeeIds.includes(userId);

  return <FollowToggleClient targetUserId={userId} isFollowing={isFollowing} />;
};
