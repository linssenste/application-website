<template>
	<div id="polaroid-stack">

		<!-- stack animation section -->
		<ul class="polaroids-list" ref="listRef">


			<!-- polaroid stack -->
			<li v-for="(card, index) in polaroids" :key="index" @click="toggleExpansion()" :style="cardStyling(index)"
				class="polaroid " :data-testid="`polaroid-card-${index}`">


				<!-- themed image -->
				<PolaroidImage :src="card.src" :alt="card.text" :id="`polaroid-${index}`"
							   :overlay="(index == polaroids.length) && (showText && !expanded)" />
			</li>

			<!-- appended close button -->
			<li class="polaroid append-slot" :style="cardStyling(polaroids.length)"
				:class="!expanded ? 'append-slot-hidden' : ''" data-testid="close-button-card">

				<button v-on:click="toggleExpansion" data-testid="close-button">
					<img src="../../assets/icons/chevron-left-solid.svg" alt="chevron left" title="Close polaroid stack"
						 width="12" /></button>
			</li>
		</ul>


		<!-- text section -->
		<div class="welcome-text-area" :style="textTransition">
			<div class="intro-text">
				<slot name="text" />
			</div>
		</div>

	</div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import PolaroidImage from '../../components/images/PolaroidImage.vue';
import { debounce } from '../../utilities';


interface POLAROID_CARD {
	src: string,
	text: string
}

const props = defineProps<{
	polaroids: POLAROID_CARD[];
}>();

props.polaroids;

const showText = ref(true); // hide text part if expanded
const expanded = ref(false);

// references
const listRef = ref<HTMLElement | null>(null);

const windowWidth = ref(window.innerWidth);


onMounted(() => {


	if (!listRef.value) return;
	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) {
				if (expanded.value) toggleExpansion();
			}
		},
		{ threshold: 0 }
	);
	observer.observe(listRef.value);

	window.addEventListener('resize', debounce(handleResize, 250));

	setStyling()
});


onUnmounted(() => {
	window.removeEventListener('resize', handleResize);

});




function handleResize() {
	windowWidth.value = window.innerWidth;
}

watch(windowWidth, (newValue, oldValue) => {
	if (newValue !== oldValue && expanded.value) {
		toggleExpansion();
	}
});

const textTransition = computed(() => {
	return (window.innerWidth >= 1000 && !showText.value ? 'width: 0px!important; transition: all .3s ease-in-out' : 'transition: all .15s ease-in-out')
})

function cardStyling(index: number) {
	const rotation = expanded.value ? 0 : Math.floor(Math.random() * 15 - 7);
	const left = expanded.value ? index * 345 + 28 : 28;

	return {
		zIndex: 10,
		transform: `rotateZ(${rotation}deg)`,
		left: `${left}px`,
	};
}

function toggleExpansion(): void {

	expanded.value = !expanded.value;

	if (window.innerWidth <= 850) showText.value = true;
	else showText.value = !expanded.value

	if (listRef.value) setStyling()
}

defineExpose({ toggleExpansion })

function setStyling() {

	if (!listRef.value) return;

	// editable min and max width of stacked polaroids 
	const minWidth = "350px"
	const maxWidth = "calc(100% - 30px)";

	if (!expanded.value) listRef.value.style.overflowX = 'hidden'
	else listRef.value.style.overflowX = 'scroll'

	// listRef.value.style.maxWidth = expanded.value ? maxWidth : minWidth;
	listRef.value.style.transition = `all ${expanded.value ? '.3' : '.3'}s ease-in-out`;
	listRef.value.style.width = expanded.value || window.innerWidth < 350 ? maxWidth : minWidth;
}

</script>

<style scoped>
#polaroid-stack {
	position: relative;
	display: flex;

	width: 100%;
	min-height: 450px;
	flex-direction: row;

	align-items: center;
	justify-content: center;
	margin-bottom: 15px;
}



.welcome-text-area {
	position: relative;
	overflow: hidden;
	width: 700px;
	max-width: calc(100% - 450px);
}

.intro-text {
	position: relative;
	width: 550px;
	max-width: 550px;
	min-width: 550px;
	padding-left: 50px;
	text-align: justify;
}


@media screen and (max-width: 1000px) {
	#polaroid-stack {

		gap: 10px;
		flex-direction: column;

	}

	.welcome-text-area {
		width: 100%;
		max-width: 100%;
	}

	.intro-text {

		position: relative;
		width: calc(100% - 40px) !important;
		max-width: calc(100% - 40px);
		min-width: calc(100% - 40px);
		padding-left: 0px;
		padding: 20px;
		padding-top: 0px;
	}

}

ul.polaroids-list {


	height: 440px;

	padding-top: 40px;
	margin: 0px !important;
	list-style-type: none;

	position: relative;
	overflow-x: auto;
	white-space: nowrap;
	cursor: default;
	user-select: none;
	-moz-user-select: none;
	-webkit-user-select: none;


}





ul.polaroids-list li.polaroid {
	overflow: hidden;
	position: absolute;
	transition: all .3s ease-in-out;
	-webkit-transition: all .3s ease-in-out;
	-moz-transition: all .3s ease-in-out;

	cursor: pointer;

	/* cubic-bezier(0.63, 0.15, 0.03, 1.12)  */
}


.prepend-slot,
.append-slot {
	transition: all 50ms ease-in-out;
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;

	width: 50px;
	height: 400px;

	opacity: 1;
	padding-right: 40px;
}

.prepend-slot {
	width: 300px;
	padding-left: 5px;
	padding-right: 5px
}

.append-slot button {
	background-color: #e0e0e0;
	border-radius: 10px;
	outline: none;
	border: none;
	height: 100px;
	width: 50px;
	opacity: .65;
	cursor: pointer;
	transition: all 200ms ease-in-out;
}

.append-slot button:hover {
	height: 395px;
	opacity: 1;
}


.append-slot-hidden {
	width: 0px !important;
	opacity: 0;
	pointer-events: none
}
</style>