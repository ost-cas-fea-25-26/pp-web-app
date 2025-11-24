"use client";

import type { FC } from "react";
import { Button } from "@ost-cas-fea-25-26/pp-design-system";
import { createPostAction } from "@/lib/actions/posts.actions";
import { useRouter } from "next/navigation";

export const CreatePostButton: FC = () => {
  const router = useRouter();

  const handleClick = async () => {
    await createPostAction("Rory McIlroy 💚");
    router.refresh();
  };

  return <Button onClick={handleClick}>Create Post (Rory McIlroy 💚)</Button>;
};
