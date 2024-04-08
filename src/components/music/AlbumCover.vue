<template>
	<div ref="tiltableCover" class="cover">
		<img draggable="false" class="cover-image" :alt="`${src.name} cover`"
			 v-lazy="`https://i.scdn.co/image/ab67616d0000b273${src.cover}`" />
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import VanillaTilt from 'vanilla-tilt'
import { onMounted } from 'vue';

const tiltableCover = ref<any>(null)

const props = defineProps<{
	src: {
		cover: string,
		name: string
	}
}>();
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

props.src;

</script>


<style scoped>
.cover {
	position: relative;
	padding: 6px;

	transition: z-index 150ms ease-in-out;
}

.cover-image {
	position: relative;
	width: 125px !important;
	height: 125px !important;
	transition: all 50ms ease-in-out;
	transform: scale(1);
	border-radius: 4px;

	box-shadow: 0 0 15px 0px #00000022;
}

.cover:hover .cover-image {
	transform: scale(1.35);
	box-shadow: 0 0 15px 0px #00000088;
}

.cover:hover {
	cursor: pointer;
	z-index: 100;
}
</style>