import type { components, paths } from "../generated/api";

export type Post = components["schemas"]["Post"];
export type PaginatedPost = components["schemas"]["PostPaginatedResult"];
export type PostsGetManyQueryParams = NonNullable<
  NonNullable<paths["/posts"]["get"]["parameters"]>["query"]
>;
export interface MumbleWithId extends Post {
  id: string;
}
