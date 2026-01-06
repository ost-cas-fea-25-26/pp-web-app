"use client";

import { FC, useReducer } from "react";
import { getPostsAction } from "@/lib/actions/posts.actions";
import { MumbleWithId, Post } from "@/lib/api/posts/posts.types";
import { mapCreatorUserToUser, MumbleUser } from "@/lib/mappers/user.mappers";
import { ErrorOverlay } from "@/components/error-overlay";
import { PostListSkeleton } from "@/components/post-list-skeleton";
import { PostListProps } from "@/components/post-list";
import { Button, MumbleIcon } from "@ost-cas-fea-25-26/pp-design-system";
import { PostItems } from "@/components/post-items";

const LIMIT = 5;

type State = {
  posts: MumbleWithId[];
  users: MumbleUser[];
  offset: number;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
};

type Action =
  | { type: "FETCH_START" }
  | {
      type: "FETCH_SUCCESS";
      posts: MumbleWithId[];
      users: MumbleUser[];
    }
  | { type: "FETCH_ERROR"; error: string }
  | { type: "NO_MORE" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };

    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: [...state.posts, ...action.posts],
        users: [...state.users, ...action.users],
        offset: state.offset + LIMIT,
      };

    case "NO_MORE":
      return { ...state, hasMore: false };

    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export const PostListLoader: FC<PostListProps> = ({
  mumbleBaseUrl,
  filterByTags,
  filterLikedBy,
  filterByCreatorsIds,
  currentOffset = 0,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    posts: [],
    users: [],
    offset: currentOffset,
    loading: false,
    error: null,
    hasMore: true,
  });

  const fetchPosts = async () => {
    if (state.loading || !state.hasMore) {
      return;
    }

    dispatch({ type: "FETCH_START" });

    const result = await getPostsAction({
      creators: filterByCreatorsIds,
      tags: filterByTags,
      likedBy: filterLikedBy,
      offset: state.offset,
      limit: LIMIT,
    });

    if (!result.success) {
      dispatch({ type: "FETCH_ERROR", error: "Failed to load posts" });

      return;
    }

    const newPosts: MumbleWithId[] = (result.payload.data ?? []).filter(
      (post: Post): post is MumbleWithId => post.id !== undefined
    );

    if (newPosts.length < LIMIT) {
      dispatch({ type: "NO_MORE" });
    }

    const newUsers = await Promise.all(
      newPosts.map((post) => mapCreatorUserToUser(post.creator ?? {}))
    );

    dispatch({
      type: "FETCH_SUCCESS",
      posts: newPosts,
      users: newUsers,
    });
  };

  if (state.error) {
    return <ErrorOverlay message={state.error} />;
  }

  return (
    <>
      <PostItems
        posts={state.posts}
        users={state.users}
        mumbleBaseUrl={mumbleBaseUrl}
      />

      {state.loading && <PostListSkeleton count={LIMIT} />}

      {!state.loading && state.hasMore && (
        <div className="w-full flex justify-center items-center">
          <Button onClick={fetchPosts} variant="neutral">
            Load more mumbles
            <MumbleIcon color="white" />
          </Button>
        </div>
      )}

      {!state.hasMore && state.posts.length > 0 && <div>No more posts.</div>}
    </>
  );
};
