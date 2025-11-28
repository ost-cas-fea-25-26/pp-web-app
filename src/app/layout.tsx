import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

import {
  AppShell,
  AvatarButton,
  Header,
  IconButton,
  LogoLink,
  LogoutIcon,
  SettingsIcon,
} from "@ost-cas-fea-25-26/pp-design-system";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Mumble",
  description: "Welcome to the best version of Mumble ever!",
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body>
      <AppShell
        header={
          <Header
            logo={<LogoLink href="/" />}
            actions={
              <>
                <Link href="/profile">
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
            }
          />
        }
      >
        {children}
      </AppShell>
    </body>
  </html>
);

export default RootLayout;
