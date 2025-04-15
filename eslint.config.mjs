export default {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "next", // Next.js core rules
    "next/core-web-vitals", // Recommended rules for Next.js performance
    "plugin:react/recommended", // React-specific rules
    "plugin:react-hooks/recommended", // React hooks rules
    "plugin:import/errors", // Catch import errors
    "plugin:import/warnings", // Import-related warnings
    "airbnb", // Optional: Airbnb style guide (if chosen)
  ],
  parserOptions: {
    ecmaVersion: 12,
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
};
