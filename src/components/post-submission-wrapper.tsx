import { FC } from "react";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { PostSubmission } from "@/components/post-submission";
import { mapUserPayloadToUser } from "@/lib/mappers/user.mappers";

export const PostSubmissionWrapper: FC = async () => {
  const authenticatedUser = await getAuthenticatedUser();
  if (!authenticatedUser) {
    throw new Error("User not authenticated");
  }
  console.info(authenticatedUser);

  return <PostSubmission user={mapUserPayloadToUser(authenticatedUser)} />;
};
