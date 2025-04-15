import { defineConfig } from "eslint-define-config";
import js from "@eslint/js";
import next from "eslint-config-next";

export default defineConfig([
  // ESLint Recommended configuration
  js.configs.recommended,

  // Next.js specific config
  ...next(),

  {
    // This is for your custom configuration
    files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ["react", "react-hooks", "import"],
    rules: {
      // Customize rules as needed
      "react/prop-types": "off", // Disable if using TypeScript or not needed
      "react/react-in-jsx-scope": "off", // Not needed with Next.js 13+
      "import/no-unresolved": "error", // Catch missing imports
      "import/named": "error", // Ensure named imports exist
      "import/default": "error", // Ensure default imports exist
      "no-unused-vars": "error", // Catch unused variables
      "no-undef": "error", // Catch undefined variables
      "react-hooks/rules-of-hooks": "error", // Enforce Hooks rules
      "react-hooks/exhaustive-deps": "warn", // Warn on missing dependencies in useEffect
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"], // Support Next.js file types
        },
      },
    },
  },
]);
