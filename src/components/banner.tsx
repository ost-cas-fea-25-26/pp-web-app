"use client";

import {
  ProfileBanner,
  UploadImageModal,
} from "@ost-cas-fea-25-26/pp-design-system";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { updateBannerAction } from "@/lib/actions/users.actions";

type BannerProps = {
  isEditable?: boolean;
  bannerUrl: string;
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
  const [currentSrc, setCurrentSrc] = useState<string>(bannerUrl);

  useEffect(() => {
    setCurrentSrc(bannerUrl);
  }, [bannerUrl]);

  const saveNewBannerImage = async (file: File) => {
    const formData = new FormData();
    formData.append("media", file);

    const result = await updateBannerAction(userId, formData);

    if (!result.success) {
      // TODO: replace with toast
      // eslint-disable-next-line no-alert
      alert(`Failed to update banner: ${result.error}`);

      return;
    }

    setCurrentSrc(`${bannerUrl}?t=${Date.now()}`);
    setIsOpenEditModal(false);
  };

  return (
    <>
      <ProfileBanner
        onClick={isEditable ? () => setIsOpenEditModal(true) : undefined}
        imageElement={
          <Image
            src={currentSrc}
            alt={alt}
            fill
            className="object-cover"
            priority
            onError={() => setCurrentSrc(FALLBACK_BANNER)}
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
