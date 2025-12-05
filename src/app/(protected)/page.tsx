import { CreatePostButton } from "@/components/create-post-button";
import { PostList } from "@/components/post-list";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <main>
      <CreatePostButton />
      <Suspense fallback={<p>Loading posts...</p>}>
        <PostList />
      </Suspense>
    </main>
  );
};

export default HomePage;
