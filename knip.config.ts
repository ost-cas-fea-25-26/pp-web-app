import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignore: [".prettier.config.js", "auth-client.ts", "src/lib/api/generated/**"],
  ignoreDependencies: [
    "@smartive/prettier-config",
    "prettier-plugin-tailwindcss",

    // temporarily unused deps
    "@testing-library/jest-dom",
    "@testing-library/react",
  ],
  ignoreBinaries: ["tail"],
};

export default config;
