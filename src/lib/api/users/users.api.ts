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

  async getAllUnfollowedUsers(selfId: string) {
    const allRes = await this.client.get<PaginatedUser>("/users");
    const followeesRes = await this.client.get<PaginatedUser>(
      `/users/${selfId}/followees`,
    );

    const allUsers = Array.isArray(allRes.data?.data) ? allRes.data.data : [];
    const followees = Array.isArray(followeesRes.data?.data)
      ? followeesRes.data.data
      : [];

    const followedIds = new Set(followees.map((u) => u.id));

    return allUsers.filter(
      (u) => u.id && u.id !== selfId && !followedIds.has(u.id)
    );
  }

  async getFollowees(userId: string) {
    return this.client.get<PaginatedUser>(`/users/${userId}/followees`);
  }
}
