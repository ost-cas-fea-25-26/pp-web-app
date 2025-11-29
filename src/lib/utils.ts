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
