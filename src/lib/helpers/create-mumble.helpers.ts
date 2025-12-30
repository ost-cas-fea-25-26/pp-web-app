import { createPostAction } from "@/lib/actions/posts.actions";
import { toast } from "@ost-cas-fea-25-26/pp-design-system";

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

  await toast.promise(createPostAction(data.text, mediaBlob, fileName), {
    loading: "Creating your post...",
    success: "Your mumble has been posted. 🎉",
    error: "Something went wrong 😵",
  });
};
