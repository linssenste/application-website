<template>
	<div id="polaroid-stack">

		<ul class="polaroids-list" ref="listRef">

			<!-- music player card (aka last stack card) -->
			<li class="polaroid prepend-slot" style="" :style="cardStyling(0)">
				<MusicPlayer v-on:playing="isPlaying = $event" trackId="6X7R1KlDSwHK7wYwy94sYQ" :mini="false"
							 ref="musicPlayerRef" />
			</li>

			<!-- polaroid stack -->
			<li v-for="(card, index) in polaroids" :key="index" @dblclick="toggleExpansion"
				@click="!expanded ? toggleExpansion() : null" :style="cardStyling(index + 1)" class="polaroid ">

				<PolaroidImage :src="card.src" :alt="card.text" :id="`polaroid-${index}`"
							   :overlay="(index == polaroids.length - 1) && (showText && !expanded)">
					<template v-slot:default>
						<AudioVisualizer v-if="isPlaying" />
					</template>
				</PolaroidImage>

			</li>

			<!-- appended close button -->
			<li class="polaroid append-slot" :style="cardStyling(polaroids.length + 1)"
				:class="!expanded ? 'append-slot-hidden' : ''">

				<button v-on:click="toggleExpansion">
					<img src="../../assets/icons/chevron-left-solid.svg" alt="chevron left" title="Close polaroid stack"
						 width="10" /></button>
			</li>

		</ul>



		<div class="welcome-text-area" :style="textTransition">
			<div class="intro-text">
				<slot name="text" />
			</div>
		</div>


	</div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import PolaroidImage from '../../components/images/PolaroidImage.vue';
import MusicPlayer from '../../components/music/MusicPlayer.vue'
import AudioVisualizer from '../../components/music/AudioVisualizer.vue';


interface POLAROID_CARD {
	src: string,
	text: string
}

const props = defineProps<{
	polaroids: POLAROID_CARD[];
}>();

props.polaroids;

const isPlaying = ref(false)
const showText = ref(true); // hide text part if expanded
const expanded = ref(false);

// references
const listRef = ref<HTMLElement | null>(null);
const musicPlayerRef = ref<HTMLElement | null>(null)

// drag by mouse handles
const dragStartX = ref<number | null>(null);
const scrollLeft = ref<number>(0);

onMounted(() => {


	if (!listRef.value) return;
	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) {
				if (expanded.value) toggleExpansion();
				console.log(musicPlayerRef)
				if (isPlaying.value && musicPlayerRef.value) (musicPlayerRef.value as any).togglePlaying()
			}
		},
		{ threshold: 0 }
	);
	observer.observe(listRef.value);


	setStyling()
});



const textTransition = computed(() => {
	return (window.innerWidth >= 1000 && !showText.value ? 'width: 0px!important; transition: all .3s ease-in-out' : 'transition: all .15s ease-in-out')
})

function cardStyling(index: number) {

	// random rotation 
	const rotation = expanded.value ? 0 : (Math.floor(Math.random() * (7 - (-7) + 1) + (-7)));
	const left = ((!expanded.value ? 0 : (index) * 345)) + 28; // Adjust the spacing between cards
	return {
		zIndex: 10,
		transform: `rotateZ(${rotation}deg)`,
		left: `${left}px`,
		cursor: !expanded.value ? 'pointer' : ''
	};
}


// for drag scroll functionality
function handleMouseDown(event: MouseEvent) {
	if (!listRef.value || !expanded.value) return;
	event.preventDefault();
	dragStartX.value = event.pageX - listRef.value.offsetLeft;
	scrollLeft.value = listRef.value.scrollLeft;
	listRef.value.style.cursor = 'grabbing'; // Change cursor to grabbing
}

function handleMouseLeave() {
	if (dragStartX.value === null || !listRef.value || !expanded.value) return;
	dragStartX.value = null;
	listRef.value.style.cursor = 'grab'; // Reset cursor when leaving
}

function handleMouseUp() {
	if (dragStartX.value === null || !listRef.value || !expanded.value) return;
	dragStartX.value = null;
	listRef.value.style.cursor = 'grab'; // Reset cursor when releasing
}

function handleMouseMove(event: MouseEvent) {
	if (!listRef.value || dragStartX.value === null || !expanded.value) return;
	event.preventDefault();

	const x = event.pageX - listRef.value.offsetLeft;
	const walk = (x - dragStartX.value);
	listRef.value.scrollLeft = scrollLeft.value - walk;
}


