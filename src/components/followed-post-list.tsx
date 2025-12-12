import { FC } from "react";
import { getFolloweeIdsAction } from "@/lib/actions/users.actions";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { PostList } from "./post-list";

export const FollowedPostList: FC = async () => {
  const authenticatedUser = await getAuthenticatedUser();

  if (!authenticatedUser?.id) {
    return <p>Please log in to view followed posts.</p>;
  }

  const followeeIds = await getFolloweeIdsAction(authenticatedUser.id);

  return (
    <PostList filterByCreatorsIds={[...followeeIds, authenticatedUser.id]} />
  );
};
