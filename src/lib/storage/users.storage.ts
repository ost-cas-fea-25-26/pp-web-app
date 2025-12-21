import { put } from "@vercel/blob";
import { getSession } from "../auth/server";
import { StorageResponse } from "./types";

class UsersStorage {
  private readonly blobHost = "14ljzsprd3eqftgf.public.blob.vercel-storage.com";

  async updateBannerImage(file: File): Promise<StorageResponse> {
    const session = await getSession();
    if (!session?.user?.id) {
      return { success: false, error: "User not authenticated" };
    }

    try {
      const { url } = await this.uploadToVercel(
        `users/${session.user.id}/banner`,
        file,
      );

      return { success: true, url };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Upload failed",
      };
    }
  }

  getBannerUrl(userId: string): string {
    return `https://${this.blobHost}/users/${userId}/banner`;
  }

  private uploadToVercel(key: string, file: Blob) {
    return put(key, file, {
      access: "public",
      allowOverwrite: true,
    });
  }
}

export const usersStorage = new UsersStorage();
