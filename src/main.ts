import { createApp } from "vue";

import "./style.css";
import "./assets/fonts/handwriting/Biro Script Std/stylesheet.css";
import "./assets/fonts/handwriting/Biro Script Sloppy Std/stylesheet.css";
import "./assets/fonts/handwriting/Biro Script Bold Std/stylesheet.css";

import "./assets/fonts/text/stylesheet.css";
import VueFullscreen from "vue-fullscreen";
import App from "./App.vue";

import { createLangI18n } from "./i18n";

const urlParams = new URLSearchParams(window.location.search);
const lang = urlParams.get("lang");

const i18n = createLangI18n((lang as string) || "de");

createApp(App).use(i18n).use(VueFullscreen).mount("#app");
