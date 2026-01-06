import { FollowedPostList } from "@/components/followed-post-list";
import { Suspense } from "react";
import { PostSubmissionWrapper } from "@/components/post-submission-wrapper";
import { PostListSkeleton } from "@/components/post-list-skeleton";

const HomePage = () => (
  <>
    <div className="mt-8 space-y-2">
      <h2 className="heading-2 text-primary">Welcome to Mumble</h2>
      <p className="heading-4 text-neutral-500 mb-8">
        A modern social space for golfers.
      </p>
    </div>
    <PostSubmissionWrapper />
    <Suspense fallback={<PostListSkeleton count={5} />}>
      <FollowedPostList />
    </Suspense>
  </>
);

export default HomePage;
