<template>
	<div class="polaroid-image" ref="tiltImage">
		<img preload fetchpriority="high" :src="src" :width="330" :alt="alt" data-testid="image" draggable="false" />
		<div v-if="overlay" data-testid="image-overlay" class="image-overlay">
			<slot name="default" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import VanillaTilt from 'vanilla-tilt'

const tiltImage = ref<any>(null)

const props = defineProps<{
	src: string;
	alt: string,
	overlay?: boolean
}>();

props.src;
props.alt;


onMounted(() => {
	VanillaTilt.init(tiltImage.value, {
		max: 2,
		speed: 200,
		reverse: true,

		glare: true,
		gyroscope: true,
		"max-glare": .15,
	})
})

</script>


<style scoped>
.polaroid-image {
	position: relative;
}

.image-overlay {
	position: absolute;
	top: 45px;
	right: 28px
}
</style>