"use client";

import { Avatar, UploadImageModal } from "@ost-cas-fea-25-26/pp-design-system";
import { FC, useState } from "react";
import Image from "next/image";
import { updateAvatarAction } from "@/lib/actions/users.actions";

type EditableAvatarProps = {
  avatarUrl: string | null;
  username: string;
  fallbackLetters: string;
};

export const EditableAvatar: FC<EditableAvatarProps> = ({
  avatarUrl,
  username,
  fallbackLetters,
}) => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const saveNewAvatarImage = async (file: File) => {
    const formData = new FormData();
    formData.append("media", file);

    await updateAvatarAction(formData);
    setIsOpenEditModal(false);
    window.location.reload(); // todo error handling and revalidate path instead of full reload
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
