import { getAuthenticatedUser } from "@/lib/auth/server";
import { LoginButton } from "./login-button";

export const AuthGuard = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await getAuthenticatedUser();

  if (!user) {
    return <LoginButton />;
  }

  return <div data-testid="auth-guard-authenticated">{children}</div>;
};
