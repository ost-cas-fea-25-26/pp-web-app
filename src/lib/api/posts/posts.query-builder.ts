import { PostsGetManyQueryParams } from "@/lib/api/posts/posts.types";

export const buildPostsQueryString = (
  params?: PostsGetManyQueryParams,
): string => {
  if (!params) {
    return "";
  }
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v !== undefined && v !== null) {
          searchParams.append(key, v);
        }
      });
    } else {
      searchParams.append(key, String(value));
    }
  });
  const qs = searchParams.toString();

  return qs ? `?${qs}` : "";
};
