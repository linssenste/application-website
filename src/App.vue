<template>
	<div id="application-area">
		<WelcomeSection style="margin-top: 50px" />

		<RisographArtSection />

		<FavoriteMusicSection style="margin-top: -450px; margin-bottom: 0px; z-index: 10" />
		<RisographArtSection style="margin-top: 100px; z-index: -1;" />

		<InclusionSection style="z-index: 10; margin-top: -450px" />


		<PolaroidCreatorSection />
		<EndSection style="z-index: 10; margin-top: 150px; padding-bottom: 100px;" />

	</div>
</template>

<script lang="ts" setup>

import WelcomeSection from './views/WelcomeSection.vue';
import RisographArtSection from './views/RisographArtSection.vue'
import FavoriteMusicSection from './views/FavoriteMusicSection.vue'
import InclusionSection from './views/InclusionSection.vue';
import PolaroidCreatorSection from './views/PolaroidCreatorSection.vue'
import EndSection from './views/EndSection.vue';

</script>


<style scoped>
#application-area {
	position: relative;
}
</style>
