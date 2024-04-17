<template>
	<div
		 style="padding-top: 25px; padding-bottom: 25px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 25px">
		<div style="position: relative;  display: flex; flex-direction: row; gap: 100px; justify-content: center; ">
			<div style="display: flex; flex-direction: column; align-items: center;">
				<div style="font-size: 50px;">{{ stats.tracks }}</div>
				<div style="font-size: 20px; letter-spacing: 2px; text-transform: uppercase;">Songs</div>
			</div>

			<div style="display: flex; flex-direction: column; align-items: center;">
				<div style="font-size: 50px;">{{ stats.albums }}</div>
				<div style="font-size: 20px; letter-spacing: 2px; text-transform: uppercase;">Albums</div>
			</div>


			<div style="display: flex; flex-direction: column; align-items: center;">
				<div style="font-size: 50px;">{{ stats.artists }}</div>
				<div style="font-size: 20px; letter-spacing: 2px; text-transform: uppercase;">Artists</div>
			</div>

			<div style="display: flex; flex-direction: column; align-items: center;">
				<div style="font-size: 50px;">50</div>
				<div style="font-size: 20px; letter-spacing: 2px; text-transform: uppercase;">HOURS</div>
			</div>

		</div>

		<div style="font-size: 15px; letter-spacing: 1px; color: var(--grey-color); margin-top: 15px;">{{ updateTime }}
		</div>

	</div>
</template>


<script lang="ts" setup>
import { computed } from 'vue';

interface DataStats {
	albums: number,
	tracks: number,
	artists: number
}
const props = defineProps<{
	stats: DataStats;
	time: number
}>();

const updateTime = computed(() => {
	const date = new Date(props.time * 1000);

	// Create a DateTimeFormat object with German locale and custom options for formatting
	const dateFormatter = new Intl.DateTimeFormat('de-DE', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	});

	// Format the date and return it
	return dateFormatter.format(date) + ' Uhr';
})

props.stats
</script>
