import { describe, test, expect } from "vitest";
import { buildPostsQueryString } from "@/lib/api/posts/posts.query-builder";

describe("buildPostsQueryString", () => {
  test("returns empty string when no params", () => {
    expect(buildPostsQueryString()).toBe("");
  });

  test("returns empty string when params is empty object", () => {
    expect(buildPostsQueryString({})).toBe("");
  });

  test("returns query string for single string param", () => {
    expect(buildPostsQueryString({ text: "lorem" })).toBe("?text=lorem");
  });

  test("returns query string for array param", () => {
    expect(buildPostsQueryString({ tags: ["one", "two"] })).toBe(
      "?tags=one&tags=two",
    );
  });

  test("returns query string for multiple params", () => {
    expect(buildPostsQueryString({ text: "lorem", tags: ["one", "two"] })).toBe(
      "?text=lorem&tags=one&tags=two",
    );
  });

  test("ignores undefined and null values", () => {
    expect(buildPostsQueryString({ text: undefined, tags: ["one"] })).toBe(
      "?tags=one",
    );
  });
});
