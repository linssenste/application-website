<template>
	<div class="container">
		<div class="status-icon">
			<svg v-if="!isRunning && hasRun && visible" class="check-icon" xmlns="http://www.w3.org/2000/svg"
				 viewBox="0 0 448 512">
				<path
					  d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
			</svg>
			<div v-if="!isRunning && hasRun && visible" class="status-text">0 s</div>
		</div>
		<div class="code-block">
			<div class="code-header">
				<div v-if="isRunning" class="running-border"></div>
				<div class="play-icon-container">
					<div class="play-icon" v-on:click="runCodeBlock()">
						<svg class="play-svg" width="14" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
							<polygon v-if="!isRunning || !visible" fill="#EEEEEE" points="35,20 85,50 35,80" />
							<rect v-else class="stop-svg" fill="#EEEEEE" x="25" y="25" width="50" height="50" />

						</svg>
					</div>
					<div v-if="isRunning && visible" class="running-border"></div>
				</div>
				<div class="code-content">

					<div class="green"># swim playlist analysis with Spotify API</div>
					<div>analysis_id = analyze(<span class="red">"spotify:playlist:0L58LDDYpBh7hncDnluUPl"</span>)</div>
					<div>report_url =
						<span class="blue">f</span><span class="red">"<span class="green">{</span><span
								  class="black">colab_base_url</span><span class="green">}</span>/drive/<span
								  class="green">{</span><span class="black">analysis_id</span><span
								  class="green">}</span>"</span>
					</div>
					<br>
					<div><span class="yellow">print</span><span class="blue">(f</span><span class="red">"Analysis
							complete. View report at:
							<span class="green">{</span><span class="black">report_url</span><span
								  class="green">}</span>"</span><span class="blue">)</span>
					</div>
					<div>
						openNewTab(report_url)
					</div>
				</div>
			</div>
			<div v-if="!isRunning && visible" class="code-footer">
				<!-- Link section -->
				Analysis complete. View report at: <a target="_blank"
				   href="google.com">https://colab.research.google.com/drive/1drw3bLtOIbpc7KaQRBnlsCN1reIKp7A5</a>

				<div v-if="openedLink">True</div>
				<div v-else>False</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { ref } from 'vue';

const props = defineProps<{
	visible: boolean
}>()

watch(() => props.visible, () => {
	if (props.visible == true) runCodeBlock(false);
})
const isRunning = ref(false)
const hasRun = ref(false)
const openedLink = ref(false)
function runCodeBlock(openLink: boolean = true): void {

	if (!props.visible) return
	isRunning.value = true;
	setTimeout(() => {
		isRunning.value = false;
		hasRun.value = true;

		if (openLink) {
			window.open('https://colab.research.google.com/drive/1drw3bLtOIbpc7KaQRBnlsCN1reIKp7A5', '_blank')

			openedLink.value = true
		} else {
			openedLink.value = false
		}
	}, 500 + Math.random() * 1000)
}
</script>
<style scoped lang="scss">
.container {
	position: relative;
	display: flex;
	margin-top: 35px;
	flex-direction: row;
	min-height: 250px;
	gap: 10px;
	max-width: 700px;
	min-width: 700px;
	width: 100%;
}

.status-icon {
	width: 20px;
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.check-icon {
	width: 10px;
	fill: #168037;
}

.status-text {
	font-size: 10px;
}

.code-block {
	width: calc(100% - 50px);
	height: fit-content;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
	border-radius: 4px;
	overflow: hidden;

	.code-header {
		position: relative;
		height: 150px;
		background-color: #F7F7F7;
		display: flex;
		flex-direction: row;
		align-items: start;

		.play-icon-container {
			z-index: 10;
			width: 40px;
			min-height: 40px;
			height: 100%;
			background-color: #EEEEEE;
			position: relative;

			.play-icon {
				background-color: #424242;
				width: 20px;
				height: 20px;
				border-radius: 50%;
				position: absolute;
				top: 10px;
				left: 50%;
				transform: translateX(-50%);
				cursor: pointer;

				svg {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
				}
			}
		}

		.comment {
			color: #008001;
			/* Green for comments */
		}

		.code {
			color: #000;
			/* Default text color for code */
		}

		.string {
			color: #A21515;
			/* Red for strings */
		}

		.function {
			color: #795E27;
			/* Brown for function names */
		}

		/* Adjust .code-content if needed to ensure proper spacing and alignment */
		.code-content {
			padding-left: 10px;
			padding-top: 10px;
			font-size: 14px;
			line-height: 22px;
			font-family: Consolas, Monaco, "Lucida Console", "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New";
		}
	}

	.code-footer {
		background-color: white;
		padding: 5px 50px;
		padding-top: 12px;
		padding-bottom: 12px;
		font-size: 13px;

		line-break: anywhere;
		font-family: Consolas, Monaco, "Lucida Console", "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New";

	}
}

.running-border {
	pointer-events: none;
	position: absolute;
	z-index: 5;
	width: 24px;
	height: 24px;
	border-radius: 50%;
	top: 6px;
	left: 6px;
	border: 2px solid #424242;
	border-style: dashed;
	transform-origin: center center;
	-webkit-animation: clockwise 5s infinite linear;
	-moz-animation: clockwise 5s infinite linear;
	animation: clockwise 5s infinite linear;
}


@-moz-keyframes clockwise {
	0% {
		-moz-transform: rotate(0deg);
	}

	100% {
		-moz-transform: rotate(360deg);
	}
}

@keyframes clockwise {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

.yellow {
	color: #795E27
}

.blue {
	color: #0000FF
}

.red {
	color: #A21515
}

.green {
	color: #008001
}

a {
	color: blue;
	text-decoration: underline;
}

.black {
	color: #000
}
</style>
