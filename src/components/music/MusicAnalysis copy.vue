<template>
	<div class="switch-container" @click="toggleSwitch">
		<div class="switch" :class="{ 'switch--active': isActive }">
			<span class="switch-text">{{ switchText }}</span>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isActive: false, // switch state
		};
	},
	computed: {
		switchText() {
			return this.isActive ? 'Music' : 'Data';
		},
	},
	methods: {
		toggleSwitch() {
			this.isActive = !this.isActive;
		},
	},
};
</script>

<style scoped>
.switch-container {
	cursor: pointer;
	width: 120px;
	height: 50px;
	background-color: #f0f0f0;
	border-radius: 25px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	overflow: hidden;
	box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
	transition: background-color 0.3s ease;
}

.switch {
	width: 100px;
	height: 40px;
	background-color: #4caf50;
	border-radius: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: transform 0.3s ease;
}

.switch--active {
	transform: translateX(20px);
}

.switch-text {
	color: #ffffff;
	font-weight: bold;
}
</style>