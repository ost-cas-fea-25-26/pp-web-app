import { getSession } from "@/lib/auth/server";
import type { HttpClient } from "../client/http-client";
import { PaginatedUser, User } from "./users.types";

export class UsersApi {
  constructor(private client: HttpClient) {}

  getMany() {
    return this.client.get<PaginatedUser>("/users");
  }

  getUserById(id: string) {
    return this.client.get<User>(`/users/${id}`);
  }

  updateAvatar(formData: FormData) {
    return this.client.put<string>("/users/avatar", formData);
  }

  followUser(userId: string) {
    return this.client.put<void>(`/users/${userId}/followers`);
  }

  unfollowUser(userId: string) {
    return this.client.delete<void>(`/users/${userId}/followers`);
  }

  async getAllUnfollowedUsers(): Promise<User[]> {
    const usersRes = await this.getMany();
    const followeeIds = await this.getFolloweeIds();

    if (!usersRes.success) {
      return [];
    }

    return (
      usersRes.payload.data?.filter(
        (user: User) => !followeeIds.includes(user.id ?? ""),
      ) ?? []
    );
  }

  async getFollowees(userId: string) {
    return this.client.get<PaginatedUser>(`/users/${userId}/followees`);
  }

  async getFolloweeIds(): Promise<string[]> {
    const session = await getSession();
    if (!session?.user?.id) {
      return [];
    }

    const userId = session.user.id;
    const result = await this.getFollowees(userId);

    if (!result.success) {
      return [];
    }

    return (
      result.payload.data
        ?.map((f) => f.id)
        .filter((id): id is string => typeof id === "string") ?? []
    );
  }
}
