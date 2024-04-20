<template>

	<div style="position:relative;  ">
		<div v-if="!hasError" class="music-player" :id="playerId"></div>
		<iframe v-else style="border-radius:10px"
				:src="`https://open.spotify.com/embed/track/${props.trackId}?utm_source=generator`" width="100%"
				height="100%" frameBorder="0" allow="clipboard-write; encrypted-media; picture-in-picture"
				loading="lazy"></iframe>

	</div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue';

const hasError = ref(false)
//interface for the Spotify IFrame API controller
interface SpotifyIFrameAPI {
	createController: (
		element: HTMLElement | null,
		options: { uri: string; },
		callback: (controller: SpotifyController) => void
	) => void;
}

// interface for the controller that the Spotify API returns
interface SpotifyController {
	addListener: (event: string, callback: (e: any) => void) => void;
	togglePlay: () => void;
	loadUri: (id: string) => void;
}

const props = defineProps<{
	trackId: string | null,
	playerId: string
}>();
props.playerId;

const emit = defineEmits(['playing']);



const embedController = ref<SpotifyController | null>(null);


let errorTimeout: ReturnType<typeof setTimeout> | null = null;
let isPlaying = false
watch(() => props.trackId, async () => {
	if (props.trackId == null) return;
	if (!embedController.value) {
		initSpotifyApi()
	} else if (props.trackId != null && embedController.value) {

		await embedController.value.loadUri('spotify:track:' + props.trackId);

		if (isPlaying) embedController.value?.togglePlay()


	}
}, { immediate: true });
function initSpotifyApi() {
	if (!props.trackId) return;
	hasError.value = false;

	// Extend timeout to a more reasonable duration
	errorTimeout = setTimeout(() => {
		if (embedController.value) return;
		console.error("Timeout occurred while setting up Spotify API");
		hasError.value = true;
	}, 2000);  // Increased timeout to 2000 ms

	try {

		(window as any).onSpotifyIframeApiReady = (IFrameAPI: SpotifyIFrameAPI) => {

			if (errorTimeout) clearTimeout(errorTimeout);

			const element = document.getElementById(props.playerId);

			if (!element) {
				hasError.value = true;
				return;
			}

			const options = {
				uri: 'spotify:track:' + props.trackId
			};

			const callback = (controller: SpotifyController) => {
				embedController.value = controller;
				hasError.value = false;

				controller.addListener('playback_update', e => {
					isPlaying = !e.data.isPaused;
					emit("playing", !e.data.isPaused && !(e.data.position >= e.data.duration));
				});
			};

			IFrameAPI.createController(element, options, callback);
		};
	} catch (error) {
		console.error("Error setting up Spotify iframe:", error);
		hasError.value = true;
	}
}




function togglePlaying() {
	try {
		embedController.value?.togglePlay();
	} catch (error) {
		console.error("Error toggling playback:", error);
	}
}

defineExpose({ togglePlaying });
</script>

<style scoped>
.music-player {
	width: 100%;
	height: 100%;
	position: relative;
}
</style>
