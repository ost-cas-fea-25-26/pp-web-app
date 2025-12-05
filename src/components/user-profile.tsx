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
import { getAvatarFallbackLetters } from "@/lib/utils";
import { EditableAvatar } from "./editable-avatar";

type UserProfileProps = {
  userId: string;
  isEditable: boolean;
};

export const UserProfile: FC<UserProfileProps> = async ({
  userId,
  isEditable,
}) => {
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
  const bio =
    "Unschnöseliger Golfer, Drummer, Lieblings-Superheld: Tony Stark, Escape Room Fan, der einzige Informatiker ohne Kaffeesucht. Oft mit Kinderwagen am Bodensee anzutreffen.";

  const fallbackLetters = getAvatarFallbackLetters(
    userData.firstname,
    userData.lastname,
  );

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
          isEditable ? (
            <EditableAvatar
              avatarUrl={avatarUrl}
              username={handle}
              fallbackLetters={fallbackLetters}
              userId={userId}
            />
          ) : (
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
          )
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
          isEditable && (
            <Link href="/settings" title="Settings">
              <SettingsIcon color="primary" size="m" />
            </Link>
          )
        }
      />
    </>
  );
};
