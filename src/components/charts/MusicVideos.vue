<template>
	<div class="music-videos">
		<div class="video-column">
			<div class="video-border">
				<video controls id="slovenia-video" width="300" poster="/instagram/slovenia_thumbnail.jpg"
					   style="border-radius: 12px" fetchpriority="high">
					<source src="https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/slovenia_aftermovie.mp4?alt=media&token=7ab60e9b-2a72-437f-90e1-22c491a053fb"
							type="video/mp4" />
				</video>
			</div>
			<div>Holiday in Slovenia</div>
		</div>
		<div class="video-column">
			<div class="video-border">
				<video controls id="mountain-video" width="300" poster="/src/assets/videos/thumbnail-mountain.webp"
					   style="border-radius: 12px" fetchpriority="high">
					<source src="https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/wallberg-2.mp4?alt=media&token=c88322f9-f992-487e-8dd9-3af8e0cbcc4f"
							type="video/mp4" />
				</video>
			</div>
			<div>Morning in the mountain</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';


onMounted(() => {
	const sloveniaVideo = document.getElementById('slovenia-video');
	const mountainVideo = document.getElementById('mountain-video');
	if (sloveniaVideo == null || mountainVideo == null) return
	sloveniaVideo.addEventListener('play', () => {
		(mountainVideo as HTMLVideoElement).pause();
	});

	mountainVideo.addEventListener('play', () => {
		(sloveniaVideo as HTMLVideoElement).pause();
	});

	// Intersection Observer to pause video when not visible
	const options = {
		root: null, // Using the viewport as the container
		rootMargin: '0px',
		threshold: 0.5 // 50% visibility
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (!entry.isIntersecting) {
				(entry.target as HTMLVideoElement).pause();
			}
		});
	}, options);

	observer.observe(sloveniaVideo);
	observer.observe(mountainVideo);
})
</script>



<style scoped>
.music-videos {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 50px;
}

.video-column {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center
}

.video-column div {
	font-size: 20px;
	font-family: 'biro_script_standardregular';
	color: var(--pen-color)
}

.video-border {
	border: 10px solid var(--light-grey-color);
	background-color: var(--light-grey-color);
	border-radius: 20px;
	width: 300px;
	height: 534px;
	position: relative;
}

.video-border video {
	background-color: var(--light-grey-color)
}

@media (max-width: 1250px) {
	.video-column:last-child {
		display: none;
	}
}
</style>