import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignore: [".prettier.config.js", "auth-client.ts"],
  ignoreDependencies: [
    "@smartive/prettier-config",
    "prettier-plugin-tailwindcss",

    // temporarily unused deps
    "@testing-library/jest-dom",
    "@testing-library/react",
  ],
};

export default config;
