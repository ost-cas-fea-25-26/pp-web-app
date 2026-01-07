import { describe, it, expect, vi } from "vitest";
import { createMumble } from "@/lib/helpers/create-mumble";

vi.mock("@/components/toaster", () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  toastAction: vi.fn((promise) => promise),
}));

vi.mock("@/lib/actions/posts.actions", () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createPostAction: vi.fn(async (text, blob, fileName) => ({ success: true })),
}));

describe("create mumble", () => {
  it("should throw if no data is provided", async () => {
    await expect(createMumble(undefined)).rejects.toThrow("No data provided");
  });

  it("should call createPostAction with text only", async () => {
    const { createPostAction } = await import("@/lib/actions/posts.actions");
    await createMumble({ text: "Hello" });
    expect(createPostAction).toHaveBeenCalledWith(
      "Hello",
      undefined,
      undefined,
    );
  });

  it("should call createPostAction with media file", async () => {
    const { createPostAction } = await import("@/lib/actions/posts.actions");
    const file = new File(["file content"], "test.png", { type: "image/png" });
    await createMumble({ text: "With file", media: file });
    expect(createPostAction).toHaveBeenCalledWith(
      "With file",
      expect.any(Blob),
      "test.png",
    );
  });
});
