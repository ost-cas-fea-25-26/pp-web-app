"use client";

import {
  updateMeAction,
  UpdateMeActionInput,
} from "@/lib/actions/users.actions";
import { EditProfileModal } from "@ost-cas-fea-25-26/pp-design-system";
import { FC, useState } from "react";
import { toastAction } from "@/components/toaster";

type ProfileEditorProps = UpdateMeActionInput & {
  trigger: React.ReactElement;
};

export const ProfileEditor: FC<ProfileEditorProps> = ({
  firstname,
  lastname,
  username,
  bio,
  trigger,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const saveProfileData = async (data: UpdateMeActionInput) => {
    await toastAction(updateMeAction(data), {
      loading: "Saving profile…",
      success: "Profile updated successfully",
      error: "Failed to update profile",
    });

    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="cursor-pointer bg-transparent p-0 border-none"
      >
        {trigger}
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
