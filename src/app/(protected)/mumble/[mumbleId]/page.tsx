import { Suspense } from "react";
import {
  getPostByIdAction,
  getRepliesByPostIdAction,
} from "@/lib/actions/posts.actions";
import { getAuthenticatedUser, getSession } from "@/lib/auth/server";
import { MumbleDetail } from "@/components/mumble-detail";
import { getUserByIdAction } from "@/lib/actions/users.actions";

type MumbleDetailPageProps = {
  params: Promise<{
    mumbleId: string;
  }>;
};

const MumbleDetailPage = async ({ params }: MumbleDetailPageProps) => {
  const { mumbleId } = await params;

  const session = await getSession();
  const authenticatedUser = session?.user;
  if (!authenticatedUser) {
    throw new Error("User not authenticated");
  }
  const mumbleUser = await getUserByIdAction(authenticatedUser.id);
  if (!mumbleUser.success) {
    throw new Error("Failed to fetch user from mumble");
  }

  const mumble = await getPostByIdAction(mumbleId);
  if (!mumble.success) {
    throw new Error("Failed to load mumble");
  }

  const replies = await getRepliesByPostIdAction(mumbleId);
  if (!replies.success) {
    throw new Error("Failed to load replies");
  }

  return (
    <Suspense>
      <div className="gap-10 flex flex-col">
        <MumbleDetail
          mumble={mumble.payload}
          currentUser={mumbleUser.payload}
          replies={replies.payload.data ?? []}
        />
      </div>
    </Suspense>
  );
};

export default MumbleDetailPage;
