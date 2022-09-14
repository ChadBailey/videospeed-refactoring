export const plugins = ["jest"];
export const parserOptions = {
  ecmaVersion: "2020",
  sourceType: "module",
  ecmaFeatures: {
    jsx: true,
  },
  env: {
    webextensions: true,
    es2020: true,
    "shared-node-browser": true,
    jest: true,
  },
  extends: "eslint:recommended",
  rules: {
    indent: [2, "error"],
    semi: [2, "always"],
  },
};
export const overrides = [
  {
    files: ["./src/**/*.{test,spec}.{js,jsx}", "./test/**/*.{js,jsx}"],
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
    },
  },
];
