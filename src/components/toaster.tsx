"use client";

import { toast } from "@ost-cas-fea-25-26/pp-design-system";

export const toastAction = (
  promise: Promise<{ success: boolean; error?: string }>,
  messages: {
    loading: string;
    success: string;
    error: string;
  },
) =>
  toast.promise(
    promise.then((result) => {
      if (!result.success) {
        throw new Error(result.error ?? messages.error);
      }

      return result;
    }),
    messages,
  );

export { Toaster } from "@ost-cas-fea-25-26/pp-design-system";
