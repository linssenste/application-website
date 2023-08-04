import { mergeConfig } from "vite";
import { configDefaults, defineConfig } from "vitest/config";
import viteConfig from "./vite.config";
import { config } from "@vue/test-utils";
import { createI18n } from "vue-i18n";
import { i18n } from "./src/i18n";

config.global.plugins = [i18n];

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
