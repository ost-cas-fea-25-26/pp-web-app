import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignore: [
    ".prettier.config.js",
  ],
  ignoreDependencies: [
    "@smartive/prettier-config",
    "prettier-plugin-tailwindcss",
    "tailwindcss",
  ],
};

export default config;
