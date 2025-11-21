import { createAuthClient } from "better-auth/client";
import { genericOAuthClient } from "better-auth/client/plugins";

export const baseURL =
  process.env.NEXT_PUBLIC_NEXT_URL ?? "http://localhost:3000";
export const CUSTOM_PROVIDER_ID = "zitadel";

const authClient = createAuthClient({
  baseURL: baseURL,
  trustedOrigins: [baseURL],
  plugins: [genericOAuthClient()],
});

export const { signIn, signOut } = authClient;

export const signinZitadel = async () => {
  await signIn.oauth2({
    providerId: "zitadel",
    callbackURL: "/",
  });
};
