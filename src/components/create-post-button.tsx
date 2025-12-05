"use client";

import type { FC } from "react";
import { Button } from "@ost-cas-fea-25-26/pp-design-system";
import { createPostAction } from "@/lib/actions/posts.actions";

export const CreatePostButton: FC = () => {
  const handleClick = async () => {
    const result = await createPostAction("Rory McIlroy 💚");

    if (!result.success) {
      // TODO: Replace with a nice toast notification
      // e.g. https://ui.shadcn.com/docs/components/sonner

      // eslint-disable-next-line no-alert
      alert(`Failed to create post: ${result.error ?? "Unknown error"}`);
    }
  };

  return <Button onClick={handleClick}>Create Post (Rory McIlroy 💚)</Button>;
};
