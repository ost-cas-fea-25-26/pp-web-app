import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";
import { headers } from "next/headers";
import { CUSTOM_PROVIDER_ID } from "./auth-client";
import { Pool } from "pg";
import { requireEnv } from "../utils";

export const auth = betterAuth({
  database: new Pool({
    connectionString: requireEnv("NEON_DATABASE_URL"),
  }),
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
        },
      ],
    }),
  ],
  secret: requireEnv("AUTH_SECRET"),
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    cookiePrefix: "better-auth",
  },
});

export const getSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
};

export const getAccessToken = async () => {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });

  if (!session?.user) {
    return null;
  }

  const token = await auth.api.getAccessToken({
    headers: reqHeaders,
    body: {
      providerId: CUSTOM_PROVIDER_ID,
    },
  });

  if (!token?.accessToken) {
    return null;
  }

  return token;
};
