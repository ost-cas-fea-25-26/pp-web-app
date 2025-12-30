export type RepoResponse<T = void> =
  | { success: true; payload?: T }
  | { success: false; error: string };
