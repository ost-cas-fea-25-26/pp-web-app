import { CreatePostButton } from "@/components/create-post-button";
import { LogoutButton } from "@/components/logout-button";
import { PostList } from "@/components/post-list";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { Suspense } from "react";

const HomePage = async () => {
  const user = await getAuthenticatedUser();

  return (
    <main>
      <p>You are logged in as {user?.username}</p>
      <LogoutButton />
      <CreatePostButton />
      <Suspense fallback={<p>Loading posts...</p>}>
        <PostList />
      </Suspense>
    </main>
  );
};

export default HomePage;
