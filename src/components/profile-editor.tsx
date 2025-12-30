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
    const result = await updateMeAction({ ...data, userId });

    if (!result.success) {
      console.error("Failed to update profile:", result.error);

      return;
    }

    setIsOpen(false);
  };

  return (
    <>
      <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <SettingsIcon color="primary" size="m" />
      </button>

      <EditProfileModal
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
