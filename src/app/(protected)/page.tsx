import { FollowedPostList } from "@/components/followed-post-list";
import { Suspense } from "react";
import { PostSubmissionWrapper } from "@/components/post-submission-wrapper";
import { PostListSkeleton } from "@/components/post-list-skeleton";

const HomePage = () => {
  return (
    <main>
      <PostSubmissionWrapper />
      <Suspense fallback={<PostListSkeleton count={5} />}>
        <FollowedPostList />
      </Suspense>
    </main>
  );
};

export default HomePage;
