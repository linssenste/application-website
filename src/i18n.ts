import { createI18n } from "vue-i18n";
import de from "./locales/de.ts";
import en from "./locales/en.ts";

const messages = {
    de: de,
    en: en,
};

export function createLangI18n(locale = "de") {
    return createI18n({
        legacy: false,
        locale: locale,
        messages,
    });
}
