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

  async getAllUnfollowedUsers(userId: string): Promise<User[]> {
    const usersRes = await this.getMany();
    const followeeIds = await this.getFolloweeIds(userId);

    if (!usersRes.success) {
      return [];
    }

    const unfollowedUsers =
      usersRes.payload.data?.filter((u) => !followeeIds.includes(u.id ?? "")) ??
      [];

    return unfollowedUsers;
  }

  async getFollowees(userId: string) {
    return this.client.get<PaginatedUser>(`/users/${userId}/followees`);
  }

  async getFolloweeIds(userId: string): Promise<string[]> {
    const res = await this.getFollowees(userId);

    if (!res.success) {
      return [];
    }

    return (
      res.payload.data
        ?.map((f) => f.id)
        .filter((id): id is string => typeof id === "string") ?? []
    );
  }
}
