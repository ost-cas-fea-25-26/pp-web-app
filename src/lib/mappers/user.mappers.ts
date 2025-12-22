export type MumbleUser = {
  id: string;
  fullName: string;
  handle: string;
  avatarUrl?: string;
};

export const mapUserPayloadToUser = (user: {
  readonly id?: string | null;
  username?: string | null;
  readonly avatarUrl?: string | null;
  firstname?: string | null;
  lastname?: string | null;
}): MumbleUser => {
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
