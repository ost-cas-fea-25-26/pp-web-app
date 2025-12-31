import { decodeTime } from "ulid";

export const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not defined in environment variables`);
  }

  return value;
};

export const getAvatarFallbackLetters = (
  firstName?: string | null,
  lastName?: string | null,
) => {
  const firstInitial = firstName?.[0] ?? "";
  const lastInitial = lastName?.[0] ?? "";

  return `${firstInitial}${lastInitial}`.toUpperCase();
};

export const getTimestampLabelFromUlid = (ulid: string): string => {
  const timestamp = Number((decodeTime as (id: string) => number)(ulid));
  const date = new Date(timestamp);

  return date.toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getDeepLinkUrlByMumbleId = (mumbleId: string): string => {
  return `${requireEnv("VERCEL_URL")}/mumble/${mumbleId}`;
};
