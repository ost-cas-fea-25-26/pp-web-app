import { getAllUnfollowedUsersAction } from "@/lib/actions/users.actions";
import { RecommendedUsersView } from "./recommended-users-view";

export const RecommendedUsersLoader = async () => {
  const users = await getAllUnfollowedUsersAction();

  const items =
    users.map((user) => ({
      id: user.id ?? "",
      avatarUrl: user.avatarUrl ?? null,
      handle: user.username ?? "unknown",
      name:
        user.firstname && user.lastname
          ? `${user.firstname} ${user.lastname}`
          : "Unknown User",
    })) ?? [];

  return <RecommendedUsersView users={items} />;
};
