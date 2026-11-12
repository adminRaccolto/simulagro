import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Motor isolado: /engine não pode depender de telas, framework ou banco.
  {
    files: ["engine/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["next", "next/*", "react", "react/*", "react-dom", "react-dom/*"],
              message: "O motor (/engine) deve ser puro: sem Next.js/React.",
            },
            {
              group: ["@/app/*", "@/components/*", "@/db/*", "drizzle-orm", "drizzle-orm/*", "@supabase/*"],
              message: "O motor (/engine) não pode acessar telas nem banco de dados.",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
