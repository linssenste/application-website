<template>
    <div :class="small? 'art-image-container-small':'art-image-container'">
        <img data-testid="risograph-image"
            alt="colorful rounded forms in risographic style with the letter S and L in the center"
            :src="small? '/risographics/risograph_small.webp':'/risographics/risograph.webp'"
            :style="rotate? 'transform: scaley(-1);':''" draggable="false" :class="small? 'art-image-small':'art-image'" />
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
.art-image-container,
.art-image-container-small {
    display: flex;
    justify-content: center;
    align-items: center;
}

.art-image-container {
    height: 120vh;
}

.art-image-container-small {
    height: 70vh;
}

.art-image,
.art-image-small {
    z-index: -1;
    opacity: 1;
    padding-top: 0px;
}

.art-image {
    height: 120vh;
    /* aspect-ratio: 1029/791; */
}

.art-image-small {
    height: 70vh;
}
</style>
