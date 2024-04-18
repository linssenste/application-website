<template>
	<div class="music-videos">
		<div class="video-column">
			<video controls id="slovenia-video" poster="/instagram/slovenia_thumbnail.jpg" style="border-radius: 12px"
				   fetchpriority="high">
				<source src="https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/slovenia_aftermovie.mp4?alt=media&token=7ab60e9b-2a72-437f-90e1-22c491a053fb"
						type="video/mp4" />
			</video>

			<div>Holiday in Slovenia</div>
		</div>
		<div class="video-column">
			<video controls id="mountain-video" poster="/src/assets/videos/thumbnail-mountain.webp"
				   style="border-radius: 12px" fetchpriority="high">
				<source src="https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/wallberg-2.mp4?alt=media&token=c88322f9-f992-487e-8dd9-3af8e0cbcc4f"
						type="video/mp4" />
			</video>
			<div>Morning in the mountain</div>
		</div>

	</div>
</template>



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
	padding-top: 10px;
	font-size: 20px;
	font-family: 'biro_script_standardregular';
	color: var(--pen-color)
}

.video-column video {
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

	width: 300px;
	height: 534px;
	background-color: var(--light-grey-color)
}
</style>