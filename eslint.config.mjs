import prettyCozy from "@pretty-cozy/eslint-config"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig(
  prettyCozy.baseTs,
  prettyCozy.react,

  globalIgnores(["dist", "node_modules"]),

  /** Needs tailwind v4 migration
  {
    extends: [prettyCozy.tailwind({ entryPoint: "src/global.css" })],
    // For some unknown reason vscode detects this rule as "warn", even when being disabled by prettyCozy.tailwind
    rules: {
      "better-tailwindcss/enforce-consistent-line-wrapping": "off",
    },
  },
  */

  {
    settings: {
      "import/resolver": {
        node: {
          paths: ["src"],
        },
      },
    },
    rules: {
      "checkFile/filename-naming-convention": "off",
    },
  },

  {
    name: "local-rules/lib-imports",
    ignores: ["src/lib/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@yaasl/*"],
              importNamePattern: "^",
              message: "Import from lib/yaasl instead.",
            },
          ],
        },
      ],
    },
  },

  prettyCozy.prettier
)
