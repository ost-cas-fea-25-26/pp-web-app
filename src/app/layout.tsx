import type { Metadata, Viewport } from "next";
import "./globals.css";

import { ReactNode } from "react";
import { Toaster } from "@/components/toaster";

const APP_NAME = "Mumble App";
const APP_DEFAULT_TITLE = "Best Version of Mumble";
const APP_TITLE_TEMPLATE = "%s - Mumble App";
const APP_DESCRIPTION = "Best version of Mumble for all your chatting needs.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en" dir="ltr">
    <body>
      <Toaster />
      {children}
    </body>
  </html>
);

export default RootLayout;
