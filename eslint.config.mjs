import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";

export default [
  // Base recommended config
  js.configs.recommended,

  // Main configuration for all TypeScript/JavaScript files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
        NodeJS: "readonly",
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        exports: "writable",
        module: "writable",
        require: "readonly",
        global: "readonly",
        URL: "readonly",
      },
    },

    plugins: {
      "@typescript-eslint": typescript,
      import: importPlugin,
      react: reactPlugin,
      "@next/next": nextPlugin,
    },

    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
        node: true,
      },
      next: {
        rootDir: "./",
      },
    },

    rules: {
      // Import rules
      "import/no-cycle": [
        "error",
        {
          maxDepth: 10,
          ignoreExternal: true,
        },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/no-unused-modules": "error",
      "import/no-duplicates": "error",

      // React rules
      "react/no-unused-prop-types": "error",
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react/prop-types": "off", // Using TypeScript

      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-interface": "warn",

      // General rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": "off", // Using TypeScript version instead
      "no-undef": "off", // TypeScript handles this

      // Next.js specific rules
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "error",
      "@next/next/no-sync-scripts": "error",
      "@next/next/no-head-element": "error",
      "@next/next/no-document-import-in-page": "error",
      "@next/next/no-page-custom-font": "warn",
    },
  },

  // Ignore patterns
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "**/dist/**",
      "**/coverage/**",
      "**/.swc/**",
      "**/playwright-report/**",
      "**/test-results/**",
      "**/*.min.js",
      "**/prisma/dev.db",
      "**/.env*",
      "!**/.env.example",
    ],
  },
];
