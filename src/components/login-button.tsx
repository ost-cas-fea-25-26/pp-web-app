"use client";

import { signinZitadel } from "@/lib/auth/client";
import { Button } from "@ost-cas-fea-25-26/pp-design-system";
import type { FC } from "react";

export const LoginButton: FC = () => {
  return <Button onClick={() => signinZitadel()}>Login</Button>;
};
