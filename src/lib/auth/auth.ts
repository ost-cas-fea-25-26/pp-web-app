import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";
import { headers } from "next/headers";
import { cache } from "react";
import { CUSTOM_PROVIDER_ID } from "./auth-client";
import { Pool } from "pg";

const NEON_DATABASE_URL = process.env.NEON_DATABASE_URL;

if (!NEON_DATABASE_URL) {
  throw new Error("NEON_DATABASE_URL is not defined in environment variables");
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const auth = betterAuth({
  database: new Pool({
    connectionString: NEON_DATABASE_URL,
  }),
  baseUrl,
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
          clientId: "346952796513305146",
          clientSecret: "", // PKCE doesn't require client secret
          discoveryUrl:
            "https://cas-fee-adv-ed1ide.zitadel.cloud/.well-known/openid-configuration",
          scopes: [
            "openid",
            "profile",
            "email",
            "urn:zitadel:iam:org:project:id:342477345380127384:aud",
          ],
          pkce: true,
        },
      ],
    }),
  ],
  secret: process.env.AUTH_SECRET ?? "this-is-very-secret",
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    cookiePrefix: "better-auth",
  },
});

export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});

export const getAccessToken = cache(async () => {
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
});
