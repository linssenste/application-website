<template>
	<div ref="welcomeSectionRef">

		<PolaroidStack ref="polaroidStack" :polaroids="shufflePolaroids()">

			<template v-slot:text>

				<h1>Hallo, ich bin Steffen!
				</h1>
				<div>
					<p>Ich bin ein Frontend-Entwickler mit 4 Jahren Erfahrung und einem Faible für ansprechende <span
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
					</div>

				</div>

				<Button v-on:click="toggleGallery" style="margin-top: 20px; margin-bottom: 20px" />
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

const polaroidStack = ref(null);
const welcomeSectionRef = ref(null)
onMounted(() => {

	const humanText = document.getElementById('human');
	if (!humanText) return;
	const annotationHuman = annotate(humanText, { type: 'underline', color: 'var(--pen-color)', padding: [0, 3, 0, 3] });


	const observer = new IntersectionObserver(
		([entry]) => {
			console.log("HH")
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
		{ src: '/src/assets/polaroids/polaroid-1.webp', text: 'moin' },
		{ src: '/src/assets/polaroids/polaroid-2.webp', text: 'moin' },
		{ src: '/src/assets/polaroids/polaroid-3.webp', text: 'moin' },
		{ src: '/src/assets/polaroids/polaroid-4.webp', text: 'moin' },
		{ src: '/src/assets/polaroids/polaroid-5.webp', text: 'moin' },
		{ src: '/src/assets/polaroids/polaroid-6.webp', text: 'moin' },
		{ src: '/src/assets/polaroids/polaroid-7.webp', text: 'moin' },
		{ src: '/src/assets/polaroids/polaroid-8.webp', text: 'moin' },
		{ src: '/src/assets/polaroids/polaroid-9.webp', text: 'moin' },
		{ src: '/src/assets/polaroids/polaroid-11.webp', text: 'moin' },
		{ src: '/src/assets/polaroids/polaroid-10.webp', text: 'moin' }
	];

	// Shuffle all but the last element
	for (let i = polaroids.length - 2; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[polaroids[i], polaroids[j]] = [polaroids[j], polaroids[i]]; // ES6 destructuring assignment for swapping
	}

	return polaroids;
}

</script>