import { getSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export const AuthGuard = async ({ children }: ProtectedLayoutProps) => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  return <>{children}</>;
};
