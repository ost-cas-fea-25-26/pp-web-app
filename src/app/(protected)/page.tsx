import { LogoutButton } from "@/components/logout-button";
import { PostList } from "@/components/post-list";
import { getSession } from "@/lib/auth/auth";
import { Suspense } from "react";

const HomePage = async () => {
  const session = await getSession();

  return (
    <main>
      <p>You are logged in as {session?.user.name}</p>
      <LogoutButton />
      <Suspense fallback={<p>Loading posts...</p>}>
        <PostList />
      </Suspense>
    </main>
  );
};

export default HomePage;
