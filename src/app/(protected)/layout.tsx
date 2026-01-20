import { AuthGuard } from "@/components/auth-guard";
import { HeaderActions } from "@/components/header-actions";
import {
  AppShell,
  Header,
  LogoLink,
} from "@ost-cas-fea-25-26/pp-design-system";
import { Suspense } from "react";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => (
  <AppShell
    header={
      <Header
        logo={<LogoLink />}
        actions={
          <Suspense fallback={<div className="min-h-14" />}>
            <HeaderActions />
          </Suspense>
        }
      />
    }
  >
    <Suspense>
      <AuthGuard>{children}</AuthGuard>
    </Suspense>
  </AppShell>
);

export default ProtectedLayout;
