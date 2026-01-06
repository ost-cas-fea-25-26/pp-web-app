import { getSession } from "@/lib/auth/server";
import { eq } from "drizzle-orm";
import { dbInstance } from "../instance";
import { user } from "@/lib/db/schema";
import { RepositoryResponse } from "./types";

const logRepositoryStart = (action: string) =>
  console.info(`[REPO] → ${action}`);

const logRepositorySuccess = (action: string, durationMs: number) =>
  console.info(`[REPO] ✓ ${action} (${durationMs} ms)`);

const logRepositoryError = (
  action: string,
  message: string,
  durationMs: number,
) => console.error(`[REPO] ✗ ${action} ${message} (${durationMs} ms)`);

class UsersRepository {
  async updateBio(bio: string): Promise<RepositoryResponse> {
    const start = Date.now();
    logRepositoryStart("updateBio");

    const session = await getSession();
    if (!session?.user?.id) {
      const duration = Date.now() - start;
      logRepositoryError("updateBio", "User not authenticated", duration);

      return { success: false, error: "User not authenticated" };
    }

    try {
      await dbInstance
        .update(user)
        .set({ bio })
        .where(eq(user.zitadelId, session.user.id));

      const duration = Date.now() - start;
      logRepositorySuccess("updateBio", duration);

      return { success: true };
    } catch (error) {
      const duration = Date.now() - start;
      logRepositoryError(
        "updateBio",
        error instanceof Error ? error.message : "DB update failed",
        duration,
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
    const start = Date.now();
    logRepositoryStart("getBioByUserId");

    try {
      const result = await dbInstance
        .select({ bio: user.bio })
        .from(user)
        .where(eq(user.zitadelId, userId))
        .limit(1);

      const duration = Date.now() - start;
      logRepositorySuccess("getBioByUserId", duration);

      return {
        success: true,
        payload: result[0]?.bio ?? null,
      };
    } catch (error) {
      const duration = Date.now() - start;
      logRepositoryError(
        "getBioByUserId",
        error instanceof Error ? error.message : "DB query failed",
        duration,
      );

      return {
        success: false,
        error: error instanceof Error ? error.message : "DB query failed",
      };
    }
  }
  async updateBannerImage(bannerImage: string): Promise<RepositoryResponse> {
    const start = Date.now();
    logRepositoryStart("updateBannerImage");

    const session = await getSession();
    if (!session?.user?.id) {
      const duration = Date.now() - start;
      logRepositoryError(
        "updateBannerImage",
        "User not authenticated",
        duration,
      );

      return { success: false, error: "User not authenticated" };
    }

    try {
      await dbInstance
        .update(user)
        .set({ bannerImage })
        .where(eq(user.zitadelId, session.user.id));

      const duration = Date.now() - start;
      logRepositorySuccess("updateBannerImage", duration);

      return { success: true };
    } catch (error) {
      const duration = Date.now() - start;
      logRepositoryError(
        "updateBannerImage",
        error instanceof Error ? error.message : "DB update failed",
        duration,
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
    const start = Date.now();
    logRepositoryStart("getBannerImageByUserId");

    try {
      const result = await dbInstance
        .select({ bannerImage: user.bannerImage })
        .from(user)
        .where(eq(user.zitadelId, userId))
        .limit(1);

      const duration = Date.now() - start;
      logRepositorySuccess("getBannerImageByUserId", duration);

      return {
        success: true,
        payload: result[0]?.bannerImage ?? null,
      };
    } catch (error) {
      const duration = Date.now() - start;
      logRepositoryError(
        "getBannerImageByUserId",
        error instanceof Error ? error.message : "DB query failed",
        duration,
      );

      return {
        success: false,
        error: error instanceof Error ? error.message : "DB query failed",
      };
    }
  }
}

export const usersRepository = new UsersRepository();
