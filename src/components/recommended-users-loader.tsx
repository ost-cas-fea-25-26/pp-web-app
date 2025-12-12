import { getUnfollowedUserSuggestionsAction } from "@/lib/actions/users.actions";
import { RecommendedUsersView } from "./recommended-users-view";

export const RecommendedUsersLoader = async () => {
  const usersToFollow = await getUnfollowedUserSuggestionsAction();

  const items =
    usersToFollow.map((user) => ({
      id: user.id ?? "",
      avatarUrl: user.avatarUrl ?? null,
      handle: user.username ?? "unknown",
      name:
        user.firstname && user.lastname
          ? `${user.firstname} ${user.lastname}`
          : "Unknown User",
      profileUrl: `/users/${user.id}`,
    })) ?? [];

  return <RecommendedUsersView users={items} />;
};
