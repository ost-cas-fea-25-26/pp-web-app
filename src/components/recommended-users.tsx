import { getAllUnfollowedUsersAction } from "@/lib/actions/users.actions";
import { UserCard } from "@ost-cas-fea-25-26/pp-design-system";
import { FC } from "react";
import Image from "next/image";
import { FollowButton } from "./follow-button";

export const RecommendedUsers: FC = async () => {
  const unfollowedUsers = await getAllUnfollowedUsersAction();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {unfollowedUsers?.map((user) => (
        <div key={user.id}>
          <UserCard
            avatarImageElement={
              user.avatarUrl && (
                <Image
                  fill
                  alt={`avatar of ${user.username}`}
                  className="object-cover"
                  src={user.avatarUrl}
                />
              )
            }
            button={user.id && <FollowButton userId={user.id} />}
            handle={user.username ?? "unknown"}
            name={
              user.firstname && user.lastname
                ? `${user.firstname} ${user.lastname}`
                : "Unknown User"
            }
          />
        </div>
      ))}
    </div>
  );
};
