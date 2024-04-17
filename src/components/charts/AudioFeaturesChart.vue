<template>
	<div class="feature-graph">
		<div class="half-divider-line" />


		<!-- Danceability -->
		<div class="feature" style="margin-top: 40px;">
			<div class="description"><span id="danceability-left">Chillout</span></div>
			<div class="line">
				<div class="dot" :style="{ left: `calc(${data.danceability * 100}% - 20px)` }"></div>
			</div>
			<div class="description"><span id="danceability-right">Danceable</span></div>
		</div>

		<!-- Valence -->
		<div class="feature">
			<div class="description"><span id="valence-left">Depressed/Sad</span></div>
			<div class="line">
				<div class="dot" :style="{ left: `calc(${data.valence * 100}% - 20px)` }"></div>
			</div>
			<div class="description"><span id="valence-right">Happy</span></div>
		</div>


		<!-- Energy -->
		<div class="feature">
			<div class="description"><span id="energy-left">Chill</span></div>
			<div class="line">
				<div class="dot" :style="{ left: `calc(${data.energy * 100}% - 20px)` }"></div>
			</div>
			<div class="description"><span id="energy-right">ENERGETIC</span></div>
		</div>

		<div class="feature" style="margin-bottom: 50px;">
			<div class="description"><span id="acousticness-left">Electronic Vibes</span></div>
			<div class="line">
				<div class="dot" :style="{ left: `calc(${data.acousticness * 100}% - 20px)` }"></div>
			</div>
			<div class="description"><span id="acousticness-right">Unplugged</span></div>
		</div>

	</div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { annotate } from 'rough-notation';
import { onMounted } from 'vue';
import { watch } from 'vue';


const props = defineProps<{
	data: any,
	visible: boolean
}>();

let hasAnimated = false
watch(() => props.visible, () => {
	if (!props.visible || hasAnimated) return;

	createUnderlineAnimation('danceability');
	setTimeout(() => {
		createUnderlineAnimation('valence');
	}, (10 + Math.random() * 500));
	setTimeout(() => {
		createUnderlineAnimation('energy');
	}, (10 + Math.random() * 500));

	setTimeout(() => {
		createUnderlineAnimation('acousticness');

	}, (10 + Math.random() * 500));



})
onMounted(() => {

})

function createUnderlineAnimation(category: string): void {
	const humanText = document.getElementById(`${category}-${props.data[category] > 0.5 ? 'right' : 'left'}`);

	if (!humanText) return;

	const ann = annotate(humanText, { type: 'box', color: 'var(--pen-color)', multiline: true });

	ann.show();
	hasAnimated = true;
}
</script>

<style scoped>
.feature-graph {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 40px;
}

.feature {
	display: flex;
	align-items: center;
}

.description {
	flex: 1;
	text-align: center;
	text-transform: uppercase;
	font-size: 13px;
	letter-spacing: 1px;
}

.line {
	flex: 2;
	position: relative;
	height: 7px;
	border-radius: 4px;
	background-color: var(--light-grey-color);
}

.dot {
	position: absolute;
	z-index: 20;
	top: -7px;
	/* Adjust to center the dot vertically on the line */
	height: 20px;
	width: 20px;
	background-color: var(--red-color);
	border-radius: 50%;
}

.half-divider-line {
	position: absolute;
	left: 50%;
	height: calc(100% - 70px);
	width: 0px;
	top: 30px;
	border-left: 2px dotted var(--grey-color);
	z-index: 10;

}
</style>