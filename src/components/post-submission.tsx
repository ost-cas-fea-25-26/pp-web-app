"use client";

import { FC } from "react";
import {
  Avatar,
  MumbleForm,
  MumbleSubmission,
} from "@ost-cas-fea-25-26/pp-design-system";
import { MumbleUser } from "@/lib/mappers/user.mappers";
import { getAvatarFallbackLetters } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { createMumble } from "@/lib/helpers/create-mumble";

type PostSubmissionProps = {
  user: MumbleUser;
};

export const PostSubmission: FC<PostSubmissionProps> = ({ user }) => {
  return (
    <div className="mb-4">
      <MumbleSubmission
        avatar={
          <Link href={`/users/${user.id}`} title={user.fullName}>
            <Avatar
              fallbackText={getAvatarFallbackLetters(
                user.firstName,
                user.lastName,
              )}
              imageElement={
                user.avatarUrl ? (
                  <Image src={user.avatarUrl} alt={user.fullName} fill />
                ) : null
              }
              size="m"
            />
          </Link>
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
