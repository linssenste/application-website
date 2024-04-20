<template>
	<div class="stats-container">
		<div id="music-player" class="music-player-container content">
			<div class="selection-hint">Select an album to play a song from it</div>
			<MusicPlayer playerId="favorite-music-player"
						 style="background-color: var(--light-grey-color); height: 352px; border-radius: 12px"
						 ref="musicPlayerRef" :trackId="track ?? '2ZOwd1GY5W5Wxdd5NJvgjG'"
						 v-on:playing="playingEvent" />
			<button v-on:click="shuffleEvent()">
				<img src="../../assets/icons/shuffle.svg" />
				SHUFFLE</button>
		</div>


		<DataSetOverview :visible="true" :time="analysisData.update_time" :stats="analysisData.stats" />


		<div>
			<div>
				<h1 class="analysis-headline">Get to know
					me through music!
				</h1>

				<AnalysisText />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import MusicPlayer from '../music/MusicPlayer.vue';
import DataSetOverview from './DataSetOverview.vue';
import AnalysisText from './AnalysisText.vue'
import analysisData from '../../assets/analysis/export-spotify-analysis.json'


const emit = defineEmits(['shuffle', 'playing']);


const props = defineProps<{
	track?: string;
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
.selection-hint {
	text-align: center;
	color: var(--grey-color);
	text-transform: uppercase;
	font-size: 14px;
	padding-bottom: 10px;
	letter-spacing: 1px;
}


.music-player-container {

	margin-top: 25px;
	margin-bottom: 35px;
	/* background-color: grey; */

}

.music-player-container button {
	width: 100%;
	margin-top: 15px;
	border-radius: 12px;
}

.stats-container {
	margin: 20px;
}

.analysis-headline {
	margin: 0px !important;
	padding-top: 50px;
	line-height: 50px;
	text-align: center
}
</style>