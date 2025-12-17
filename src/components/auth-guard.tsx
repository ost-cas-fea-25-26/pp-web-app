import { getSession } from "@/lib/auth/server";
import { LoginRedirect } from "./login-redirect";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export const AuthGuard = async ({ children }: ProtectedLayoutProps) => {
  const session = await getSession();

  if (!session?.user) {
    return <LoginRedirect />;
  }

  return <div data-testid="auth-guard-authenticated">{children}</div>;
};
