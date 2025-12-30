import { FC } from "react";
import { PostSubmission } from "@/components/post-submission";
import { mapUserPayloadToUser } from "@/lib/mappers/user.mappers";
import { getSession } from "@/lib/auth/server";
import { getUserByIdAction } from "@/lib/actions/users.actions";
import { ErrorOverlay } from "@/components/error-overlay";

export const PostSubmissionWrapper: FC = async () => {
  const session = await getSession();
  const authenticatedUser = session?.user;
  if (!authenticatedUser) {
    return <ErrorOverlay message="You must be logged in to create a mumble." />;
  }
  const mumbleUser = await getUserByIdAction(authenticatedUser.id);
  if (!mumbleUser.success) {
    return <ErrorOverlay message="Failed to fetch user, try again." />;
  }

  return <PostSubmission user={mapUserPayloadToUser(mumbleUser.payload)} />;
};
