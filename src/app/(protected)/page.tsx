import { CreatePostButton } from "@/components/create-post-button";
import { FollowedPostList } from "@/components/followed-post-list";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <main>
      <CreatePostButton />
      <Suspense fallback={<p>Loading posts...</p>}>
        <FollowedPostList />
      </Suspense>
    </main>
  );
};

export default HomePage;
