<template>
	<div style="position: relative; padding-top: 50px; padding-bottom: 50px; padding-left: 50px;">
		<h2><span id="top-header">TOP 5 ARTISTS</span></h2>
		<div v-for="(artist, index) in sortedArtists" class="artist-card">
			<div style="font-size: 18px; padding-right: 20px;"><b>{{ index + 1 }}.</b></div>
			<img draggable="false" height="90" width="90" style="border-radius: 12px; object-fit: cover;"
				 :src="artist.img" />
			<div style="width: 300px">
				<b style="font-size: 18px;">{{ artist.name }}</b>
				<div style="font-size: 16px; margin-top: 5px; letter-spacing: 1px; color: var(--grey-color)">
					<span>{{ artist.tracks }} TRACKS</span>
				</div>
			</div>

		</div>

	</div>
</template>



<script lang="ts" setup>
import { annotate } from 'rough-notation';
import { computed, watch } from 'vue';

interface ArtistStats {
	tracks: number,
	albums: number,
	img: string,
	occurrence: number,
	name: string
}
const props = defineProps<{
	artists: Record<string, ArtistStats>,
	visible: boolean
}>();

const sortedArtists = computed(() => {
	// Convert the artists object to an array of entries, each entry is [key, value]
	return Object.entries(props.artists)
		.map(([key, value]) => ({ ...value, id: key })) // Convert each entry into an object and include the original key as 'id'
		.sort((a, b) => b.occurrence - a.occurrence); // Sort based on the 'occurrence' property
});




let hasAnimated = false
watch(() => props.visible, () => {
	if (!props.visible || hasAnimated) return;

	const element = document.getElementById(`top-header`);

	if (!element) return;

	const ann = annotate(element, { type: 'underline', color: 'var(--pen-color)', multiline: true });

	ann.show();
	hasAnimated = true;
})
</script>

<style scoped>
.artist-card {
	position: relative;
	display: flex;
	padding: 10px;
	flex-direction: row;
	align-items: center;
	gap: 20px;
	border-radius: 6px;
	/* padding-left: 40px; */
	/* cursor: pointer; */
	/* transition: background-color 100ms ease-in-out; */
}

/* .artist-card:hover {
	background-color: #f0f0f0;
} */
</style>