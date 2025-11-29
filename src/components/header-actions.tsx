import { getSession } from "@/lib/auth/auth";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AvatarButton,
  IconButton,
  LogoutIcon,
  SettingsIcon,
} from "@ost-cas-fea-25-26/pp-design-system";

export const HeaderActions: FC = async () => {
  const session = await getSession();
  if (!session?.user) {
    return null;
  }

  const userLink = `/users/${session.user.zitadelId}`;

  return (
    <>
      <Link href={userLink}>
        <AvatarButton
          imageElement={
            <Image
              src="/avatars/rory.jpg"
              alt="User avatar"
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          }
          fallbackText="RM"
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
      <IconButton
        label="Log out"
        IconComponent={LogoutIcon}
        color="primary"
        layout="stacked"
      />
    </>
  );
};
