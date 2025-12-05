import type { HttpClient } from "../client/http-client";
import { User } from "./users.types";

export class UsersApi {
  constructor(private client: HttpClient) {}

  getUserById(id: string) {
    return this.client.get<User>(`/users/${id}`);
  }

  async updateAvatar(file: File) {
    const formData = new FormData();
    formData.append("media", file);

    return this.client.put<string>("/users/avatar", formData);
  }
}
