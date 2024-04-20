<template>
	<div class="main-content">
		<div class="text-content" ref="developmentRef">

			<h1 class="headline">Yep, that's it!</h1>
			<!-- <img draggable="false" width="60" height="60" style="margin-top: 5px; margin-left: 10px"
                    src="../assets/icons/heart.webp" /> -->

			<p>
				Thank you for exploring my personal website. I hope you feel like you know me a little better now,
				and maybe you've even discovered some new tunes for your playlist!
			</p>
			<p>
				On a technical note, this site was crafted using Vite & Vue 3 in TypeScript, with <span
					  id="developed">all components
					designed and developed by me</span>. The source code is obiously available on GitHub for those
				interested.
			</p>

			<github-button data-testid="github-link" href="https://github.com$/linssenste/application-website"
						   data-size="large" data-show-count="true" aria-label="View on GitHub"> View Source
				Code</github-button>


		</div>

		<div
			 style="position: relative; display: flex; flex-direction: column; align-items: center; gap: 20px; justify-content: center; width: 330px;">
			<iframe title="Grace Kelly by MIKA" class="spotify-iframe"
					src="https://open.spotify.com/embed/track/2TdDRjNiF1HuRvnclprnce?utm_source=generator&theme=1"
					loading="lazy"></iframe>

			<button v-on:click="" href="" target="_blank" class="resume-button" style="width: 100%">
				PROFESSIONAL TL;DR
			</button>

		</div>
	</div>
</template>

<script lang="ts" setup>
import GithubButton from 'vue-github-button';
import { annotate } from 'rough-notation';
import { onMounted, ref } from 'vue';

const developmentRef = ref<HTMLElement | null>(null)
onMounted(() => {

	const humanText = document.getElementById('developed');
	if (!humanText) return;
	const annotationDevelopment = annotate(humanText, { type: 'underline', color: 'var(--pen-color)', padding: [0, 3, 0, 3] });

	if (!developmentRef.value) return;
	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) annotationDevelopment.show();
			else annotationDevelopment.hide();
		},
		{ threshold: 0 }
	);
	observer.observe(developmentRef.value);
})
</script>


<style scoped>
.text-content {
	position: relative;
	max-width: 550px;
	margin-bottom: 50px;
}

.headline {
	margin: 0px;
}


.main-content {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 75px;
}

@media (min-width: 600px) {
	.main-content {
		flex-direction: row;
	}
}

.spotify-iframe {
	border-radius: 12px;
	width: 100%;
	/* Removed inline width and height */
	height: 352px;
	border: 0;
	/* FrameBorder set to 0 using CSS */
}
</style>