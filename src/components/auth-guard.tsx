import { getAuthenticatedUser } from "@/lib/auth/server";
import { LoginRedirect } from "./login-redirect";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export const AuthGuard = async ({ children }: ProtectedLayoutProps) => {
  const user = await getAuthenticatedUser();

  if (!user) {
    return <LoginRedirect />;
  }

  return <>{children}</>;
};
