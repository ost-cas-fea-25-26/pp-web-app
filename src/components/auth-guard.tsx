import { getAuthenticatedUser, getSession } from "@/lib/auth/server";
import { LoginRedirect } from "./login-redirect";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export const AuthGuard = async ({ children }: ProtectedLayoutProps) => {
  const session = await getSession();
  console.log("AuthGuard session:", JSON.stringify(session));

  const user = await getAuthenticatedUser();
  console.log("AuthGuard user:", JSON.stringify(user));

  if (!session?.user) {
    return <LoginRedirect />;
  }

  return <div data-testid="auth-guard-authenticated">{children}</div>;
};
