<template>
	<div>
		<VueApexCharts width="100%" type="radar" :options="chartOptions" :series="series"></VueApexCharts>
	</div>
</template>

<script lang="ts" setup>
import VueApexCharts from "vue3-apexcharts";
import { ref, onMounted } from 'vue';


const props = defineProps<{
	data: any,
}>();



// Function to process the loaded data and update the chart
const processData = () => {
	if (!props.data) return;

	// Extracting the top 8 genres
	const topGenres = Object.entries(props.data)
		.sort((a, b) => b[1] - a[1]) // Sort genres by count, descending
		.slice(0, 8) // Take the top 8
		.reduce((acc, [key, value]) => {
			acc.genres.push(key);
			acc.counts.push(value);
			return acc;
		}, { genres: [], counts: [] });

	// Updating chartOptions and series with the new data
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
					colors: ['transparent'] // Ensure radar areas are transparent
				}
			}
		}
	},
	// Add fill settings for radar area color
	fill: {
		type: 'solid', // Specify the fill type, solid for a solid color background
		colors: ['var(--red-color-transparent)'] // Specify the grey color for the radar area, you can adjust the shade as needed
	},
	// Add stroke settings for radar line color
	stroke: {
		show: true, // Ensure the stroke lines are shown
		colors: ['var(--red-color)'], // Specify the blue color for the radar lines, you can adjust the shade as needed
		width: 4 // Set the width of the radar lines, adjust as needed
	},
});


const series = ref([
	{ name: "series-1", data: [] }, // to be populated
]);

onMounted(() => {
	processData();
})

</script>
