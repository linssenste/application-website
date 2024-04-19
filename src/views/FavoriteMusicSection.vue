<template>
	<div style="width: 100%; position: relative">

		<!-- (auto) scrolled cover area -->
		<AlbumCoverBanner ref="bannerRef" :playing="isPlaying" v-on:track-selected="selectedTrackEvent" />


		<div class="content-wrapper">
			<div class="scrollable-content" ref="leftSideRef">


				<div id="music-player" class="music-player-container content" :style="isVisible('music-player')">
					<MusicPlayer playerId="favorite-music-player"
								 style="background-color: var(--light-grey-color); height: 352px; border-radius: 12px"
								 ref="musicPlayerRef" :trackId="selectedTrack" v-on:playing="isPlaying = $event" />
					<button v-on:click="selectRandomTrack()">
						<img src="../assets/icons/shuffle.svg" />
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

					<div style="line-height: 23px; font-size: 17px; text-align: justify;">
						<p style="margin-top: 10px!important">
							Music shapes our lives, reflecting our moods, personalities, and
							memories. <span id="text-1">I've chosen to
								introduce myself through the lens of my musical tastes</span>, quantified objectively
							here. My
							analysis is based on my swimming playlist.

						</p>
						<p>
							According to <a href="https://ojs.aaai.org/index.php/ICWSM/article/view/3250/3118"
							   target="_blank">research</a>, people tend to be particularly fond of music from their
							teenage
							years. And I happen to be no exception: My musical taste is largely <span
								  id="text-2">contemporary, dominated
								by the sounds of the last two decades</span>.

						</p>
						<p>
							The musician Faber is objectivly my <span id="text-3">favourite artist</span> with 35
							songs, closely followed
							by AnnenMayKantereit.
							This selection reflects my general favourite genres:<span id="text-4"> alternative, hip-hop,
								pop and indie</span> - all with a strong german influence.

						</p>
						<p>
							The overall <span id="text-5">mood of my playlist</span> tends to be danceable and
							melancholic, with a preference for
							energetic over relaxed and electronic over acoustic sounds.
						</p>

						<p>I enjoy weaving my musical tastes into my memories by creating videos that align with my mood
							and music.</p>

						Now you know me <span id="text-7" style="padding-top: 10px">a little better</span>

						<span v-if="currentFocus == 7" class="inline-handwriting ">?!</span>
					</div>

				</div>
			</div>

		</div>

		<div style="text-align: center; margin-bottom: 15px"><span class="inline-handwriting">And btw I love music
				festivals: </span></div>
		<PolaroidImageRow
						  :images="[{ src: '/src/assets/polaroids/polaroid-superbloom.webp', alt: 'Superbloom festival 2022' }, { src: '/src/assets/polaroids/polaroid-frequency.webp', alt: 'Frequency festival in St. Pölten (Austria), 2022' }, { src: '/src/assets/polaroids/polaroid-tempelhof.webp', alt: 'Tempelhof Sounds Festival 2022' }]" />

	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import AlbumCoverBanner from '../components/music/AlbumCoverBanner.vue'
import MusicPlayer from '../components/music/MusicPlayer.vue'
import { annotate } from 'rough-notation';

import KeepScrollingAnimation from '../components/KeepScrollingAnimation.vue'
import { watch } from 'vue';
import analysisData from '../assets/analysis/export-spotify-analysis.json'
import GenreRadarChart from '../components/charts/GenreRadarChart.vue'
import FavoriteArtistsChart from '../components/charts/FavoriteArtistsChart.vue';
import DataSetOverview from '../components/charts/DataSetOverview.vue';
import MusicVideos from '../components/charts/MusicVideos.vue';

import AudioFeaturesChart from '../components/charts/AudioFeaturesChart.vue'
import DecadesBarChart from '../components/charts/DecadesBarChart.vue'
import GoogleColabCell from '../components/charts/GoogleColabCell.vue'
import { RoughAnnotation } from 'rough-notation/lib/model';
import Button from '../components/Button.vue';
import PolaroidImageRow from '../components/images/PolaroidImageRow.vue';
const bannerRef = ref<typeof AlbumCoverBanner | null>(null);
const selectedTrack = ref<string | null>(null)
const isPlaying = ref(false)


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

	right: 0px !important;


	padding: 30px;
	padding-top: 50px;
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