import { getSession } from "../auth/server";
import { put } from "@vercel/blob";

type StorageResponse =
  | {
      success: true;
      url: string;
    }
  | {
      success: false;
      error: string;
    };

export const updateBannerImage = async (
  formData: FormData,
): Promise<StorageResponse> => {
  const session = await getSession();
  if (!session?.user?.id) {
    return {
      success: false,
      error: "User not authenticated",
    };
  }

  const userId = session.user.id;

  try {
    const { url } = await put(
      `users/${userId}/banner`,
      formData.get("media") as Blob,
      { access: "public", allowOverwrite: true },
    );

    return {
      success: true,
      url,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};

export const getBannerUrl = (userId: string) =>
  `https://14ljzsprd3eqftgf.public.blob.vercel-storage.com/users/${userId}/banner`;
