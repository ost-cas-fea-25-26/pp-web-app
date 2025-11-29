import { getUserByIdAction } from "@/lib/actions/users.actions";
import { FC } from "react";
import Image from "next/image";
import {
  Avatar,
  IconButton,
  Link,
  ProfileBanner,
  ProfileHeader,
  ProfileIcon,
  SettingsIcon,
} from "@ost-cas-fea-25-26/pp-design-system";

type UserProfileProps = {
  userId: string;
};

export const UserProfile: FC<UserProfileProps> = async ({ userId }) => {
  const user = await getUserByIdAction(userId);
  if (!user?.success || !user.data) {
    return <p>User not found</p>;
  }

  const userData = user.data;

  const bannerUrl = "/banners/rory-mcilroy.jpg";
  const avatarUrl = userData.avatarUrl ?? null;

  const name =
    `${userData.firstname ?? ""} ${userData.lastname ?? ""}`.trim() ??
    "Unknown User";

  const handle = userData.username ?? "unknown";
  const bio = "This is my bio!";

  const fallbackLetters = name?.slice(0, 2).toUpperCase() ?? "UN";

  return (
    <>
      <ProfileHeader
        bannerImageElement={
          <ProfileBanner
            imageElement={
              <Image
                src={bannerUrl}
                alt={`${name} banner`}
                fill
                className="object-cover"
                priority
              />
            }
          />
        }
        avatarImageElement={
          <Avatar
            imageElement={
              avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={`${name} avatar`}
                  fill
                  className="object-cover"
                />
              ) : null
            }
            size="xl"
            border
            fallbackText={fallbackLetters}
          />
        }
        name={name}
        handle={handle}
        bio={bio}
        iconButtons={
          <IconButton
            IconComponent={ProfileIcon}
            color="primary"
            label={handle}
            layout="horizontal"
          />
        }
        settingsLinkElement={
          <Link href="/settings" title="Settings">
            <SettingsIcon color="primary" size="m" />
          </Link>
        }
      />
    </>
  );
};
