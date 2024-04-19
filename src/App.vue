<template>
	<div id="application-area">

		<!-- <div class="lang-selector">
			<img alt="german language selection" v-on:click="switchLanguage('de')" class="lang-flag"
				 :style="locale == 'de' ? 'opacity: 1' : ''" src="@/assets/flags/de.webp" width="25" height="25" />
			<img alt="english language selection" v-on:click="switchLanguage('en')" class="lang-flag"
				 style="margin-right: 15px;" :style="locale == 'en' ? 'opacity: 1' : ''" src="@/assets/flags/gb.webp"
				 height="25" width="25" />
		</div> -->

		<WelcomeSection style="margin-top: 50px" />

		<RisographArtSection />

		<FavoriteMusicSection style="margin-top: -450px; margin-bottom: 0px; z-index: 10" />
		<RisographArtSection style="margin-top: 100px; z-index: -1;" />

		<InclusionSection style="z-index: 10; margin-top: -450px" />


		<PolaroidCreatorSection />
		<EndSection style="z-index: 10; margin-top: 0px; padding-bottom: 100px;" />

		<!-- <RisographArtSection :small="true" style="margin-top: -150px" /> -->

		<!-- <EndSection style="z-index: 10; margin-top: 50px; padding-bottom: 100px;" /> -->
		<!-- <iframe width="450" height="550"
				style="margin-top: -100px; z-index: 100!important; border: 10px solid #d0d0d0; border-radius: 20px;"
				src="https://dalli-dalli.vercel.app/viewer?image=https%3A%2F%2Ftierheim-guetersloh.de%2Fwp-content%2Fuploads%2F2023%2F10%2FJasper-neu-4-820x1093.jpg&interval=1000&shapes=20&type=voronoi"></iframe> -->

		<!--
		

		-->
		<!-- 
        <InstagramMusicSection style="margin-top: 75px" />
        <RisographArtSection :small="true" style="margin-top: -75px" />
        <PolaroidCreativitySection style="margin-bottom: -180px; margin-top: -100px;" />



    
        <RisographArtSection :small="true" style="margin-top: -150px" />

         -->

		<!--     <GeoDalliDalliSection />

       
      


        

        <RisographArtSection :rotate="true" :small="true" style="margin-top: -200px" />




        <div style="height: 130px; margin-top: 50px; padding-top: 80px; z-index: -1; overflow: hidden;">
            <RisographArtSection :rotate="false" />
        </div> -->
	</div>
</template>

<script lang="ts" setup>

import WelcomeSection from './views/WelcomeSection.vue';
import RisographArtSection from './views/RisographArtSection.vue'
// import MusicLoveSection from './views/MusicLoveSection.vue';
import FavoriteMusicSection from './views/FavoriteMusicSection.vue'
// import InstagramMusicSection from './views/InstagramMusicSection.vue'
// import PolaroidCreativitySection from './views/PolaroidCreativitySection.vue';
import EndSection from './views/EndSection.vue';

import InclusionSection from './views/InclusionSection.vue';
import PolaroidCreatorSection from './views/PolaroidCreatorSection.vue'

// onMounted(() => {
// 	const doc = document.getElementById("application-area");
// 	console.log(doc)
// 	if (doc) doc.scrollTop = 0;
// })

// import { useI18n } from 'vue-i18n'
// import GeoDalliDalliSection from './views/GeoDalliDalliSection.vue';
// import ProjectsSection from './views/ProjectsSection.vue';

// const { locale } = useI18n()


// function switchLanguage(localeId: string): void {
// 	if (locale.value === localeId) return;
// 	const urlParams = new URLSearchParams(window.location.search);

// 	urlParams.set('lang', localeId);

// 	window.location.search = urlParams.toString();
// }
</script>


<style scoped>
#application-area {
	position: relative;
}
</style>
