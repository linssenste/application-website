<template>
    <div v-if="!small" class="art-image-container">
        <img src="@/assets/risographics/risograph.webp" :style="rotate? 'transform: scaley(-1);':''" draggable="false"
            class="art-image" />
    </div>

    <div v-else class="art-image-container-small">
        <img src="@/assets/risographics/risograph_small.webp" :style="rotate? 'transform: scaley(-1);':''" draggable="false"
            class="art-image-small" />
    </div>
</template>


<script lang="ts" setup>
const props=defineProps<{
    rotate?: boolean;
    small?: boolean;
}>();

props.rotate;
</script>

<style scoped>
.art-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.art-image {
    z-index: -1;
    height: 120vh;
    opacity: 1;
    padding-top: 0px;
}

.art-image-container-small {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
}

.art-image-small {
    z-index: -1;
    height: 70vh;
}
</style>
