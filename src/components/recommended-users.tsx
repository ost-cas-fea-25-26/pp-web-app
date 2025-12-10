import { getUsersAction } from "@/lib/actions/users.actions";
import {
  Button,
  MumbleIcon,
  UserCard,
} from "@ost-cas-fea-25-26/pp-design-system";
import { FC } from "react";
import Image from "next/image";

export const RecommendedUsers: FC = async () => {
  const allUsersResult = await getUsersAction();

  if (!allUsersResult.success) {
    return <div>Failed to load recommended users.</div>;
  }

  const allUsers = allUsersResult.data?.data ?? [];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {allUsers?.map((user) => (
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
            button={
              <Button fullWidth variant="primary">
                Follow
                <MumbleIcon color="white" />
              </Button>
            }
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
