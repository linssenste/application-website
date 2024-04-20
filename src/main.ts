import { createApp } from "vue";

import "./style.css";
import "./assets/fonts/handwriting/Biro Script Std/stylesheet.css";
import "./assets/fonts/handwriting/Biro Script Sloppy Std/stylesheet.css";
import "./assets/fonts/handwriting/Biro Script Bold Std/stylesheet.css";

import "./assets/fonts/text/stylesheet.css";
import "./assets/fonts/buttons/stylesheet.css";

import App from "./App.vue";
import VueLazyload from 'vue-lazyload'
createApp(App).use(VueLazyload).mount("#app");
