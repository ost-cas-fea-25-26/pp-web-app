"use client";

import {
  ProfileBanner,
  UploadImageModal,
} from "@ost-cas-fea-25-26/pp-design-system";
import Image from "next/image";
import { FC, useState } from "react";
import { updateBannerAction } from "@/lib/actions/users.actions";
import { toastAction } from "@/components/toaster";

type BannerProps = {
  isEditable?: boolean;
  bannerUrl: string | null;
  alt: string;
  userId: string;
};

const FALLBACK_BANNER = "/banners/default-banner.jpg";

export const Banner: FC<BannerProps> = ({
  isEditable = false,
  bannerUrl,
  alt,
  userId,
}) => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const saveNewBannerImage = async (file: File) => {
    const result = await toastAction(updateBannerAction(userId, file), {
      loading: "Updating banner…",
      success: "Banner updated successfully",
      error: "Failed to update banner",
    });

    if (!result?.success) {
      return;
    }

    setIsOpenEditModal(false);
  };

  return (
    <>
      <ProfileBanner
        onClick={isEditable ? () => setIsOpenEditModal(true) : undefined}
        imageElement={
          <Image
            src={bannerUrl ?? FALLBACK_BANNER}
            alt={alt}
            fill
            className="object-cover"
            priority
          />
        }
      />

      {isEditable && (
        <UploadImageModal
          open={isOpenEditModal}
          onOpenChange={setIsOpenEditModal}
          onSave={saveNewBannerImage}
        />
      )}
    </>
  );
};
