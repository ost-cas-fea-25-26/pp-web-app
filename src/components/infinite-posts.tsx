"use client";

import { loadPostsAction } from "@/lib/posts/posts.actions";
import { PostResult } from "@/lib/posts/posts.type";
import { useState, useEffect, FC } from "react";
import { useInView } from "react-intersection-observer";
import { Post } from "./post";
import { PostSkeleton } from "./post-skeleton";

type InfinitePostsProps = {
  initialPosts: PostResult[];
};

export const InfinitePosts: FC<InfinitePostsProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<PostResult[]>(initialPosts);
  const [offset, setOffset] = useState<number>(initialPosts.length);
  const [loading, setLoading] = useState<boolean>(false);

  const { ref: invisibleLoadMoreTrigger, inView } = useInView({
    rootMargin: "200px",
    triggerOnce: false,
  });

  useEffect(() => {
    if (!inView || loading) {
      return;
    }

    const loadMore = async () => {
      setLoading(true);

      const more = await loadPostsAction(offset, 10);
      setPosts((prev) => [...prev, ...more]);

      setOffset((prev) => prev + more.length);
      setLoading(false);
    };

    void loadMore();
  }, [inView, loading, offset]);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <div ref={invisibleLoadMoreTrigger} />
      {loading && <PostSkeleton />}
    </div>
  );
};
