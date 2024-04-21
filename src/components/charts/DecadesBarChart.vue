<template>
	<div class="chart-contaienr">
		<VueApexCharts width="100%" type="bar" :options="chartOptions" :series="series" />
	</div>
</template>

<script lang="ts" setup>
import VueApexCharts from "vue3-apexcharts";
import { ref } from 'vue';

const props = defineProps<{
	decades: any,
}>();

// Prepare the series data from the 'decades' object
const series = ref([
	{
		name: 'Songs',
		data: Object.values(props.decades)
	}
]);

const chartOptions = ref({

	tooltip: {
		enabled: true // Disable hover effects by turning off the tooltip
	},
	chart: {
		fontFamily: 'Hanken Grotesk',
		id: "vuechart-example",
		toolbar: {
			show: true,
			tools: { download: false }
		},
	},
	dataLabels: {
		enabled: false
	},
	xaxis: {
		categories: Object.keys(props.decades).map(decade => `${decade.slice(2)}er`),
		labels: {
			style: {
				colors: ["#a8a8a8"],
				fontSize: "12px",
				fontFamily: 'Hanken Grotesk',
			}
		}
	},
	plotOptions: {
		bar: {
			horizontal: false,
			columnWidth: '55%',
		}
	},
	fill: {
		colors: ['#F44336']
	},
	stroke: {
		show: true,
		width: 2,
		colors: ['transparent']
	},
});
</script>


<style scoped>
.chart-container {
	width: 100%;
	position: relative;
}
</style>