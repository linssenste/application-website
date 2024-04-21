<template>
	<div class="chart-container">
		<VueApexCharts width="100%" type="radar" :options="chartOptions" :series="series" />

		<div class="detailed-genre-chips">
			<span v-for="other in Object.keys(data.detailed)">
				{{ other }}
			</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import VueApexCharts from "vue3-apexcharts";
import { ref, onMounted } from 'vue';


const props = defineProps<{
	data: any,
}>();


const processData = () => {
	if (!props.data) return;

	// extracting the top 8 genres
	const topGenres = Object.entries(props.data.general)
		.sort((a, b) => b[1] - a[1]) // Sort genres by count, descending
		.slice(0, 8)
		.reduce((acc, [key, value]) => {
			acc.genres.push(key);
			acc.counts.push(value);
			return acc;
		}, { genres: [], counts: [] });

	// updating new data
	chartOptions.value.xaxis.categories = topGenres.genres.map(genre => genre.toUpperCase());
	series.value[0].data = topGenres.counts;
};


const chartOptions = ref({

	markers: { size: 0 },
	chart: {
		fontFamily: 'Hanken Grotesk',
		fontSize: "140px",
		id: "vuechart-example",
		toolbar: {
			show: true,
			tools: { download: false }
		},
	},
	dataLabels: {
		enabled: false,
		background: { enabled: true, borderRadius: 2, }
	},
	xaxis: {
		categories: [],
		labels: {
			show: true,
			style: {
				colors: ["#a8a8a8"],
				fontSize: "12px",
				fontFamily: 'Hanken Grotesk',
			}
		}
	},


	plotOptions: {
		radar: {
			polygons: {
				strokeColors: 'var(--light-grey-color)', // Adjust the grey tone for the radar net here
				fill: {
					colors: ['transparent']
				}
			}
		}
	},

	fill: {
		type: 'solid',
		colors: ['var(--red-color-transparent)']
	},

	stroke: {
		show: true,
		colors: ['var(--red-color)'],
		width: 4
	},
});


const series = ref([
	{ name: "series-1", data: [] }, // to be populated
]);

onMounted(() => {
	processData();
})

</script>


<style scoped>
.detailed-genre-chips {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	align-items: center;
	justify-content: center;
	width: 100%;
}

.detailed-genre-chips span {
	background-color: #F0F0F0;
	color: black;
	height: 20px;
	width: fit-content;
	padding: 10px 20px;
	border-radius: 6px;
	text-transform: uppercase;
	font-size: 15px;
	letter-spacing: 1px;
}


.chart-container {
	position: relative;
	width: 100%;
}
</style>
