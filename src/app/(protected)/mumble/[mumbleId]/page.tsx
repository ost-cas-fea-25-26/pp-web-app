import { Suspense } from "react";
import { PostDetailPage } from "@/components/post-detail-page";

type MumblePageProps = {
  params: Promise<{
    mumbleId: string;
  }>;
};

const MumblePage = async ({ params }: MumblePageProps) => {
  const { mumbleId } = await params;

  return (
    <main>
      <Suspense fallback={<p>Loading post...</p>}>
        <PostDetailPage id={mumbleId} />
      </Suspense>
    </main>
  );
};

export default MumblePage;
