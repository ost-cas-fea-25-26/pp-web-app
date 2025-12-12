import { FC } from "react";
import Image from "next/image";
import { UserCard } from "@ost-cas-fea-25-26/pp-design-system";
import { FollowButton } from "./follow-button";
import Link from "next/link";

type RecommendedUserItem = {
  id: string;
  avatarUrl: string | null;
  handle: string;
  name: string;
  profileUrl: string;
};

type RecommendedUsersViewProps = {
  users: RecommendedUserItem[];
};

export const RecommendedUsersView: FC<RecommendedUsersViewProps> = ({
  users,
}) => {
  if (users.length === 0) {
    return <p>No recommendations available.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <UserCard
          key={user.id}
          profileUrl={user.profileUrl}
          avatarImageElement={
            user.avatarUrl && (
              <Link href={user.profileUrl}>
                <Image
                  fill
                  alt={`avatar of ${user.handle}`}
                  className="object-cover"
                  src={user.avatarUrl}
                />
              </Link>
            )
          }
          button={<FollowButton userId={user.id} />}
          handle={user.handle}
          name={user.name}
        />
      ))}
    </div>
  );
};
