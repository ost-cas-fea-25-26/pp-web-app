"use client";

import { Avatar, UploadImageModal } from "@ost-cas-fea-25-26/pp-design-system";
import { FC, useState } from "react";
import Image from "next/image";

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
  const saveNewAvatarImage = () => {
    setIsOpenEditModal(false);
    //todo: implement saving logic
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
