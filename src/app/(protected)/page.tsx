import { FollowedPostList } from "@/components/followed-post-list";
import { Suspense } from "react";
import { PostSubmissionWrapper } from "@/components/post-submission-wrapper";

const HomePage = () => {
  return (
    <main>
      <PostSubmissionWrapper />
      <Suspense fallback={<p>Loading posts...</p>}>
        <FollowedPostList />
      </Suspense>
    </main>
  );
};

export default HomePage;
