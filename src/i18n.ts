import { createI18n } from "vue-i18n";
import de from "./locales/de.ts";
import en from "./locales/en.ts";

const messages = {
    de: de,
    en: en,
};

let locale = "de"; // Default language
const urlParams = new URLSearchParams(window.location.search);
const lang = urlParams.get("lang");

if (lang === "en") {
    locale = "en";
}

export const i18n = createI18n({
    legacy: false,

    locale: locale,
    messages,
});
