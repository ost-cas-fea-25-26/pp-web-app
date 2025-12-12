"use client";

import { Avatar, UploadImageModal } from "@ost-cas-fea-25-26/pp-design-system";
import { FC, useState } from "react";
import Image from "next/image";
import { updateAvatarAction } from "@/lib/actions/users.actions";

type EditableAvatarProps = {
  avatarUrl: string | null;
  username: string;
  fallbackLetters: string;
  userId: string;
};

export const EditableAvatar: FC<EditableAvatarProps> = ({
  avatarUrl,
  username,
  fallbackLetters,
  userId,
}) => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const saveNewAvatarImage = async (file: File) => {
    const formData = new FormData();
    formData.append("media", file);

    const result = await updateAvatarAction(userId, formData);

    if (!result.success) {
      // TODO: Replace with a nice toast notification
      // e.g. https://ui.shadcn.com/docs/components/sonner

      // eslint-disable-next-line no-alert
      alert(`Failed to update avatar: ${result.error}`);

      return;
    }

    setIsOpenEditModal(false);
  };

  return (
    <>
      <Avatar
        onEditClick={() => setIsOpenEditModal(true)}
        imageElement={
          avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={`avatar of ${username}`}
              fill
              className="object-cover"
            />
          ) : null
        }
        size="xl"
        border
        fallbackText={fallbackLetters}
      />

      <UploadImageModal
        open={isOpenEditModal}
        onOpenChange={setIsOpenEditModal}
        onSave={saveNewAvatarImage}
      />
    </>
  );
};
