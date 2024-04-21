<template>
	<div class="content-wrapper">
		<div class="scrollable-content" ref="leftSideRef">


			<div id="music-player" class="music-player-container content">
				<div class="hint-text">Select an album to play a song from it</div>
				<MusicPlayer playerId="favorite-music-player"
							 style="background-color: var(--light-grey-color); height: 352px; border-radius: 12px"
							 ref="musicPlayerRef" :trackId="track" v-on:playing="playingEvent" />
				<button v-on:click="shuffleEvent()">
					<img src="../../assets/icons/shuffle.svg" alt="shuffle icon" />
					SHUFFLE</button>
			</div>

			<div id="1" class="content" :style="isVisible('1')">
				<DataSetOverview :visible="currentFocus == '1'" :time="analysisData.update_time"
								 :stats="analysisData.stats" />
			</div>

			<div id="2" class="content" :style="isVisible('2')">
				<DecadesBarChart :decades="analysisData.decades" />

			</div>

			<div id="3" class="content" :style="isVisible('3')">
				<FavoriteArtistsChart :visible="currentFocus == '3'" :artists="analysisData.artists" />

			</div>

			<div id="4" class="content" :style="isVisible('4')">
				<GenreRadarChart :data="analysisData.genres" />
			</div>
			<div id="5" class="content" :style="isVisible('5')">
				<AudioFeaturesChart :data="analysisData.features" :visible="currentFocus == '5'" />
			</div>

			<div id="6" class="content" :style="isVisible('6')">
				<MusicVideos />
			</div>

			<div id="7" class="content" :style="isVisible('7')">
				<GoogleColabCell :visible="currentFocus == '7'" />
			</div>

		</div>



		<div class="right-side" ref="rightSideRef">
			<div>

				<KeepScrollingAnimation />

				<h1 style="margin: 0px!important">Get to know me through music!</h1>

				<AnalysisText />

			</div>
		</div>

	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import MusicPlayer from '../music/MusicPlayer.vue'
import { annotate } from 'rough-notation';
import AnalysisText from './AnalysisText.vue'
import KeepScrollingAnimation from '../KeepScrollingAnimation.vue'
import { watch } from 'vue';
import analysisData from '../../assets/analysis/export-spotify-analysis.json'
import GenreRadarChart from './GenreRadarChart.vue'
import FavoriteArtistsChart from './FavoriteArtistsChart.vue';
import DataSetOverview from './DataSetOverview.vue';
import MusicVideos from './MusicVideos.vue';

import AudioFeaturesChart from './AudioFeaturesChart.vue'
import DecadesBarChart from './DecadesBarChart.vue'
import GoogleColabCell from './GoogleColabCell.vue'
import { RoughAnnotation } from 'rough-notation/lib/model';





const rightSideRef = ref<HTMLElement | null>(null);
const leftSideRef = ref(<HTMLElement | null>null);
let currentFocus = ref(null); // This will store the ID of the div in the center


function isVisible(id: string): string {
	return currentFocus.value == id ? 'opacity: 1' : 'opacity: .15; pointer-events: none'
}
const handleScroll = () => {
	if (!leftSideRef.value || !rightSideRef.value) return;

	const leftSideBounds = leftSideRef.value.getBoundingClientRect();
	const bottomPosition = (leftSideBounds.bottom - window.innerHeight);

	if (leftSideBounds.top <= 0 && bottomPosition > 0) {
		// Top of leftSideRef is out of view, but bottom is still in view
		rightSideRef.value.style.position = 'fixed';
		rightSideRef.value.style.top = '0px';
	} else if (bottomPosition <= 0) {

		// Bottom of leftSideRef is at or above the bottom of the viewport
		rightSideRef.value.style.position = 'absolute';
		rightSideRef.value.style.bottom = '0px';
		rightSideRef.value.style.top = 'auto';

	} else {

		// leftSideRef is completely in view
		rightSideRef.value.style.position = 'relative';
	}

	const childDivs = leftSideRef.value.querySelectorAll('.content'); // Adjust the selector as needed
	const viewportCenter = window.innerHeight / 2 + window.scrollY;

	let closestDivId = null;
	let smallestDistance = Infinity;

	childDivs.forEach((div) => {
		const divBounds = div.getBoundingClientRect();
		const divCenter = divBounds.top + divBounds.height / 2 + window.scrollY;
		const distanceToCenter = Math.abs(viewportCenter - divCenter);

		if (distanceToCenter < smallestDistance) {
			smallestDistance = distanceToCenter;
			closestDivId = div.id;
		}
	});

	if (closestDivId !== currentFocus.value) {
		currentFocus.value = closestDivId;

	}



};

let currentAnnotation: RoughAnnotation | null = null

watch(currentFocus, () => {

	if (currentAnnotation != null) currentAnnotation.hide();

	const humanText = document.getElementById(`text-${currentFocus.value}`);

	if (!humanText) return;

	currentAnnotation = annotate(humanText, { type: 'underline', color: 'var(--pen-color)', multiline: true, padding: [0, 3, 0, 3] });

	currentAnnotation.show();

})


onMounted(() => {
	// selectRandomTrack();
	window.addEventListener('scroll', handleScroll);

});

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll);
});


const emit = defineEmits(['shuffle', 'playing']);


const props = defineProps<{
	track: string | null;
}>()
props.track;


function shuffleEvent(): void {
	emit('shuffle')
}

function playingEvent(isPlaying: boolean): void {
	emit('playing', isPlaying)
}
</script>

<style scoped>
.content-wrapper {
	display: flex;
	flex-direction: row;
	width: 100%;
	position: relative;
}

.scrollable-content {
	width: calc(100% - 600px);

	overflow-x: hidden;


	display: flex;
	align-items: center;
	flex-direction: column;

	gap: 35px !important;
	justify-content: center;
	position: relative;

}

.content-area {
	max-width: calc(100% - 50px);
	background-color: green
}

.right-side {

	width: 600px !important;
	min-width: 600px;
	max-width: 600px;
	box-sizing: border-box;

	background-color: white;
	right: 0px !important;


	padding: 30px;
	padding-top: 30px;
	padding-right: 50px;
	height: 100vh;
}



.content {
	width: 100%;
	max-width: 650px;
	transition: opacity 150ms ease-in-out;
}

.music-player-container {
	margin-top: 45px;
	margin-bottom: 35px;
	/* background-color: grey; */
	width: 100%;
}

.music-player-container button {
	width: 100%;
	margin-top: 15px;
	border-radius: 12px;
}
</style>