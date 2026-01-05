export type RepositoryResponse<T = void> =
  | { success: true; payload?: T }
  | { success: false; error: string };
