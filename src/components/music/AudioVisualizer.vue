<template>
	<div class="audio-equalizer">
		<div v-for="i in 5" :key="i" :data-testid="`visualizer-${i}`"
			 :style="{ animationDelay: getDelay(), backgroundColor: getColor(i) }" class="audio-visualizer" />
	</div>
</template>


<script setup lang="ts">
import { ref } from 'vue';

const colors = ["red", "blue", "pink", "yellow", "green", "orange"];
const shuffledColors = ref(shuffleArray([...colors]));

// set random transition delay to achieve equalizer effect
function getDelay(): string {
	const randomDelay = 100 + Math.random() * 600;
	return `${randomDelay}ms`;
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
.audio-equalizer {
	display: flex;
	flex-direction: row;
	gap: 2px;
}

.audio-visualizer {
	width: 6px;
	height: 20px;
	border-radius: 4px;
	animation: equalizer .75s infinite;
	-moz-animation: equalizer .75s infinite;
	-webkit-animation: equalizer .75s infinite;
	transform-origin: center;
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
