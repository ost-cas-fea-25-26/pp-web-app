import { FC } from "react";
import { getFolloweeIdsAction } from "@/lib/actions/users.actions";
import { getSession } from "@/lib/auth/server";
import { PostList } from "./post-list";
import { getMumbleBaseUrl } from "@/lib/utils";

export const FollowedPostList: FC = async () => {
  const session = await getSession();

  if (!session?.user?.id) {
    return <p>Please log in to view followed posts.</p>;
  }

  const followeeIds = await getFolloweeIdsAction();

  return (
    <PostList
      filterByCreatorsIds={[...followeeIds, session.user.id]}
      mumbleBaseUrl={getMumbleBaseUrl()}
    />
  );
};
