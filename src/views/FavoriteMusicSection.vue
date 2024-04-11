<template>
	<div>
		<AlbumCoverBanner ref="bannerRef" :playing="isPlaying" v-on:track-selected="selectedTrackEvent" />
		<div class="content-wrapper">
			<div class="scrollable-content">
				<div ref="leftSideRef">


					<div id="music-player" class="music-player-container content" :style="isVisible('music-player')">
						<MusicPlayer style="background-color: var(--light-grey-color); height: 352px; border-radius: 12px"
									 ref="musicPlayerRef" :trackId="selectedTrack" v-on:playing="isPlaying = $event" />
						<button v-on:click="selectRandomTrack()">SHUFFLE</button>
					</div>
					<div id="swim" class="content" :style="isVisible('swim')"
						 style="margin-top: 50px; position: relative; display: flex; flex-direction: row; justify-content: center;">
						<PolaroidImage alt="swimming" src="src/assets/polaroid_swimming.png" />
					</div>

					<div id="1" class="content" :style="isVisible('1')" style="margin-top: 50px;">
						<DataSetOverview :visible="currentFocus == '1'" :stats="analysisData.stats" />
					</div>

					<div id="3" class="content" :style="isVisible('3')">
						<DecadesBarChart :decades="analysisData.decades" />

					</div>

					<div id="4" class="content" :style="isVisible('4')">
						<FavoriteArtistsChart :visible="currentFocus == '4'" :artists="analysisData.artists" />

					</div>

					<div id="3" class="content" :style="isVisible('3')">
						<GenreRadarChart :data="analysisData.genres" />

					</div>
					<div id="5" class="content" :style="isVisible('5')">
						<AudioFeaturesChart :data="analysisData.features" :visible="currentFocus == '5'" />

					</div>

					<div id="6" class="content" :style="isVisible('6')">
						<GoogleColabCell :visible="currentFocus == '6'" />

					</div>


				</div>
			</div>



			<div class="right-side" ref="rightSideRef">
				<div style="padding: 40px; padding-top: 50px;">

					<KeepScrollingAnimation />


					<h1>Analysis of my swim playlist</h1>

					<p>In meiner Freizeit gehe ich gerne <span id="text-swim">Schwimmen</span>. Ich finde den Sport aber
						sehr sehr langweilig und
						höre deswegen während des Trainings immer Musik</p>


					<span id="text-1">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
						tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</span> <span
						  id="text-2">At vero eos et accusam et justo duo dolores et ea rebum.</span> <span id="text-3">
						Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</span> <span
						  id="text-4">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
						tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</span> At vero eos
					et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
					Lorem ipsum dolor sit amet.

					<Button style="margin-top: 50px" />
				</div>
			</div>
		</div>

		LAST UPDATE: YESTERDAY
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import AlbumCoverBanner from '../components/music/AlbumCoverBanner.vue'
import MusicPlayer from '../components/music/MusicPlayer.vue'
import { annotate } from 'rough-notation';
import Button from '../components/Button.vue'

import KeepScrollingAnimation from '../components/KeepScrollingAnimation.vue'
import { watch } from 'vue';
import analysisData from '../assets/spotify-analysis.json'
import GenreRadarChart from '../components/charts/GenreRadarChart.vue'
import FavoriteArtistsChart from '../components/charts/FavoriteArtistsChart.vue';
import DataSetOverview from '../components/charts/DataSetOverview.vue';
import PolaroidImage from '../components/images/PolaroidImage.vue';
import AudioFeaturesChart from '../components/charts/AudioFeaturesChart.vue'
import DecadesBarChart from '../components/charts/DecadesBarChart.vue'
import GoogleColabCell from '../components/charts/GoogleColabCell.vue'
const bannerRef = ref<typeof AlbumCoverBanner | null>(null);
const selectedTrack = ref<string | null>(null)
const isPlaying = ref(false)


const rightSideRef = ref<HTMLElement | null>(null);
const leftSideRef = ref(<HTMLElement | null>null);
let currentFocus = ref(null); // This will store the ID of the div in the center

function isVisible(id: string): string {
	return currentFocus.value == id ? 'opacity: 1' : 'opacity: .15'
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

let currentAnnotation = null

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

function selectRandomTrack() {
	if (bannerRef.value) bannerRef.value.randomAlbumTrack();
}

function selectedTrackEvent(trackId: string) {
	selectedTrack.value = trackId;
}
</script>

<style scoped>
.content-wrapper {
	display: flex;
}

.scrollable-content {
	width: calc(100% - 550px);
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 50px;
	justify-content: center;
	position: relative;
}

.right-side {
	width: 550px !important;
	min-width: 550px;
	max-width: 550px;
}



.right-side {
	right: 0px !important;


	padding-top: 50px;
	height: 100vh;
	/* background-color: red; */
	/* Smooth transition for the top position */
}

.content {
	transition: opacity 150ms ease-in-out;

	/* padding-top: 25px;
	padding-bottom: 25px; */
}

.music-player-container {
	/* background-color: grey; */
	height: 382px;

	padding: 20px;

}
</style>