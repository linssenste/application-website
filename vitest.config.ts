import { mergeConfig } from "vite";
import { configDefaults, defineConfig } from "vitest/config";
import viteConfig from "./vite.config";
import { config } from "@vue/test-utils";
import { createLangI18n } from "./src/i18n";

config.global.plugins = [createLangI18n("en")];

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            exclude: [...configDefaults.exclude, "packages/template/*"],
            globals: true,
            environment: "happy-dom",
            coverage: {
                provider: "istanbul", // or 'v8'
            },
        },
    })
);
