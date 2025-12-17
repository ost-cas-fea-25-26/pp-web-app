import type { Metadata } from "next";
import "./globals.css";

import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Mumble",
  description: "Welcome to the best version of Mumble ever!",
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  console.log("Rendering RootLayout");
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
