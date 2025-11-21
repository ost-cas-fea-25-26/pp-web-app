"use client";

import { signOut } from "@/lib/auth/auth-client";
import { Button } from "@ost-cas-fea-25-26/pp-design-system";
import { useRouter } from "next/navigation";
import type { FC } from "react";

export const LogoutButton: FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.refresh();
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};
