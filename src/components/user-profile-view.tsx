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
import { EditableAvatar } from "./editable-avatar";

type UserProfileViewProps = {
  bannerUrl: string;
  avatarUrl: string | null;
  name: string;
  handle: string;
  bio: string;
  fallbackLetters: string;
  userId: string;
  isEditable: boolean;
};

export const UserProfileView: FC<UserProfileViewProps> = ({
  bannerUrl,
  avatarUrl,
  name,
  handle,
  bio,
  fallbackLetters,
  userId,
  isEditable,
}) => {
  return (
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
  );
};
