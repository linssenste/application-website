<template>
	<div class="cover-card" ref="coverAreaRef">

		<div v-if="covers.length > 0" class="cover-area">
			<div class="photobanner">
				<div id="cover-container">


					<AlbumCover v-for="album in randomAlbumCovers" v-on:hovering="coverHoverEvent"
								v-on:click="selectedAlbum(album)" :src="album" />

				</div>
			</div>

		</div>

		{{ titleCount }} - {{ covers.length }}

		<div
			 style="width: 100%!important; max-width: 650px; border-radius: 10px; height: 280px; position: relative; background-color: #c0c0c0;">
			<MusicPlayer v-if="selectedTrack != null" :auto="true" style="height: 232px; width: 100%; "
						 ref="musicPlayerRef" :trackId="selectedTrack" />
			<button v-on:click="randomAlbumTrack()">SHUFFLE</button>
		</div>

		<MusicAnalysis />


	</div>
</template>


<script lang="ts" setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import AlbumCover from '../components/music/AlbumCover.vue'
import MusicPlayer from '../components/music/MusicPlayer.vue';
import MusicAnalysis from '../components/music/MusicAnalysis.vue'
import { onBeforeMount } from 'vue';
import { nextTick } from 'vue';
import covers from '../assets/spotify-covers.json'
// const covers = ref([])
const songId = ref<null | string>(null)
const musicPlayerRef = ref(null);
const randomAlbumCovers = computed(() => {
	return shuffleArray(covers);
})


const titleCount = computed(() => {
	return covers.reduce((acc, album) => acc + album.tracks.length, 0);
});


const coverAreaRef = ref(null)
let scrollInterval = null;
let isForward = true;
const startAutoScroll = () => {
	console.log("AUTOSCROLL")
	const container = document.getElementById('cover-container');
	if (!container) return;

	// Clears existing interval to prevent duplicates
	clearInterval(scrollInterval);

	scrollInterval = setInterval(() => {

		let pos = container.scrollLeft ?? 0;
		if (pos >= (container.scrollWidth - container.clientWidth)) isForward = false;
		else if (pos == 0) isForward = true



		pos += (1 * (isForward ? 1 : -1));

		container.scrollLeft = pos
		// container.scrollTo({
		// 	top: 0,
		// 	left: pos,
		// 	behavior: "smooth",
		// })
	}, 20); // Adjust speed as needed
};

const selectedTrack = ref(null);
async function selectedAlbum(album: any): Promise<void> {
	const randomIndex = Math.floor(Math.random() * album.tracks.length);
	selectedTrack.value = album.tracks[randomIndex];

}

function coverHoverEvent(status): void {
	console.log(status)
	// Pause auto-scrolling when the user manually scrolls

	if (status == true) {
		console.log("JSJS")
		clearInterval(scrollInterval);
	} else {
		startAutoScroll();
	}

}
function randomAlbumTrack() {

	const randomIndex = Math.floor(Math.random() * covers.length);

	selectedAlbum(covers[randomIndex])

}



onMounted(async () => {


	const observer = new IntersectionObserver(
		([entry]) => {
			console.log(entry.isIntersecting)
			if (entry.isIntersecting) startAutoScroll();
			else clearInterval(scrollInterval)
		},
		{ threshold: 0 }
	);
	observer.observe(coverAreaRef.value);



	const container = document.getElementById('cover-container');
	if (container) {

	}
});

onUnmounted(() => {
	clearInterval(scrollInterval); // Clear the interval when the component unmounts
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
.highlight {
	background: url(//s2.svgbox.net/pen-brushes.svg?ic=brush-1&color=fede00);
	background-size: 100% 55px;
	background-position: right 9px;
	background-repeat: no-repeat;
	font-family: 'biro_script_standardbold';

}

.cover-card {
	width: 100%;

	user-select: none;
	-moz-user-select: none;
	-webkit-user-select: none;
	position: relative;
}

.fav-player {
	border-radius: 12px;
	max-width: 600px !important;
	transition: all 1s linear;
}


.fav-subtext {
	width: 100%;
	text-align: center;
	padding-left: 10px;
	padding-right: 10px;
	position: absolute;
	top: 50%;
	padding-bottom: 40px;
	left: 50%;
	transform: translate(-50%, -50%);
	opacity: .75;
	color: #FFFFFF !important;
	letter-spacing: .5px;
}

.fav-text {

	margin-top: 0px;
	margin-bottom: 0px;

}


.fav-song {
	position: relative;

	max-width: 600px;
	/* height: 222px; */
	overflow: hidden;
	margin: 0 auto;
	margin-top: 10px;

	width: calc(100% - 20px);
	background-color: #282828;
	border-radius: 10px;
}


.fav-song-mobile {
	height: 422px
}

.quote-area {
	max-width: 750px;
	margin: 0 auto;
	margin-top: 50px;
	text-align: center;
}


.quote {
	font-size: 38px;
	font-family: 'biro_script_standardsloppy';
	color: #000F55;
	line-height: 45px
}

#cover-container {
	width: 100%;
	/* height: 120px; */
	position: relative;

	padding: 35px;

	display: flex;
	/* Align covers in a row */
	overflow-x: auto;
	/* Enable horizontal scrolling */
	scrollbar-width: thin;
	/* Optional: Makes the scrollbar thinner */

}


.cover-area {
	position: relative;
	width: 100%;
	/* Adjust as needed */
	overflow: hidden;
	/* Hide scrollbars */
	padding-bottom: 20px;
	/* Push the scrollbar out of view, adjust value based on your scrollbar height */
}

#cover-container {
	display: flex;
	overflow-x: auto;
	/* Enable horizontal scrolling */
	scrollbar-width: none;
	/* For Firefox */
	-ms-overflow-style: none;

	padding-top: 150px;
	/* For Internet Explorer and Edge */

	/* Hide the scrollbar, adjust value based on your scrollbar height */
}

/* For Chrome, Safari */
#cover-container::-webkit-scrollbar {
	display: none;
}


.photobanner {
	overflow-x: auto;
	white-space: nowrap;

	/* animation: bannermove 120s linear infinite; */
}

.photobanner img {
	/* height: 100px; */
	cursor: pointer;
	/* width: 150px; */

	margin-left: 10px;

	border-radius: 4px;
	transition: all 200ms ease-in-out;
	-webkit-user-drag: none !important;
	user-select: none !important;
	background-color: #F0F0F0;
}


@media (hover: hover) and (pointer: fine) {

	.photobanner img:hover {
		transition: all 100ms ease-out;
	}

}

@keyframes bannermove {
	0% {
		transform: translate(0, 0);
	}

	100% {
		transform: translate(-50%, 0);
	}
}



.shuffle-button {
	margin: 0 auto;
	position: absolute;
	bottom: 0px;
	background-color: #FFFFFFAA;
	color: black;
	margin: 10px;
	height: 40px;
	font-size: 17px;
	border-radius: 10px;
	display: flex;
	user-select: none;
	-moz-user-select: none;
	-webkit-user-select: none;
	justify-content: center;
	align-items: center;
	font-weight: 700 !important;
	letter-spacing: 1px;
	transition: background-color 100ms ease-in-out;
	cursor: pointer;
	width: calc(100% - 20px)
}

.shuffle-button img {
	margin-right: 10px;
}

.shuffle-button:hover {

	transition: background-color 100ms ease-in-out;
	background-color: #FFFFFF;
}


.song-placeholder {
	margin-top: 40px;
}
</style>