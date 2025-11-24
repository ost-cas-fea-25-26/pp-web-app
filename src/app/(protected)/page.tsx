import { CreatePostButton } from "@/components/create-post-button";
import { LogoutButton } from "@/components/logout-button";
import { getPostsAction } from "@/lib/actions/posts.actions";
import { getSession } from "@/lib/auth/auth";

const HomePage = async () => {
  const session = await getSession();
  const posts = await getPostsAction();

  return (
    <main>
      <p>You are logged in as {session?.user.name}</p>
      <LogoutButton />
      <CreatePostButton />

      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </main>
  );
};

export default HomePage;
