import { config as smartiveConfig } from "@smartive/eslint-config";

const config = [
  ...smartiveConfig("react"),

  {
    settings: {
      react: { version: "detect" },

      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },

    rules: {
      "react/forbid-component-props": [
        "warn",
        {
          forbid: [
            {
              propName: "style",
              message: "Use className instead of inline styles",
            },
          ],
        },
      ],
    },
  },
];

export default config;
