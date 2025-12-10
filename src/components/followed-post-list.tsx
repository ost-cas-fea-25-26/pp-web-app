import { FC } from "react";
import { getFolloweesAction } from "@/lib/actions/users.actions";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { PostList } from "./post-list";

export const FollowedPostList: FC = async () => {
  const authenticatedUser = await getAuthenticatedUser();

  if (!authenticatedUser?.id) {
    return <p>Please log in to view followed posts.</p>;
  }

  const followees = await getFolloweesAction(authenticatedUser.id);

  const followeeIds: string[] = followees.success
    ? (followees.data?.data
        ?.map((u) => u.id)
        .filter((id): id is string => typeof id === "string") ?? [])
    : [];

  return (
    <PostList filterByCreatorsIds={[...followeeIds, authenticatedUser.id]} />
  );
};
