<template>
	<div class="art-image-container" ref="imageContainer">
		<img data-testid="risograph-image" fetchpriority="high" preload
			 alt="colorful rounded forms in risographic style with the letter S and L in the center"
			 src="../assets/risograph.svg" class="art-image" />
	</div>
</template>


<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';


const imageContainer = ref(null);

const handleScroll = () => {
	const offset = window.pageYOffset;
	if (imageContainer.value) {
		imageContainer.value.style.transform = `translateY(-${offset * 0.075}px)`;
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
	/* overflow: hidden; */
	/* Add this line to prevent the container from expanding */
}

.art-image-container {
	/* height: 120vh; */
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
