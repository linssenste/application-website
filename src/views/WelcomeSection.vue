<template>
	<div ref="welcomeSectionRef">

		<PolaroidStack ref="polaroidStack" :polaroids="shufflePolaroids()">

			<template v-slot:text>

				<h1>Hello<span v-if="welcomeName && welcomeName.length > 0" style="margin-left: 12px"> {{ welcomeName
						}}</span>,
				</h1>
				<p>
					My name is Steffen, and I am a front-end developer with a passion for sleek UI &
					UX. My work is driven by a deep interest for both technology and design, complemented by my
					enthusiasm for music. I may not be a virtuoso, but the world of melodies deeply influences and
					inspires my creative process.

				<p>This website is more than just a portfolio of my technical skills and creative endeavours. <span
						  id="human">It's a
						window into my personal world</span>. Here you'll find a series of Polaroid images that offer
					glimpses into
					my daily life, share insights into my journey with disability, and reveal my deep connection to
					music. Together, these elements are a
					reflection of the many aspects of my life and passions.</p>
				<!-- <p>Ich bin ein Frontend-Entwickler mit 4 Jahren Erfahrung und einem Faible für ansprechende <span
							  id="ux">UI & UX</span>.
						Außerdem bin ich stolzer Hundebesitzer und ein großer Musikliebhaber.
					</p>


					Diese Website habe ich entwickelt, um sowohl mein technisches Wissen & meine Kreativität zu
					präsentieren, als auch einen persönlichen Einblick in mein Leben zu geben. Musik bedeutet mir sehr
					viel
					in meinem Leben - deshalb habe ich diese Website rund um das Thema Musik aufgebaut.
					<div>Im Vordergrund von dieser Webseite stehen nicht meine beruflichen Leistungen, sondern ich als
						<span id="human">Mensch</span>.
						Ich möchte Euch in
						meine Welt entführen, meine Leidenschaft für Musik mit Euch teilen und offen über meine
						Behinderung
						sprechen.
					</div> -->

				</p>

				<Button v-on:click="toggleGallery" color="black" text="Show Gallery"
						style="margin-top: 20px; margin-bottom: 20px" />
			</template>

		</PolaroidStack>
	</div>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { annotate } from 'rough-notation';
import PolaroidStack from '../components/images/PolaroidStack.vue'
import Button from '../components/Button.vue'
import { onMounted } from 'vue';

const welcomeName = ref('Herrlich Media')
const polaroidStack = ref<HTMLElement | null>(null);
const welcomeSectionRef = ref<HTMLElement | null>(null)
onMounted(() => {

	const urlParams = new URLSearchParams(window.location.search);
	const nameParam = urlParams.get('n');
	welcomeName.value = nameParam ?? '';

	const humanText = document.getElementById('human');
	if (!humanText) return;
	const annotationHuman = annotate(humanText, { type: 'underline', color: 'var(--pen-color)', padding: [0, 3, 0, 3] });


	if (!welcomeSectionRef.value) return;
	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) annotationHuman.show();
			else annotationHuman.hide();
		},
		{ threshold: 0 }
	);
	observer.observe(welcomeSectionRef.value);

})
function toggleGallery() {
	if (polaroidStack.value) {
		(polaroidStack.value as any).toggleExpansion();
		window.scroll({ top: 0, behavior: 'smooth' })
	}
}

type Polaroid = {
	src: string;
	text: string;
};

function shufflePolaroids(): Polaroid[] {
	let polaroids: Polaroid[] = [
		{ src: '/polaroids/polaroid-1.webp', text: 'moin' },
		{ src: '/polaroids/polaroid-2.webp', text: 'moin' },
		{ src: '/polaroids/polaroid-3.webp', text: 'moin' },
		{ src: '/polaroids/polaroid-4.webp', text: 'moin' },
		{ src: '/polaroids/polaroid-5.webp', text: 'moin' },
		{ src: '/polaroids/polaroid-6.webp', text: 'moin' },
		{ src: '/polaroids/polaroid-7.webp', text: 'moin' },
		{ src: '/polaroids/polaroid-8.webp', text: 'moin' },
		{ src: '/polaroids/polaroid-9.webp', text: 'moin' },
		{ src: '/polaroids/polaroid-10.webp', text: 'moin' },
		{ src: '/polaroids/polaroid-11.webp', text: 'moin' }
	];

	// Shuffle all but the last element
	for (let i = polaroids.length - 2; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[polaroids[i], polaroids[j]] = [polaroids[j], polaroids[i]]; // ES6 destructuring assignment for swapping
	}

	return polaroids;
}

</script>
