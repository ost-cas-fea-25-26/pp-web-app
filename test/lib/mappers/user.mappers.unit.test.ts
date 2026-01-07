import { describe, it, expect, vi } from "vitest";
import {
  mapUser,
  mapCreatorUserToUser,
  MumbleUser,
} from "@/lib/mappers/user.mappers";

vi.mock("@/lib/actions/users.actions", () => ({
  getUserByIdAction: vi.fn((id: string) => ({
    success: true,
    payload: {
      id,
      firstname: "Rory",
      lastname: "McIlroy",
      username: "rory_mcilroy",
      avatarUrl: "avatar.png",
    },
  })),
}));

describe("mapUser", () => {
  it("should map a valid user", () => {
    const user = {
      id: "1",
      firstname: "Rory",
      lastname: "McIlroy",
      username: "rory_mcilroy",
      avatarUrl: "avatar.png",
    };
    const mapped = mapUser(user);
    expect(mapped).toMatchObject({
      id: "1",
      firstName: "Rory",
      lastName: "McIlroy",
      fullName: "Rory McIlroy",
      handle: "rory_mcilroy",
      avatarUrl: "avatar.png",
      fallbackText: "RM",
    });
  });

  it("should throw if user id is missing", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const user = { username: "foo" } as MumbleUser;
    expect(() => mapUser(user)).toThrow("User id is required");
  });

  it("should throw if username is missing", () => {
    const user = { id: "1" } as MumbleUser;
    expect(() => mapUser(user)).toThrow("User username is required");
  });
});

describe("mapCreatorUserToUser", () => {
  it("should map a creator with id", async () => {
    const creator = { id: "351340886451342425" };
    const mapped = await mapCreatorUserToUser(creator);
    expect(mapped).toMatchObject({
      id: "351340886451342425",
      firstName: "Rory",
      lastName: "McIlroy",
      handle: "rory_mcilroy",
      avatarUrl: "avatar.png",
    });
  });

  it("should throw if creator id is missing", async () => {
    await expect(mapCreatorUserToUser({})).rejects.toThrow(
      "User id is required",
    );
  });
});
