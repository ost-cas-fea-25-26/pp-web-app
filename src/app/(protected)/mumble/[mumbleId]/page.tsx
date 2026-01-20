import { Suspense } from "react";
import { PostDetailPage } from "@/components/post-detail-page";
import { PostListSkeleton } from "@/components/post-list-skeleton";

type MumblePageProps = {
  params: Promise<{
    mumbleId: string;
  }>;
};

const MumblePage = async ({ params }: MumblePageProps) => {
  const { mumbleId } = await params;

  return (
    <Suspense fallback={<PostListSkeleton count={1} />}>
      <PostDetailPage id={mumbleId} />
    </Suspense>
  );
};

export default MumblePage;