function toggleExpansion(): void {

	expanded.value = !expanded.value;

	if (window.innerWidth <= 850) showText.value = true;
	else {
		showText.value = !expanded.value

	}

	if (!listRef.value) return;
	if (expanded.value == true) {
		listRef.value.style.cursor = 'grab'; // Reset cursor when leaving

		// drag event listeners
		listRef.value.addEventListener('mousedown', handleMouseDown);
		listRef.value.addEventListener('mouseleave', handleMouseLeave);
		listRef.value.addEventListener('mouseup', handleMouseUp);
		listRef.value.addEventListener('mousemove', handleMouseMove);
	} else {
		listRef.value.style.cursor = 'default'; // Reset cursor when leaving
		removeEventListener();
	}

	setStyling()
}

defineExpose({ toggleExpansion })

function setStyling() {

	if (!listRef.value) return;

	// editable min and max width of stacked polaroids 
	const minWidth = "350px"
	const maxWidth = "calc(100% - 30px)";

	if (!expanded.value) listRef.value.style.overflowX = 'hidden'
	else listRef.value.style.overflowX = 'scroll'

	// listRef.value.style.maxWidth = expanded.value ? maxWidth : minWidth;
	listRef.value.style.transition = `all ${expanded.value ? '.3' : '.3'}s ease-in-out`;
	listRef.value.style.width = expanded.value || window.innerWidth < 350 ? maxWidth : minWidth;
}


function removeEventListener() {
	if (!listRef.value) return;

	listRef.value.removeEventListener('mousedown', handleMouseDown);
	listRef.value.removeEventListener('mouseleave', handleMouseLeave);
	listRef.value.removeEventListener('mouseup', handleMouseUp);
	listRef.value.removeEventListener('mousemove', handleMouseMove);
}

onUnmounted(() => {
	removeEventListener();
});



</script>

<style scoped>
#polaroid-stack {
	position: relative;
	display: flex;

	width: 100%;
	min-height: 450px;
	flex-direction: row;

	align-items: center;
	justify-content: center;
	margin-bottom: 15px;
}



.welcome-text-area {
	position: relative;
	overflow: hidden;
	width: 700px;
	max-width: calc(100% - 450px);
}

.intro-text {
	position: relative;
	width: 550px;
	max-width: 550px;
	min-width: 550px;
	padding-left: 50px;
	text-align: justify;
}


@media screen and (max-width: 1000px) {
	#polaroid-stack {

		gap: 10px;
		flex-direction: column;

	}

	.welcome-text-area {
		width: 100%;
		max-width: 100%;
	}

	.intro-text {

		position: relative;
		width: 100% !important;
		max-width: 100%;
		min-width: 100%;
		padding-left: 0px;


	}

}

ul.polaroids-list {


	height: 440px;

	padding-top: 40px;
	margin: 0px !important;
	list-style-type: none;

	position: relative;
	overflow-x: auto;
	white-space: nowrap;
	cursor: default;
	user-select: none;
	-moz-user-select: none;
	-webkit-user-select: none;


}





ul.polaroids-list li.polaroid {
	overflow: hidden;
	position: absolute;
	transition: all .3s ease-in-out;
	-webkit-transition: all .3s ease-in-out;
	-moz-transition: all .3s ease-in-out;

	/*  cubic-bezier(0.63, 0.15, 0.03, 1.12) */
}

ul.polaroids-list li.polaroid:last-child {

	/* padding-right: 25px; */
}


.prepend-slot,
.append-slot {
	transition: all 50ms ease-in-out;
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;

	width: 50px;
	height: 400px;

	opacity: 1;
	padding-right: 40px;
}

.prepend-slot {
	width: 300px;
	padding-left: 5px;
	padding-right: 5px
}

.append-slot button {
	background-color: #e0e0e0;
	border-radius: 10px;
	outline: none;
	border: none;
	height: 100px;
	width: 50px;
	opacity: .65;
	cursor: pointer;
	transition: all 200ms ease-in-out;
}

.append-slot button:hover {
	height: 395px;
	opacity: 1;
}


.append-slot-hidden {
	width: 0px !important;
	opacity: 0;
	pointer-events: none
}
</style>