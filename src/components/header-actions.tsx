import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AvatarButton,
  IconButton,
  SettingsIcon,
} from "@ost-cas-fea-25-26/pp-design-system";
import { getAvatarFallbackLetters } from "@/lib/utils";
import { LogoutButton } from "./logout-button";
import { api } from "@/lib/api";
import { ProfileEditor } from "./profile-editor";
import { usersRepository } from "@/lib/db/repositories/users.repository";

export const HeaderActions: FC = async () => {
  const result = await api.users.getMe();

  if (!result?.success) {
    return null;
  }

  const user = result.payload;

  if (!user.id) {
    return null;
  }

  const bioResult = await usersRepository.getBioByUserId(user.id);
  if (!bioResult.success) {
    return <p>User not found</p>;
  }

  const bio = bioResult.payload ?? "";

  const userLink = `/users/${user.id}`;
  const avatarUrl = user.avatarUrl;
  const fallbackLetters = getAvatarFallbackLetters(
    user.firstname,
    user.lastname,
  );

  return (
    <>
      <Link href={userLink}>
        <AvatarButton
          imageElement={
            avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="User avatar"
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            ) : null
          }
          fallbackText={fallbackLetters}
          size="s"
        />
      </Link>

      <ProfileEditor
        firstname={user.firstname ?? ""}
        lastname={user.lastname ?? ""}
        username={user.username ?? ""}
        bio={bio}
        trigger={
          <IconButton
            label="Settings"
            IconComponent={SettingsIcon}
            animation="rotate"
            color="primary"
            layout="stacked"
          />
        }
      />
      <LogoutButton />
    </>
  );
};
