<template>
	<div :style="flexStyle" class="image-row" ref="containerRef">
		<PolaroidImage v-for="image in images" :key="image.src" :src="image.src" :alt="image.alt" />
	</div>
</template>

<script lang="ts" setup>
import PolaroidImage from './PolaroidImage.vue';
import { ref, onMounted, watch, onUnmounted, nextTick } from 'vue';

const props = defineProps<{
	images: { src: string, alt: string }[]
}>();

const containerRef = ref<HTMLElement | null>(null);

const flexStyle = ref({
	justifyContent: 'flex-start'
});

onMounted(async () => {

	window.addEventListener('resize', adjustJustification);

	await nextTick()
	adjustJustification();
});

watch(() => props.images, adjustJustification, { deep: true });

function adjustJustification() {
	if (containerRef.value) {
		const totalWidth = containerRef.value.scrollWidth;
		const containerWidth = containerRef.value.clientWidth;

		console.log("ADJU", totalWidth, containerWidth)
		if (totalWidth <= containerWidth) {
			flexStyle.value.justifyContent = 'center';
		} else {
			flexStyle.value.justifyContent = 'flex-start';
		}
	}
}

onUnmounted(() => {
	window.removeEventListener('resize', adjustJustification);
});
</script>


<style scoped>
.image-row {
	display: flex;
	flex-direction: row;
	gap: 20px;
	overflow-x: auto;
	overflow-y: hidden;
	padding: 20px;
	padding-bottom: 40px;
}
</style>