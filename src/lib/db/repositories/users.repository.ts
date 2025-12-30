import { getSession } from "@/lib/auth/server";
import { eq } from "drizzle-orm";
import { dbInstance } from "../instance";
import { user } from "@/lib/db/schema";
import { RepoResponse } from "./types";

const logRepoStart = (op: string) => console.info(`[REPO] → ${op}`);

const logRepoSuccess = (op: string, durationMs: number) =>
  console.info(`[REPO] ✓ ${op} (${durationMs} ms)`);

const logRepoError = (op: string, message: string, durationMs: number) =>
  console.error(`[REPO] ✗ ${op} ${message} (${durationMs} ms)`);

class UsersRepository {
  async updateBio(bio: string): Promise<RepoResponse> {
    const start = Date.now();
    logRepoStart("updateBio");

    const session = await getSession();
    if (!session?.user?.id) {
      const duration = Date.now() - start;
      logRepoError("updateBio", "User not authenticated", duration);

      return { success: false, error: "User not authenticated" };
    }

    try {
      await dbInstance
        .update(user)
        .set({ bio })
        .where(eq(user.zitadelId, session.user.id));

      const duration = Date.now() - start;
      logRepoSuccess("updateBio", duration);

      return { success: true };
    } catch (error) {
      const duration = Date.now() - start;
      logRepoError(
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

  async getBioByUserId(userId: string): Promise<RepoResponse<string | null>> {
    const start = Date.now();
    logRepoStart("getBioByUserId");

    try {
      const result = await dbInstance
        .select({ bio: user.bio })
        .from(user)
        .where(eq(user.zitadelId, userId))
        .limit(1);

      const duration = Date.now() - start;
      logRepoSuccess("getBioByUserId", duration);

      return {
        success: true,
        payload: result[0]?.bio ?? null,
      };
    } catch (error) {
      const duration = Date.now() - start;
      logRepoError(
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
}

export const usersRepository = new UsersRepository();
