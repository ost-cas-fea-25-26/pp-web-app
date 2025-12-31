import { getUserByIdAction } from "@/lib/actions/users.actions";
import { User } from "@/lib/api/users/users.types";
import { getAvatarFallbackLetters } from "@/lib/utils";

export type MumbleUser = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  handle: string;
  avatarUrl?: string;
  fallbackText?: string;
};

export const mapUser = (user: User): MumbleUser => {
  if (!user.id) {
    throw new Error("User id is required");
  }

  if (!user.username) {
    throw new Error("User username is required");
  }

  return {
    id: user.id,
    firstName: user.firstname ?? "X",
    lastName: user.lastname ?? "X",
    fullName: user.firstname + " " + user.lastname,
    handle: user.username,
    avatarUrl: user.avatarUrl ?? undefined,
    fallbackText: getAvatarFallbackLetters(user.firstname, user.lastname),
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

  return mapUser(user);
};
