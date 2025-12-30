"use client";

import {
  updateMeAction,
  UpdateMeActionInput,
} from "@/lib/actions/users.actions";
import {
  EditProfileModal,
  SettingsIcon,
} from "@ost-cas-fea-25-26/pp-design-system";
import { FC, useState } from "react";
import { toastAction } from "@/components/toaster";

type ProfileEditorProps = UpdateMeActionInput;

export const ProfileEditor: FC<ProfileEditorProps> = ({
  userId,
  firstname,
  lastname,
  username,
  bio,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const saveProfileData = async (data: Omit<UpdateMeActionInput, "userId">) => {
    await toastAction(updateMeAction({ ...data, userId }), {
      loading: "Saving profile…",
      success: "Profile updated successfully",
      error: "Failed to update profile",
    });

    setIsOpen(false);
  };

  return (
    <>
      <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <SettingsIcon color="primary" size="m" />
      </button>

      <EditProfileModal
        key={`${firstname}-${lastname}-${username}-${bio}`}
        open={isOpen}
        onOpenChange={setIsOpen}
        onSave={saveProfileData}
        defaultValues={{
          firstname: firstname ?? "",
          lastname: lastname ?? "",
          username: username ?? "",
          bio: bio ?? "",
        }}
      />
    </>
  );
};
