<template>
    <div class="image-row" :id="`image-row-${rowId}`">

        <!-- scroll left button -->
        <img alt="button to go left" v-bind:style="{ opacity: canScrollLeft? '1':'0' }"
            class="scroll-arrow scroll-arrow-left" @click="scroll('left')" src="../assets/icons/chevron-left-solid.svg" />

        <!-- scroll right button -->
        <img alt="button to go right" v-bind:style="{ opacity: canScrollRight? '1':'0' }"
            class="scroll-arrow scroll-arrow-right" @click="scroll('right')"
            src="../assets/icons/chevron-right-solid.svg" />


        <div class="row-scroll-container" data-testid="scroll-container">

            <div class="row-scroll-content" id="horizontal-scroll" ref="scrollContainer" data-testid="scroll-content">
                <PolaroidImage v-for="(image, index) in images" :key="index" :id="`polaroid-row-image-${rowId}-${index}`"
                    :name="image.name" :text="image.text" :data-testid="`polaroid-row-image-${rowId}-${index}`" />



                <div v-if="songId" :id="`polaroid-row-image-${rowId}-${images.length}`" class="song-container"
                    :data-testid="`spotify-music-iframe-container-${rowId}`">
                    <iframe title="Spotify music preview" style="border-radius:12px"
                        :src="`https://open.spotify.com/embed/track/${songId}?utm_source=generator&theme=0`" width="300"
                        height="352" frameBorder="0" loading="lazy"></iframe>

                </div>
            </div>

            <div class="row-scroll-fade-left" v-bind:style="{ opacity: canScrollLeft? '1':'0' }"></div>
            <div class="row-scroll-fade-right" v-bind:style="{ opacity: canScrollRight? '1':'0' }"></div>

        </div>

    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import PolaroidImage from './PolaroidImage.vue';

interface ImageObject {
    name: string,
    type: number,
    text?: string,
}

const props=defineProps<{
    rowId: string,
    songId?: string,
    images: ImageObject[]
}>();


const currentImageIndex=ref(0);
const scrollContainer=ref<HTMLElement|null>(null);

const canScrollLeft=ref(false);
const canScrollRight=ref(false);

onMounted(() => {
    if (!scrollContainer.value) return;

    const handleScroll=() => {
        canScrollLeft.value=(scrollContainer.value as HTMLElement).scrollLeft>0;

        canScrollRight.value=(scrollContainer.value as HTMLElement).scrollWidth-(scrollContainer.value as HTMLElement).scrollLeft>(scrollContainer.value as HTMLElement).clientWidth;
    };

    // Register a scroll event listener on the scrollContainer
    scrollContainer.value.addEventListener('scroll', handleScroll);

    scrollContainer.value.scrollLeft=0;
    canScrollLeft.value=false;
    canScrollRight.value=true;

    // Call the handler right away to initialize canScrollRight
    handleScroll();
});


// function isOverflown() {
//     const element=document.getElementById(`image-row-${props.rowId}`)
//     console.log(element, element?.scrollWidth, element?.clientWidth)
//     if (element==null) return;

//     return element.scrollWidth>element.clientWidth;
// }

function scroll(direction: 'left'|'right'): void {
    const scrollValue=direction==='left'? -300:300;
    (scrollContainer.value as HTMLElement).scrollBy({ left: scrollValue, behavior: 'smooth' });
}




</script>

<style scoped >
.highlight {
    background: url(//s2.svgbox.net/pen-brushes.svg?ic=brush-1&color=fede00aa);
    margin: -10px -6px;
    background-size: 100% 45px;
    background-repeat: no-repeat;
    padding: -5px -20px;

}

.image-row {
    position: relative;
    width: 100%;
}






.song-container {
    margin-top: 33px;

    padding-right: 60px !important;
    margin-left: 20px;

}

.row-scroll-container {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.row-scroll-content::-webkit-scrollbar {
    width: 0;
    height: 0;
}

.row-scroll-content>div {
    /* replace "div" with whatever selector matches your images */
    scroll-snap-align: center;
}

.row-scroll-content {
    scroll-snap-type: x mandatory;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow-x: scroll;


    overflow-y: hidden;
    white-space: nowrap;

    /* For Webkit browsers */
    ::-webkit-scrollbar {
        display: none;
    }

    -webkit-overflow-scrolling: touch;

    ::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.row-scroll-fade-right,
.row-scroll-fade-left {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 60px;
    pointer-events: none;
    /* start with transparent */
    transition: opacity 100ms linear;
    /* transition the opacity */
}

.row-scroll-fade-right {
    right: 0;
    background: radial-gradient(farthest-side at 100% 50%, #f0f0f0, transparent 90%);
}

.row-scroll-fade-left {
    left: 0;
    background: radial-gradient(farthest-side at 0% 50%, #f0f0f0, transparent 90%);
}




.music-icon {
    width: 40px;
    height: 40px;
    margin-right: 15px;
}

.music-icon img {
    width: 40px;
}



.scroll-arrow {
    position: absolute;
    width: 20px;
    filter: invert();
    padding: 10px;
    border-radius: 20px;
    opacity: .75;
    background-color: #c0c0c0cc;
    height: 20px;

    transition: opacity 100ms linear;
    cursor: pointer;
}

@media (hover: hover) and (pointer: fine) {

    .scroll-arrow:hover {

        transition: opacity 100ms ease-in-out;
        background-color: #b0b0b0;
    }

}


.scroll-arrow-left {

    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100 !important;
}

.scroll-arrow-right {

    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100 !important;
}

.disabled-button {
    opacity: .2;
    transition: opacity 100ms ease-in-out;
    pointer-events: none !important;
}
</style>