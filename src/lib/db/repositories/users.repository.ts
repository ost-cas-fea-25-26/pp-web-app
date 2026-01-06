import { getSession } from "@/lib/auth/server";
import { eq } from "drizzle-orm";
import { dbInstance } from "../instance";
import { user } from "@/lib/db/schema";
import { RepositoryResponse } from "./types";

const log = {
  call: (action: string) => console.info(`[REPO] ${action}`),

  error: (action: string, message: string) =>
    console.error(`[REPO] ${action} failed: ${message}`),
};

class UsersRepository {
  async updateBio(bio: string): Promise<RepositoryResponse> {
    log.call("updateBio");

    const session = await getSession();
    if (!session?.user?.id) {
      log.error("updateBio", "User not authenticated");

      return { success: false, error: "User not authenticated" };
    }

    try {
      await dbInstance
        .update(user)
        .set({ bio })
        .where(eq(user.zitadelId, session.user.id));

      return { success: true };
    } catch (error) {
      log.error(
        "updateBio",
        error instanceof Error ? error.message : "DB update failed",
      );

      return {
        success: false,
        error: error instanceof Error ? error.message : "DB update failed",
      };
    }
  }

  async getBioByUserId(
    userId: string,
  ): Promise<RepositoryResponse<string | null>> {
    log.call("getBioByUserId");

    try {
      const result = await dbInstance
        .select({ bio: user.bio })
        .from(user)
        .where(eq(user.zitadelId, userId))
        .limit(1);

      return {
        success: true,
        payload: result[0]?.bio ?? null,
      };
    } catch (error) {
      log.error(
        "getBioByUserId",
        error instanceof Error ? error.message : "DB query failed",
      );

      return {
        success: false,
        error: error instanceof Error ? error.message : "DB query failed",
      };
    }
  }

  async updateBannerImage(bannerImage: string): Promise<RepositoryResponse> {
    log.call("updateBannerImage");

    const session = await getSession();
    if (!session?.user?.id) {
      log.error("updateBannerImage", "User not authenticated");

      return { success: false, error: "User not authenticated" };
    }

    try {
      await dbInstance
        .update(user)
        .set({ bannerImage })
        .where(eq(user.zitadelId, session.user.id));

      return { success: true };
    } catch (error) {
      log.error(
        "updateBannerImage",
        error instanceof Error ? error.message : "DB update failed",
      );

      return {
        success: false,
        error: error instanceof Error ? error.message : "DB update failed",
      };
    }
  }

  async getBannerImageByUserId(
    userId: string,
  ): Promise<RepositoryResponse<string | null>> {
    log.call("getBannerImageByUserId");

    try {
      const result = await dbInstance
        .select({ bannerImage: user.bannerImage })
        .from(user)
        .where(eq(user.zitadelId, userId))
        .limit(1);

      return {
        success: true,
        payload: result[0]?.bannerImage ?? null,
      };
    } catch (error) {
      log.error(
        "getBannerImageByUserId",
        error instanceof Error ? error.message : "DB query failed",
      );

      return {
        success: false,
        error: error instanceof Error ? error.message : "DB query failed",
      };
    }
  }
}

export const usersRepository = new UsersRepository();
