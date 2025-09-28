import globals from "globals";
import tseslint from "typescript-eslint";
import {defineConfig, globalIgnores} from "eslint/config";

export default defineConfig([
    tseslint.configs.recommended,
    { 
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], 
        languageOptions: { globals: globals.browser },
        rules: {
            "quotes": ["error", "double"],
            "indent": ["error", 4, {
                "SwitchCase": 1
            }],
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "warn"
        }
    },
    globalIgnores(["src/generated/prisma"])
]);
