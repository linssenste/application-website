<template>
	<div class="disability-card">

		<div class="content-row">


			<div class="text-area">
				<h1 style="margin: 20px; line-height: 50px;">

					I'm weak and what's wrong with that ?

				</h1>

				<div class="text" style="padding-top: 0px!important;">
					At the age of 16, the chronic muscle disease myasthenia gravis became part of my life. Despite the
					aids I needed, I learnt to follow my dreams and not let my disability limit me, inspired by my life
					motto: "Limitations only go so far". This motto also drives me to pursue hobbies such as
					mountaineering and travelling, despite the challenges of my condition.
					My disability has also opened my eyes to the problems of inclusion in our society. In order to bring
					about change in this area, I am actively involved in this topic. I have given a TEDx talk and
					launched the podcast "Inclusions Thoughts" with Caritas. Here we try to look at inclusion from
					different perspectives.
					At the age of 16, the chronic muscle disease myasthenia gravis became part of my life. Despite the
					aids I needed, I learnt to follow my dreams and not let my disability limit me, inspired by my life
					motto: "Limitations only go so far". This motto also drives me to pursue hobbies such as
					mountaineering and travelling, despite the challenges of my condition.
					My disability has also opened my eyes to the problems of inclusion in our society. In order to bring
					about change in this area, I am actively involved in this topic. I have given a TEDx talk and
					launched the podcast "Inclusions Thoughts" with Caritas. Here we try to look at inclusion from
					different perspectives.

				</div>
			</div>

			<div>
				<iframe width="600" height="350" src="https://www.youtube-nocookie.com/embed/S-S5_oVNvZQ"
						title="YouTube video player" frameborder="0"
						style="border-radius: 15px; max-width: calc(100% - 20px)!important; margin: 10px; margin-top: 20px;"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen></iframe>
				<div>

					<iframe title="Inklusionsgedanken podcast on spotify" v-if="!isMobile" class="embedded-podcast"
							style="margin: 10px; width: calc(100% - 20px)"
							src="https://open.spotify.com/embed/episode/37APGyNAhgVwrTJZFxY56s?utm_source=generator&t=85"
							width="100%" frameBorder="0" loading="lazy"></iframe>
					<div v-if="locale === 'en' && !isMobile" class="en-sorry">Sorry, the TEDx-talk and podcast are in
						German
					</div>

				</div>
			</div>
		</div>

		<!-- <ImagesRow style="margin-top: 50px;" :images="[
            { name: './mountains/steffen_mountain_4.webp', type: 0, text: t('disability.imageText.0') },
            { name: './mountains/steffen_mountain_5.gif', type: 0, text: t('disability.imageText.1') },
            { name: './mountains/steffen_mountain_3.webp', type: 0, text: t('disability.imageText.2') },
            { name: './mountains/steffen_mountain_2.webp', type: 0, text: t('disability.imageText.3') },
            { name: './mountains/steffen_mountain_1.webp', type: 0, text: t('disability.imageText.4') }
        ]" songId="3BuLtAmXKy5uQYl4ED1zBT" rowId="mountains" /> -->



		<PolaroidImageRow :images="[
						{ src: 'src/assets/polaroids/polaroid-heimgarten.webp', alt: 'Mountain Heimgarten' },
						{ src: 'src/assets/polaroids/polaroid-herzogstand.webp', alt: 'Herzogstand' },
						{ src: 'src/assets/polaroids/polaroid-wallberg.webp', alt: 'Wallberg' },
						{ src: 'src/assets/polaroids/polaroid-smrekovec.webp', alt: 'Smrekovec ' },
					]" />

	</div>
</template>


<script lang="ts" setup>
// import ImagesRow from '../components/ImagesRow.vue';
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PolaroidImage from '../components/images/PolaroidImage.vue';
import PolaroidImageRow from '../components/images/PolaroidImageRow.vue';
const { t, locale } = useI18n()

const isMobile = computed(() => {
	return window.innerWidth < 600
})


</script>


<style scoped>
.content-row {
	display: flex;
	flex-direction: column;
	align-content: center;
	justify-content: center;
	margin-top: 30px;
}

@media (min-width: 600px) {
	.content-row {
		flex-direction: row;
	}
}

.disability-card {
	position: relative;
	width: 100%;
	margin: 0 auto;
	margin-top: 0px;
}


.embedded-podcast {
	border-radius: 12px;
	margin-bottom: 12px;
	margin-top: 4px;
	height: 352px
}


@media (min-width: 600px) {
	.embedded-podcast {
		height: 152px
	}
}


.text-area {
	max-width: 600px;
}

@media (min-width: 600px) {
	.text-area {
		margin-left: 30px
	}
}

.en-sorry {
	text-align: center;
	color: #A0A0A0;
	font-size: 14px;
	padding-bottom: 15px;
}
</style>