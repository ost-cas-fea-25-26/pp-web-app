import { AuthGuard } from "@/components/auth-guard";
import { Suspense } from "react";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => (
  <Suspense fallback={<div>Loading protected content...</div>}>
    <AuthGuard>{children}</AuthGuard>
  </Suspense>
);

export default ProtectedLayout;
