import { createApp } from "vue";

import { createI18n } from "vue-i18n";
import de from "./locales/de.ts";
import en from "./locales/en.ts";

import "./style.css";
import "./assets/fonts/handwriting/Biro Script Std/stylesheet.css";
import "./assets/fonts/handwriting/Biro Script Sloppy Std/stylesheet.css";
import "./assets/fonts/handwriting/Biro Script Bold Std/stylesheet.css";

import "./assets/fonts/text/stylesheet.css";
import App from "./App.vue";

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

const i18n = createI18n({
    legacy: false,

    locale: locale,
    messages,
});

createApp(App).use(i18n).mount("#app");
