<template>
	<div class="banner-area">

		<div class="cover-card" ref="coverAreaRef" id="cover-banner-container">
			<AlbumCover v-for="album in randomAlbumCovers" :playing="playing" :selected="albumId == album.id"
						:id="album.id" v-on:hovering="coverHoverEvent" v-on:click="selectedAlbum(album)" :src="album" />


		</div>
		<div v-if="!isTouchDevice" v-on:mouseenter="startManualScroll(false)" v-on:mouseleave="finishManualScroll()"
			 class="hover-scroll-pad-left">
			<img width="12" src="../../assets/icons/chevron-left-solid.svg" />
		</div>

		<div v-if="!isTouchDevice" v-on:mouseenter="startManualScroll(true)" v-on:mouseleave="finishManualScroll()"
			 class="hover-scroll-pad-right">
			<img width="12" src="../../assets/icons/chevron-right-solid.svg" />
		</div>
	</div>
</template>


<script lang="ts" setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import AlbumCover from '../../components/music/AlbumCover.vue'

import covers from '../../assets/spotify-covers.json'

const props = defineProps<{
	playing: boolean
}>();
props.playing;

const randomAlbumCovers = computed(() => {
	return shuffleArray(covers);
})

const emit = defineEmits(['track-selected'])


const coverAreaRef = ref<HTMLElement | null>(null)
let scrollInterval: ReturnType<typeof setTimeout> | null = null;
let isForward = true;
let isManualScrolling = false

const isTouchDevice = computed(() => {
	return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || ((navigator as any).msMaxTouchPoints > 0);
})

function startManualScroll(forward: boolean) {
	isForward = forward;
	isManualScrolling = true
	startAutoScroll()
}

function finishManualScroll() {
	isForward = true;
	isManualScrolling = false;
	startAutoScroll()
}
const startAutoScroll = () => {

	if (isTouchDevice.value) return

	const container = document.getElementById('cover-banner-container');
	if (!container) return;


	// Clears existing interval to prevent duplicates
	if (scrollInterval) clearInterval(scrollInterval);

	scrollInterval = setInterval(() => {

		let pos = container.scrollLeft ?? 0;
		if (!isManualScrolling) {
			if (pos >= (container.scrollWidth - container.clientWidth)) isForward = false;
			else if (pos == 0) isForward = true
		}

		pos += ((isManualScrolling ? 4 : 1) * (isForward ? 1 : -1));

		container.scrollLeft = pos
		// container.scrollTo({
		// 	top: 0,
		// 	left: pos,
		// 	behavior: "smooth",
		// })
	}, 20); // Adjust speed as needed
};

const selectedTrack = ref(null);
const albumId = ref(null)
async function selectedAlbum(album: any): Promise<void> {
	albumId.value = album.id;
	const randomIndex = Math.floor(Math.random() * album.tracks.length);
	selectedTrack.value = album.tracks[randomIndex];

	emit('track-selected', selectedTrack.value)

}

function coverHoverEvent(status: boolean): void {
	// Pause auto-scrolling when the user manually scrolls

	if (status == true && scrollInterval) clearInterval(scrollInterval);
	else startAutoScroll();


}
function randomAlbumTrack() {

	const randomIndex = Math.floor(Math.random() * covers.length);

	selectedAlbum(covers[randomIndex]);


}
defineExpose({ randomAlbumTrack })



onMounted(async () => {

	if (!coverAreaRef.value) return;


	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) startAutoScroll();
			else if (scrollInterval) clearInterval(scrollInterval)
		},
		{ threshold: 0 }
	);
	observer.observe(coverAreaRef.value);




	const container = document.getElementById('cover-banner-container');
	if (!container) return;
	container.scrollLeft = 85

	setTimeout(() => {
		randomAlbumTrack();
	}, 250);
});

onUnmounted(() => {
	if (scrollInterval) clearInterval(scrollInterval); // Clear the interval when the component unmounts
});


function shuffleArray(array: any[]) {
	let currentIndex = array.length;
	let temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

</script>

<style scoped>
#cover-banner-container {
	position: relative;
	padding-top: 150px;
	padding-left: 100px;
	padding-right: 200px;
	/* Adjusted to include the original 35px padding plus the additional padding */
	padding-bottom: 50px;
	display: flex;
	/* Align items in a row */
	overflow-x: auto;
	/* Enable horizontal scrolling */
	scrollbar-width: none;
	/* Hide scrollbar for Firefox */
	-ms-overflow-style: none;
	/* Hide scrollbar for IE and Edge */
}

/* Hide scrollbar for Chrome, Safari, and Opera */
#cover-banner-container::-webkit-scrollbar {
	display: none;
}


.hover-scroll-pad-right {
	position: absolute;
	bottom: 61px;
	z-index: 100;
	right: 0px;
	border-top-left-radius: 12px;
	border-bottom-left-radius: 12px;
	cursor: e-resize;
	background-color: white;
	opacity: 0;
	width: 40px;
	height: 125px;
	transition: opacity 150ms ease-in-out;
}

.hover-scroll-pad-right img {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.hover-scroll-pad-left {
	position: absolute;
	bottom: 61px;
	z-index: 100;
	left: 0px;
	cursor: w-resize;
	background-color: white !important;

	border-top-right-radius: 12px;
	border-bottom-right-radius: 12px;
	opacity: 0;
	width: 40px;
	height: 125px;
	transition: opacity 150ms ease-in-out;
}

.hover-scroll-pad-left img {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}


.hover-scroll-pad-left:hover {
	opacity: .75 !important;
	z-index: 100 !important;

}

.hover-scroll-pad-right:hover {
	opacity: .75 !important;
	z-index: 100 !important;
}


.banner-area {
	position: relative;
	user-select: none;
	-moz-user-select: none;
	-webkit-user-select: none;
}
</style>