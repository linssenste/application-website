<template>
	<div style="width: 100%; position: relative">

		<!-- (auto) scrolled cover area -->
		<AlbumCoverBanner ref="bannerRef" :playing="isPlaying" v-on:track-selected="selectedTrack = $event" />

		<ChartScroller v-if="!mobileView" v-on:shuffle="selectRandomTrack()" :track="selectedTrack"
					   v-on:playing="isPlaying = $event" />
		<MobileChartScroller v-else v-on:shuffle="selectRandomTrack()" :track="selectedTrack"
							 v-on:playing="isPlaying = $event" />
		<div style="text-align: center; margin-bottom: 15px"><span class="inline-handwriting">And btw I love music
				festivals: </span></div>
		<PolaroidImageRow
						  :images="[{ src: '/polaroids/polaroid-superbloom.webp', alt: 'Superbloom festival 2022' }, { src: '/polaroids/polaroid-frequency.webp', alt: 'Frequency festival in St. Pölten (Austria), 2022' }, { src: '/polaroids/polaroid-tempelhof.webp', alt: 'Tempelhof Sounds Festival 2022' }]" />

	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import AlbumCoverBanner from '../components/music/AlbumCoverBanner.vue'
import ChartScroller from '../components/charts/ChartScroller.vue'
import MobileChartScroller from '../components/charts/MobileChartScroller.vue'
import PolaroidImageRow from '../components/images/PolaroidImageRow.vue';

const bannerRef = ref<typeof AlbumCoverBanner | null>(null);
const isPlaying = ref(false);
const selectedTrack = ref('2ZOwd1GY5W5Wxdd5NJvgjG');
function selectRandomTrack() {
	if (bannerRef.value) bannerRef.value.randomAlbumTrack();
}

const mobileView = computed(() => {
	return window.innerWidth < 1000
})
</script>

<style scoped></style>