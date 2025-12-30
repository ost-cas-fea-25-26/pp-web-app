import type { Metadata } from "next";
import "./globals.css";

import { ReactNode } from "react";
import { Toaster } from "@/components/toaster";

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
      <Toaster />
      {children}
    </body>
  </html>
);

export default RootLayout;
