import { getUserByIdAction } from "@/lib/actions/users.actions";
import { User } from "@/lib/api/users/users.types";

export type MumbleUser = {
  id: string;
  fullName: string;
  handle: string;
  avatarUrl?: string;
};

export const mapUserPayloadToUser = (user: User): MumbleUser => {
  if (!user.id) {
    throw new Error("User id is required");
  }

  if (!user.username) {
    throw new Error("User username is required");
  }

  return {
    id: user.id,
    fullName: user.firstname + " " + user.lastname,
    handle: user.username,
    avatarUrl: user.avatarUrl ?? undefined,
  };
};

export const mapCreatorUserToUser = async (creator: {
  readonly id?: string | null;
}): Promise<MumbleUser> => {
  if (!creator.id) {
    throw new Error("User id is required");
  }
  const userResult = await getUserByIdAction(creator.id);
  if (!userResult.success) {
    throw new Error("Failed to fetch user");
  }

  const user = userResult.payload;
  if (!user.id) {
    throw new Error("User id is required");
  }

  if (!user.username) {
    throw new Error("User username is required");
  }

  return {
    id: user.id,
    fullName: user.firstname + " " + user.lastname,
    handle: user.username,
    avatarUrl: user.avatarUrl ?? undefined,
  };
};
