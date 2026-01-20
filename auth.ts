import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth, customSession } from "better-auth/plugins";
import { CUSTOM_PROVIDER_ID } from "./src/lib/auth/client";
import { requireEnv } from "./src/lib/utils";
import { dbInstance } from "@/lib/db/instance";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(dbInstance, {
    provider: "pg",
    schema,
  }),
  user: {
    additionalFields: {
      zitadelId: {
        type: "string",
        required: true,
        input: false,
      },
    },
  },
  baseUrl: requireEnv("VERCEL_URL"),
  session: {
    expiresIn: 60 * 60 * 12, // 12 hours
    updateAge: 60 * 60 * 12, // 12 hours
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
  plugins: [
    nextCookies(),
    genericOAuth({
      config: [
        {
          providerId: CUSTOM_PROVIDER_ID,
          prompt: "login",
          clientId: requireEnv("AUTH_CLIENT_ID"),
          clientSecret: "", // PKCE doesn't require client secret
          discoveryUrl:
            "https://cas-fee-adv-ed1ide.zitadel.cloud/.well-known/openid-configuration",
          scopes: [
            "openid",
            "profile",
            "email",
            "urn:zitadel:iam:org:project:id:348701753820117818:aud",
          ],
          pkce: true,
          mapProfileToUser(profile: Record<string, unknown>) {
            const { sub, name, email, picture } = profile as {
              sub: string;
              name?: string;
              email?: string;
              picture?: string;
            };

            return {
              zitadelId: sub,
              name,
              email,
              image: picture,
            };
          },
        },
      ],
    }),

    customSession(async ({ user, session }) => {
      await Promise.resolve(); // satisfy eslint

      const zitadelUser = user as { zitadelId?: string };

      if (!zitadelUser.zitadelId) {
        throw new Error("Zitadel ID is missing on user.");
      }

      return {
        user: {
          ...user,
          id: zitadelUser.zitadelId, // use Zitadel ID as user ID since the api expects the zitadelId
        },
        session,
      };
    }),
  ],
  secret: requireEnv("AUTH_SECRET"),
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    cookiePrefix: "better-auth",
  },
});
