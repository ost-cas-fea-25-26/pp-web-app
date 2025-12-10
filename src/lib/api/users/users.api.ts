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
}
