"use client";

import { FC } from "react";
import {
  Avatar,
  MumbleForm,
  MumbleSubmission,
  Toaster,
} from "@ost-cas-fea-25-26/pp-design-system";
import { MumbleUser } from "@/lib/mappers/user.mappers";
import { createMumble } from "@/lib/helpers/create-mumble.helpers";

type PostSubmissionProps = {
  user: MumbleUser;
};

export const PostSubmission: FC<PostSubmissionProps> = ({ user }) => {
  return (
    <div className="mb-4">
      <Toaster />
      <MumbleSubmission
        avatar={
          <Avatar
            fallbackText="RM"
            imageElement={
              <img
                alt={user.fullName}
                className="object-cover w-full h-full"
                src={user.avatarUrl}
              />
            }
            size="m"
          />
        }
        form={
          <MumbleForm
            errorMessage="Text is required"
            onSubmitHandler={createMumble}
            placeholder="What's happening?"
            submitButtonText="submit"
            title="Share your thoughts"
            uploadButtonText="Upload media"
          />
        }
      />
    </div>
  );
};
