<template>
	<div class="art-image-container" ref="imageContainerRef">
		<img data-testid="risograph-image" fetchpriority="high" preload
			 alt="colorful rounded forms in risographic style with the letter S and L in the center"
			 src="../assets/risograph.svg" class="art-image" />
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

const imageContainerRef = ref<HTMLElement | null>(null);

const handleScroll = () => {
	const offset = window.scrollY;
	if (imageContainerRef.value) {
		imageContainerRef.value.style.transform = `translateY(-${offset * 0.075}px)`;
	}
};

onMounted(() => {
	window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.art-image-container {
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 1000px;
	/* Corrected min-width */
	overflow: hidden;
	/* Ensures content outside this container is not visible */
}

.art-image {
	z-index: -1;
	opacity: 1;
	transition: transform 0.2s ease-out;
	width: 100%;
	/* This will make sure the image takes up 100% of the .art-image-container */
	max-width: none;
	/* Overrides any default max-width */
}

@media (max-width: 1000px) {
	.art-image-container {
		min-width: 1000px;
	}

	.art-image {
		min-width: 1000px;
		margin-top: 50px;
		object-fit: cover;
	}
}
</style>
