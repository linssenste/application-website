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

		</div>

	</div>
</template>


<script lang="ts" setup>
interface DataStats {
	albums: number,
	tracks: number,
	artists: number
}
const props = defineProps<{
	stats: DataStats;
}>();


props.stats
</script>
