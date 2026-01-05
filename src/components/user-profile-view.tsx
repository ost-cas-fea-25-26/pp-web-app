import { FC } from "react";
import Image from "next/image";
import {
  Avatar,
  IconButton,
  ProfileHeader,
  ProfileIcon,
  SettingsIcon,
} from "@ost-cas-fea-25-26/pp-design-system";
import { EditableAvatar } from "./editable-avatar";
import { Banner } from "./banner";
import { ProfileEditor } from "./profile-editor";

type UserProfileViewProps = {
  bannerUrl: string;
  avatarUrl: string | null;
  firstname: string;
  lastname: string;
  handle: string;
  bio: string;
  fallbackLetters: string;
  userId: string;
  isEditable: boolean;
};

export const UserProfileView: FC<UserProfileViewProps> = ({
  bannerUrl,
  avatarUrl,
  firstname,
  lastname,
  handle,
  bio,
  fallbackLetters,
  userId,
  isEditable,
}) => {
  const name = `${firstname} ${lastname}`.trim() || handle;

  return (
    <ProfileHeader
      bannerImageElement={
        <Banner
          isEditable={isEditable}
          bannerUrl={bannerUrl}
          alt={`${name} banner`}
          userId={userId}
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
          <ProfileEditor
            firstname={firstname}
            lastname={lastname}
            username={handle}
            bio={bio}
            trigger={<SettingsIcon color="primary" size="m" />}
          />
        )
      }
    />
  );
};
