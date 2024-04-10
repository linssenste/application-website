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
}

.art-image-container {
	height: 120vh;
}


.art-image {
	z-index: -1 !important;
	opacity: 1;
	padding-top: 0px;
	transition: transform 0.2s ease-out;
	/* Optional: Smoothens the movement */
}

.art-image {
	/* height: auto; */
	/* Changed to 'auto' to maintain aspect ratio */
	width: 100%;
	/* Ensure full width */
}
</style>
