<template>

	<button class="action-btn">
		<span class="circle" aria-hidden="true" :style="`background: var(--${color ?? 'black'}-color)`">
			<span class="icon arrow"></span>
		</span>
		<span class="button-text" :style="`color: var(--${color ?? 'black'}-color)`">
			{{ text }}
		</span>
	</button>

</template>

<script setup lang="ts">

const props = defineProps<{
	color?: string;
	text: string
}>();
props.color;
</script>
<style scoped lang="scss">
// @import url('https://fonts.googleapis.com/css?family=Mukta:700');

button {
	position: relative;
	display: inline-block;
	cursor: pointer !important;
	outline: none;
	border: 0;
	vertical-align: middle;
	text-decoration: none;
	background: transparent;
	padding: 0;
	font-size: 17px !important;
	font-family: 'Mukta';
	user-select: none;
	-moz-user-select: none;
	-webkit-user-select: none;
	opacity: 1 !important;
}

button.action-btn {
	height: auto;
	padding: 20px 40px;
}

button.action-btn .circle {
	transition: all 0.45s cubic-bezier(0.65, 0, .076, 1);
	transition: all 0.45s cubic-bezier(0.65, 0, .076, 1) -webkit-;
	position: absolute;
	top: 50%;
	left: 0;
	transform: translateY(-50%);
	-webkit-transform: translateY(-50%);
	will-change: transform, width;
	display: block;
	width: 3rem;
	height: 3rem;
	/* background: var(--black-color); */
	border-radius: 1.625rem;
}

button.action-btn .button-text {
	transition: all 0.45s cubic-bezier(0.65, 0, .076, 1);
	transition: all 0.45s cubic-bezier(0.65, 0, .076, 1) -webkit-;
	padding-left: 30px;
	/* color: var(--black-color); */
	font-weight: 700;
	line-height: 1.6;
	text-align: center;
	text-transform: uppercase;
	z-index: 2;
	position: relative;
	will-change: color;
}

button.action-btn .circle .icon {
	transition: all 0.45s cubic-bezier(0.65, 0, .076, 1);
	transition: all 0.45s cubic-bezier(0.65, 0, .076, 1) -webkit-;
	position: absolute;
	top: 0;
	bottom: 0;
	margin: auto;
	background: var(--white-color);
}

button.action-btn .circle .icon.arrow {
	left: 0.625rem;
	width: 1.125rem;
	height: 0.125rem;
	background: none;
}

button.action-btn .circle .icon.arrow::before {
	position: absolute;
	content: '';
	top: -0.25rem;
	right: 0.0625rem;
	width: 0.625rem;
	height: 0.625rem;
	border-top: 0.14rem solid #fff;
	border-right: 0.14rem solid #fff;
	transform: rotate(45deg);
	-webkit-transform: rotate(45deg);
}

@media (min-width: 768px) {
	button:hover .circle {
		width: 100%;
		z-index: 1;
	}

	button:hover .circle .icon.arrow {
		background: var(--white-color);
		transform: translate(1rem, 0);
		-webkit-transform: translate(1rem, 0);
	}

	button:hover .button-text {
		color: var(--white-color) !important;
	}
}
</style>