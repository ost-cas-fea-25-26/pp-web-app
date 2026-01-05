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
      <main>
        <h1 className="sr-only">Mumble</h1>
        <Toaster />
        {children}
      </main>
    </body>
  </html>
);

export default RootLayout;
