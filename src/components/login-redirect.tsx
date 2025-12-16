"use client";

import { useEffect, type FC } from "react";
import { signinZitadel } from "@/lib/auth/client";

export const LoginRedirect: FC = () => {
  useEffect(() => {
    void signinZitadel();
  }, []);

  return null;
};
