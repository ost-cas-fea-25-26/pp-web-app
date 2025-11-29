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
  <Suspense>
    <AuthGuard>
      <AppShell
        header={
          <Header
            logo={<LogoLink />}
            actions={
              <Suspense>
                <HeaderActions />
              </Suspense>
            }
          />
        }
      >
        {children}
      </AppShell>
    </AuthGuard>
  </Suspense>
);

export default ProtectedLayout;
