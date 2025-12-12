import { Suspense } from "react";
import {
  getPostByIdAction,
  getRepliesByPostIdAction,
} from "@/lib/actions/posts.actions";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { MumbleDetail } from "@/components/mumble-detail";
import { Post } from "@/lib/api/posts/posts.types";

type MumbleDetailPageProps = {
  params: Promise<{
    mumbleId: string;
  }>;
};

const MumbleDetailPage = async ({ params }: MumbleDetailPageProps) => {
  const { mumbleId } = await params;

  const authenticatedUser = await getAuthenticatedUser();
  if (!authenticatedUser) {
    throw new Error("User not authenticated");
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
          currentUser={authenticatedUser}
          replies={replies.payload.data ?? []}
        />
      </div>
    </Suspense>
  );
};

export default MumbleDetailPage;
