import {
  getFolloweeIdsAction,
  getUserByIdAction,
} from "@/lib/actions/users.actions";
import { FollowToggleClient } from "./follow-toggle-client";
import { ErrorOverlay } from "./error-overlay";

type FollowToggleSectionProps = {
  userId: string;
};

export const FollowToggleSection = async ({
  userId,
}: FollowToggleSectionProps) => {
  const followeeIds = await getFolloweeIdsAction();
  const isFollowing = followeeIds.includes(userId);

  const userResult = await getUserByIdAction(userId);

  if (!userResult.success) {
    return <ErrorOverlay message="User not found"></ErrorOverlay>;
  }

  const user = userResult.payload;

  const name =
    `${user.firstname ?? ""} ${user.lastname ?? ""}`.trim() || "Unknown User";

  return (
    <FollowToggleClient
      name={name}
      targetUserId={userId}
      isFollowing={isFollowing}
    />
  );
};
