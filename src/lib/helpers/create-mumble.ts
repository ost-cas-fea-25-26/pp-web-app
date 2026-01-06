import { createPostAction } from "@/lib/actions/posts.actions";
import { toastAction } from "@/components/toaster";

export const createMumble = async (data?: {
  media?: File | null;
  text: string;
}): Promise<void> => {
  if (!data) {
    throw new Error("No data provided");
  }

  let mediaBlob: Blob | undefined = undefined;
  let fileName: string | undefined = undefined;

  if (data.media instanceof File) {
    fileName = data.media.name;
    const buffer = await data.media.arrayBuffer();
    mediaBlob = new Blob([buffer], { type: data.media.type });
  }

  await toastAction(createPostAction(data.text, mediaBlob, fileName), {
    loading: "Creating mumble…",
    success: "Mumble created successfully",
    error: "Failed to create mumble",
  });
};
