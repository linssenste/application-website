<template>

	<div id="polaroid-stack" data-testid="polaroid-stack">
		<ul class="polaroids-list" ref="listRef">
			<!-- Music player card (aka last stack card) -->
			<li class="polaroid" :style="cardStyling(0)" data-testid="music-player-card">

				<!-- embedded spotify music player -->
				<MusicPlayer trackId="6X7R1KlDSwHK7wYwy94sYQ" />

			</li>


			<!-- Polaroid stack -->
			<li v-for="(card, index) in polaroids" :key="index" @click="toggleExpansion" :style="cardStyling(index + 1)"
				class="polaroid" data-testid="polaroid-card">
				<PolaroidImage :src="card.src" :alt="card.text" :id="`polaroid-${index}`"
							   :overlay="(index === polaroids.length - 1) && showText && !expanded">
				</PolaroidImage>
			</li>

			<!-- Appended close button -->
			<li class="polaroid append-slot" :style="cardStyling(polaroids.length + 1)"
				:class="{ 'append-slot-hidden': !expanded }" data-testid="close-button-card">
				<button v-on:click="toggleExpansion">
					<img src="../../assets/icons/chevron-left-solid.svg" alt="Close polaroid stack" width="10" />
				</button>
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
import { computed, onMounted, ref } from 'vue';
import PolaroidImage from '../../components/images/PolaroidImage.vue';
import MusicPlayer from '../music/MusicPlayer.vue';

interface PolaroidCard {
	src: string;
	text: string;
}

const props = defineProps<{ polaroids: PolaroidCard[]; }>();
props.polaroids;

const showText = ref(true);
const expanded = ref(false);
const listRef = ref<HTMLElement | null>(null);

const refreshPlayer = ref(false); // mount and unmount iframe (for play pausing)
onMounted(() => {
	if (listRef.value) {
		const observer = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) {
				if (expanded.value) toggleExpansion();
				refreshPlayer.value = !refreshPlayer.value
			}
		}, { threshold: 0 });
		observer.observe(listRef.value);
		setStyling();
	}
});

const textTransition = computed(() => window.innerWidth >= 1000 && !showText.value ?
	'width: 0!important; transition: all .3s ease-in-out' :
	'transition: all .15s ease-in-out'
);

function cardStyling(index: number) {
	const rotation = expanded.value ? 0 : Math.floor(Math.random() * 15) - 7;
	const left = (!expanded.value ? 0 : index * 345) + 28;
	return {
		zIndex: 10,
		transform: `rotateZ(${rotation}deg)`,
		left: `${left}px`,
	};
}



function setStyling() {
	if (!listRef.value) return;
	const minWidth = "350px";
	const maxWidth = "calc(100% - 30px)";

	// modify component styles
	listRef.value.style.overflowX = expanded.value ? 'scroll' : 'hidden';
	listRef.value.style.transition = 'all .3s ease-in-out';
	listRef.value.style.width = expanded.value || window.innerWidth < 350 ? maxWidth : minWidth;

}


function toggleExpansion() {
	expanded.value = !expanded.value;
	showText.value = window.innerWidth <= 850 || !expanded.value;
	setStyling();
}

defineExpose({ toggleExpansion });
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


@media screen and(max-width:1000px) {
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
		background-color: red;
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
	cursor: pointer;
	position: absolute;
	transition: all .3s ease-in-out;
	-webkit-transition: all .3s ease-in-out;
	-moz-transition: all .3s ease-in-out;
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


.music-player {
	border-radius: 12px;
	position: relative;
	margin-left: 5px;
	margin-top: 20px;
}
</style>
