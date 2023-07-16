<template>
    <div class="application-area">

        <div class="lang-selector">
            <img v-on:click="switchLanguage('de')" class="lang-flag" :style="locale=='de'? 'opacity: 1':''"
                src="@/assets/flags/de.webp" width="25" />
            <img v-on:click="switchLanguage('en')" class="lang-flag" style="margin-right: 15px;"
                :style="locale=='en'? 'opacity: 1':''" src="@/assets/flags/gb.webp" width="25" />
        </div>


        <WelcomeSection />


        <RisographArtSection />

        <MusicLoveSection />
        <FavoriteMusicSection />
        <InstagramMusicSection />
        <PolaroidCreativitySection />

        <RisographArtSection :rotate="true" />

        <InclusionSection />

        <EndSection style="z-index: 10; margin-top: 50px" />

        <div style="height: 200px; margin-top: 50px; z-index: -1;">
            <RisographArtSection :rotate="true" />
        </div>
    </div>
</template>

<script lang="ts" setup>

import WelcomeSection from './views/WelcomeSection.vue';
import RisographArtSection from './views/RisographArtSection.vue'
import MusicLoveSection from './views/MusicLoveSection.vue';
import FavoriteMusicSection from './views/FavoriteMusicSection.vue'
import InstagramMusicSection from './views/InstagramMusicSection.vue'
import PolaroidCreativitySection from './views/PolaroidCreativitySection.vue';
import EndSection from './views/EndSection.vue';

import InclusionSection from './views/InclusionSection.vue';


import { useI18n } from 'vue-i18n'

const { locale }=useI18n()


function switchLanguage(localeId: string): void {
    if (locale.value===localeId) return;
    const urlParams=new URLSearchParams(window.location.search);

    urlParams.set('lang', localeId);

    window.location.search=urlParams.toString();
}
</script>


<style scoped> .application-area {
     position: relative;
     width: 100%;
     top: 0;
     left: 0;

     overflow: hidden;

 }
</style>

<style>
html {

    font-family: 'Hanken Grotesk' !important;
}
</style>




<style scoped>
.lang-selector {
    align-content: center;
    margin: auto;
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    width: 100%;
    cursor: pointer;
    justify-content: center
}

@media (min-width: 600px) {
    .lang-selector {
        justify-content: flex-end
    }
}

.lang-flag {
    width: 28px;
    transition: all 100ms ease-in-out;
    opacity: .3;
    padding: 8px;

}

.lang-flag:hover {
    transform: scale(1.2);
    transform-origin: 50% 50%;
    opacity: 1;
    transition: all 100ms ease-in-out;
}
</style>