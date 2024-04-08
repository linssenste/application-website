<template>
	<div v-if="!hasError" class="music-player" id="embed-iframe"></div>
	<iframe v-else style="border-radius:12px"
			:src="`https://open.spotify.com/embed/track/${props.trackId}?utm_source=generator`" width="100%"
			:height="mini ? 120 : 352" frameBorder="0"
			allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const hasError = ref(false)
//interface for the Spotify IFrame API controller
interface SpotifyIFrameAPI {
	createController: (
		element: HTMLElement | null,
		options: { uri: string; theme: string; height: number },
		callback: (controller: SpotifyController) => void
	) => void;
}

// interface for the controller that the Spotify API returns
interface SpotifyController {
	addListener: (event: string, callback: (e: any) => void) => void;
	togglePlay: () => void;
}

const props = defineProps<{
	trackId: string,
	mini?: boolean
}>();

watch(() => props.trackId, () => {
	if (props.trackId != null && embedController.value) embedController.value.loadUri('spotify:track:' + props.trackId);
});


const emit = defineEmits(['playing']);
const embedController = ref<SpotifyController | null>(null);
let errorTimeout: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
	try {
		errorTimeout = setTimeout(() => {
			hasError.value = true;
		}, 250);
		(window as any).onSpotifyIframeApiReady = (IFrameAPI: SpotifyIFrameAPI) => {

			if (errorTimeout) clearTimeout(errorTimeout);

			const element = document.getElementById('embed-iframe');
			const options = {
				uri: 'spotify:track:' + props.trackId,
				theme: "0",
				height: props.mini ? 120 : 352
			};
			const callback = (controller: SpotifyController) => {

				embedController.value = controller;
				controller.addListener('playback_update', e => {
					emit("playing", !e.data.isPaused && !(e.data.position >= e.data.duration));
				});
			};
			IFrameAPI.createController(element, options, callback);
		};
	} catch (error) {
		hasError.value = true;
		console.error("Error setting up Spotify iframe:", error);
	}
});


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
