import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { Post } from "@/components/post";
import { PostResult } from "@/lib/posts/posts.type";

describe("Post", () => {
  it("renders the post text", () => {
    const post: PostResult = {
      type: "post",
      id: "1",
      creator: "1234567890",
      text: "Hello world!",
      mediaUrl: null,
      mediaType: null,
      likeCount: 5,
      likedByUser: false,
      replyCount: 2,
    };

    render(<Post post={post} />);

    expect(screen.getByText("Hello world!")).toBeInTheDocument();
  });
});
