import path from "path";
import withSerwist from "@serwist/next";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,

  experimental: {
    proxyClientMaxBodySize: "10mb",
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  turbopack: {
    root: path.join(__dirname, ".."),
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/mumble-api-data/**",
      },
      {
        protocol: "https",
        hostname: "14ljzsprd3eqftgf.public.blob.vercel-storage.com",
        pathname: "/users/**",
      },
    ],
  },
};

export default withSerwist({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  // disable: process.env.NODE_ENV !== "production",
})(nextConfig);
