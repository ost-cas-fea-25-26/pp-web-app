import { FC } from "react";
import { PostSubmission } from "@/components/post-submission";
import { mapUser } from "@/lib/mappers/user.mappers";
import { ErrorOverlay } from "@/components/error-overlay";
import { api } from "@/lib/api";

export const PostSubmissionWrapper: FC = async () => {
  const currentUser = await api.users.getMe();
  if (!currentUser?.success) {
    return <ErrorOverlay message="Failed to fetch user, try again." />;
  }

  return <PostSubmission user={mapUser(currentUser.payload)} />;
};
