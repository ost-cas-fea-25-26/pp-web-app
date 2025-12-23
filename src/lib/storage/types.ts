export type StorageResponse =
  | { success: true; url: string }
  | { success: false; error: string };
