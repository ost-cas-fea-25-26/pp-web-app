import type { Metadata } from "next";
import "./globals.css";

import {
  AppShell,
  Header,
  LogoLink,
} from "@ost-cas-fea-25-26/pp-design-system";
import { ReactNode, Suspense } from "react";
import { HeaderActions } from "@/components/header-actions";

export const metadata: Metadata = {
  title: "Mumble",
  description: "Welcome to the best version of Mumble ever!",
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <body>
      <AppShell
        header={
          <Header
            logo={<LogoLink />}
            actions={
              <Suspense>
                <HeaderActions />
              </Suspense>
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
