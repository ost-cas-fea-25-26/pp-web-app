import { createAuthClient } from "better-auth/client";
import { genericOAuthClient } from "better-auth/client/plugins";

export const CUSTOM_PROVIDER_ID = "zitadel";

const authClient = createAuthClient({
  plugins: [genericOAuthClient()],
});

export const { signIn, signOut } = authClient;

export const signinZitadel = async () => {
  await signIn.oauth2({
    providerId: CUSTOM_PROVIDER_ID,
    callbackURL: "/",
  });
};
