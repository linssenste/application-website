<template>
	<div class="stats-column">
		<div class="number-row">
			<div class="number-stat">
				<div class="number-stat value">{{ stats.tracks }}</div>
				<div class="number-stat key">Songs</div>
			</div>

			<div class="number-stat">
				<div class="number-stat value">{{ stats.albums }}</div>
				<div class="number-stat key">Albums</div>
			</div>


			<div class="number-stat">
				<div class="number-stat value">{{ stats.artists }}</div>
				<div class="number-stat key">Artists</div>
			</div>

			<div class="number-stat">
				<div class="number-stat value">{{ (stats.duration ?? 0) / 3600 }}</div>
				<div class="number-stat key">HOURS</div>
			</div>

		</div>

		<div class="last-update-time">{{ updateTime }}
		</div>

	</div>
</template>


<script lang="ts" setup>
import { computed } from 'vue';

interface DataStats {
	albums: number,
	tracks: number,
	artists: number
	duration: number
}
const props = defineProps<{
	stats: DataStats;
	time: number
}>();

const updateTime = computed(() => {
	const date = new Date(props.time * 1000);

	const dateFormatter = new Intl.DateTimeFormat('de-DE', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	});

	// format the date & return it
	return dateFormatter.format(date) + ' Uhr';
})

props.stats
</script>



<style scoped>
.stats-column {
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	gap: 25px
}

.number-row {
	position: relative;
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between !important;
}

.number-stat {
	display: flex;
	position: relative;

	flex-direction: column;
	align-items: center;
}

.number-stat .value {
	font-size: 50px;
}

.number-stat .key {
	font-size: 20px;
	letter-spacing: 2px;
	text-transform: uppercase;
}

.last-update-time {
	font-size: 15px;
	letter-spacing: 1px;
	color: var(--grey-color);
	margin-top: 15px;
}
</style>
