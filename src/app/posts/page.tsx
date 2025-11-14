import { InfinitePosts } from "@/components/infinite-posts";
import { loadPostsAction } from "@/lib/posts/posts.actions";

const Posts = async () => {
  const initialPosts = await loadPostsAction(0, 5);

  return <InfinitePosts initialPosts={initialPosts} />;
};

export default Posts;
