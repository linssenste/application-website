<template>
	<div class="audio-equalizer">
		<div v-for="i in 5" :key="i" :data-testid="`visualizer-${i}`"
			 :style="{ animationDelay: getDelay(), backgroundColor: getColor(i) }" class="audio-visualizer"
			 :class="!playing ? 'pause' : 'play'" />
	</div>
</template>


<script setup lang="ts">
import { ref } from 'vue';


const props = defineProps<{
	playing: boolean
}>();

const colors = ["red", "blue", "pink", "yellow", "green", "orange"];
const shuffledColors = ref(shuffleArray([...colors]));


// set random transition delay to achieve equalizer effect
function getDelay(): string {
	const randomDelay = 100 + Math.random() * 600;
	return !props.playing ? 'infinite' : `${randomDelay}ms`;
}

function shuffleArray(array: string[]): string[] {
	return array.sort(() => 0.5 - Math.random());
}

// get random color
function getColor(index: number): string {
	return `var(--${shuffledColors.value[index % shuffledColors.value.length]}-color)`;
}
</script>



<style scoped>
.pause {
	animation: none !important;

	height: 6px;
}

.play {

	height: 20px !important;

	animation: equalizer .75s infinite;
	-moz-animation: equalizer .75s infinite;
	-webkit-animation: equalizer .75s infinite;

}

.audio-equalizer {
	display: flex;
	flex-direction: row;
	gap: 2px;

}

.audio-visualizer {
	width: 6px;
	height: 6px;
	border-radius: 4px;

	transition: all 200ms ease-in-out;

	transform-origin: center;
	opacity: .9;
	backdrop-filter: blur(8px);
	-webkit-backdrop-filter: blur(8px);
}

@keyframes equalizer {

	0%,
	100% {
		transform: scaleY(1);
		-webkit-transform: scaleY(1);
		-moz-transform: scaleY(1);
	}

	25% {
		transform: scaleY(1.5);
		-webkit-transform: scaleY(1.5);
		-moz-transform: scaleY(1.5);
	}

	75% {
		transform: scaleY(0.6);
		-webkit-transform: scaleY(.6);
		-moz-transform: scaleY(.6);
	}
}
</style>
