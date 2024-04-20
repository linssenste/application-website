<template>

	<div class="polaroid-image" ref="polaroidRef">
		<img :src="src" :width="330" :height="395" :alt="alt" data-testid="image" draggable="false" />
	</div>

</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import VanillaTilt from 'vanilla-tilt'

const polaroidRef = ref<HTMLElement | null>(null);

const props = defineProps<{
	src: string;
	alt: string
}>();

props.src;
props.alt;


onMounted(() => {
	if (!polaroidRef.value) return;

	// initialize tilting functionality 
	VanillaTilt.init(polaroidRef.value, {
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
