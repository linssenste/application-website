<template>
	<div class="cover">

		<!-- mouse tilt area -->
		<div ref="tiltableCover" class="tilt-cover">

			<!-- hover card showing album information of cover -->
			<div v-if="isHovering" class="cover-card">
				<b>{{ src.name }}</b>
				<br />
				<span>{{ src.artists[0].name }}</span>
			</div>

			<!-- album cover image (lazy loaded) -->
			<img draggable="false" class="cover-image" width="150" height="150" :alt="`${src.name} cover`"
				 v-on:mouseenter="setHoveringState(true)" v-on:mouseleave="setHoveringState(false)"
				 v-lazy="`https://i.scdn.co/image/ab67616d0000b273${src.cover}`" />

			<!-- audio equalizer overlay if song is playing -->
			<div v-if="selected" class="equalizer-overlay">
				<AudioVisualizer :playing="playing" class="audio-equalizer" />
			</div>

		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import VanillaTilt from 'vanilla-tilt'
import AudioVisualizer from './AudioVisualizer.vue'
import { isTouchDevice } from '../../utilities'
import { AlbumCover } from './AlbumCoverBanner.vue'
onMounted(() => {
	VanillaTilt.init(tiltableCover.value, {
		max: 12,
		speed: 200,
		reverse: true,

		glare: false,
		gyroscope: false,
		"max-glare": .25,
	})
})

const tiltableCover = ref<any>(null)

const emit = defineEmits(['hovering'])
const props = defineProps<{
	src: AlbumCover
	playing: boolean
	selected: boolean

}>();
props.src;

const isHovering = ref(false)

watch(isHovering, () => {
	if (!isTouchDevice.value) emit('hovering', isHovering.value);
})


function setHoveringState(status: boolean): void {
	if (!isTouchDevice.value) isHovering.value = status
	else isHovering.value = false;
}

</script>


<style scoped>
.cover {
	position: relative;
}

.cover-image {
	position: relative;
	width: 150px !important;
	height: 150px !important;
	transition: all 70ms ease-in-out;
	transform: scale(1);
	border-radius: 6px;
	background-color: #ffffffaa;
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);

	box-shadow: 0 0 18px 0px #aaaaaa55;
}

.tilt-cover {
	position: relative;
	padding: 6px;
	transition: z-index 150ms ease-in-out;
}

.equalizer-overlay {
	width: 150px;
	height: 150px;
	position: absolute;
	background-color: #f0f0f0aa;
	backdrop-filter: blur(5px);
	-webkit-backdrop-filter: blur(5px);
	top: 6px;
	left: 6px;
	border-radius: 6px;
	transition: all 70ms ease-in-out;
}

.cover-card {
	position: absolute;
	top: -90px;
	left: 50%;
	transform: translateX(-50%);
	padding: 10px 20px;
	/* Maintain horizontal padding */
	background-color: #f0f0f0aa;
	backdrop-filter: blur(5px);
	-webkit-backdrop-filter: blur(5px);
	border-radius: 10px;
	user-select: none;
	-moz-user-select: none;
	-webkit-user-select: none;

	min-width: 150px;
	max-width: 275px;
	white-space: nowrap;

	overflow: hidden;
	text-overflow: ellipsis;
	text-align: center;
}

.audio-equalizer {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	transition: all 70ms ease-in-out;
}


@media (hover: hover) and (pointer: fine) {

	.tilt-cover:hover .equalizer-overlay {
		opacity: 1;

		backdrop-filter: blur(0px);
		-webkit-backdrop-filter: blur(0px);
	}

	.tilt-cover:hover .equalizer-overlay {
		transform: scale(1.3);
	}

	.tilt-cover:hover .cover-image {
		transform: scale(1.3);
		box-shadow: 0 0 18px 0px #aaaaaa55;
	}

	.tilt-cover:hover {
		cursor: pointer;
		z-index: 100;
	}

}
</style>