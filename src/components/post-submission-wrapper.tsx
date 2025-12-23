import { FC } from "react";
import { PostSubmission } from "@/components/post-submission";
import { mapUserPayloadToUser } from "@/lib/mappers/user.mappers";
import { getSession } from "@/lib/auth/server";
import { getUserByIdAction } from "@/lib/actions/users.actions";

export const PostSubmissionWrapper: FC = async () => {
  const session = await getSession();
  const authenticatedUser = session?.user;
  if (!authenticatedUser) {
    throw new Error("User not authenticated");
  }
  const mumbleUser = await getUserByIdAction(authenticatedUser.id);
  if (!mumbleUser.success) {
    throw new Error("Failed to fetch user from mumble");
  }

  return <PostSubmission user={mapUserPayloadToUser(mumbleUser.payload)} />;
};
