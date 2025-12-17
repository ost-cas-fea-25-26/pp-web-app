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

export const HeaderActions: FC = async () => {
  const result = await api.users.getMe();

  if (!result?.success) {
    return null;
  }

  const user = result.payload;

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

      <IconButton
        label="Settings"
        IconComponent={SettingsIcon}
        animation="rotate"
        color="primary"
        layout="stacked"
      />
      <LogoutButton />
    </>
  );
};
