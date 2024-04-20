<template>
	<div class="hint-area" oncontextmenu="return false">
		<div class="scroll-downs">
			<div class="mousey">
				<div class="scroller"></div>
			</div>
		</div>

		KEEP SCROLLING
	</div>
</template>


<style scoped>
.hint-area {
	position: relative;
	display: flex;
	background-color: white;
	flex-direction: row;
	gap: 15px;
	align-items: center;
	letter-spacing: 1px;
	font-size: 16px;
	text-transform: uppercase;
	color: var(--red-color);
	margin-bottom: 15px;

	user-select: none;
	-moz-user-select: none;
	-webkit-user-select: none;

}

.scroll-downs {
	position: relative;
}

.mousey {
	width: 5px;
	padding: 2px 7px;
	height: 30px;
	border: 3px solid var(--red-color);
	border-radius: 25px;
	box-sizing: content-box;
}

.scroller {
	width: 5px;
	height: 5px;
	border-radius: 50%;
	top: -5px;
	background-color: var(--red-color);
	animation-name: scroll;
	animation-duration: 1s;
	animation-timing-function: cubic-bezier(.15, .41, .69, .94);
	animation-iteration-count: infinite;
}

@keyframes scroll {
	0% {
		transform: translateY(0);
	}

	10% {
		transform: translateY(0);

	}




	95% {
		transform: translateY(13px);
	}

	100% {
		transform: translateY(0);
	}
}
</style>