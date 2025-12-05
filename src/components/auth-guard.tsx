import { getAuthenticatedUser } from "@/lib/auth/server";
import { redirect } from "next/navigation";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export const AuthGuard = async ({ children }: ProtectedLayoutProps) => {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
};
