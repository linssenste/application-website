<template>
    <div class="application-area">
        <WelcomeSection />


        <RisographArtSection />

        <MusicLoveSection />
        <FavoriteMusicSection />
        <InstagramMusicSection />
        <PolaroidCreativitySection />

        <RisographArtSection :rotate="true" />

        <InclusionSection />

        <EndSection style="z-index: 10; margin-top: 100px" />

        <div style="height: 200px; margin-top: 50px; z-index: -1;">
            <RisographArtSection :rotate="true" />
        </div>
    </div>
</template>

<script lang="ts" setup>

import WelcomeSection from '@/views/WelcomeSection.vue';
import RisographArtSection from '@/views/RisographArtSection.vue'
import MusicLoveSection from '@/views/MusicLoveSection.vue';
import FavoriteMusicSection from '@/views/FavoriteMusicSection.vue'
import InstagramMusicSection from '@/views/InstagramMusicSection.vue'
import PolaroidCreativitySection from '@/views/PolaroidCreativitySection.vue';
import EndSection from '@/views/EndSection.vue';
import InclusionSection from '@/views/InclusionSection.vue';
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


