"use client";

import type { FC } from "react";
import { Button } from "@ost-cas-fea-25-26/pp-design-system";
import { createPostAction } from "@/lib/actions/posts.actions";

export const CreatePostButton: FC = () => {
  const handleClick = async () => {
    await createPostAction("Rory McIlroy 💚");
  };

  return <Button onClick={handleClick}>Create Post (Rory McIlroy 💚)</Button>;
};
