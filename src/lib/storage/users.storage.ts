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

    const version = crypto.randomUUID();

    try {
      const { url } = await this.uploadToVercel(
        `users/${session.user.id}/banner-${version}`,
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

  private uploadToVercel(key: string, file: Blob) {
    return put(key, file, {
      access: "public",
    });
  }
}

export const usersStorage = new UsersStorage();
