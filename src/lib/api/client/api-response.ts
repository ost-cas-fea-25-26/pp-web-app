export type ApiResponse<T> =
  | {
      success: true;
      payload: T;
    }
  | {
      success: false;
      error: string;
    };
