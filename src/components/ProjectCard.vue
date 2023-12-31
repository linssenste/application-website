<template>
    <div class="card-area">



        <div v-on:click="cardClickedEvent" class="project-card" :style="focused? '':'cursor: pointer'">

            <div class="portfolio-logo">
                <img v-if="data.logo!=null" :alt="`Project logo of ${data.name}`" draggable="false"
                    style="border: none; max-width: 260px; " :src="data.logo" />
                <div class="text-highlight-blue" style="font-size: 32px;  text-align: end; width: 100%;">
                    <span v-if="!isMobile">Portfolio</span> #{{index}}
                </div>
            </div>
            <div class="card-oneliner">
                <span class="key-name">{{t('projects.name')}}:</span>
                <div class="text-highlight-blue key-value" style="padding-left: 18px">
                    {{data.name||'/'}}</div>
            </div>

            <div class="card-oneliner">
                <span class="key-name">{{t('projects.type')}}:</span>
                <div class="text-highlight-blue key-value" style="padding-left: 2px">
                    {{data.projectType||'/'}}</div>
            </div>

            <div class="card-oneliner">
                <span class="key-name">{{t('projects.company')}}:</span>
                <div class="text-highlight-blue key-value" style="padding-left: 12px">
                    {{data.company||'/'}}</div>
            </div>



            <div class="card-multiline">
                <span class="key-name ">{{t('projects.description')}}:</span>
            </div>


            <div class="multiline-text">


                {{data.description}}
            </div>


            <div v-if="data.github!=null" style="padding-top: 20px;">
                <github-button data-testid="github-link" v-if="data.github!=null" :href="`https://github.com${data.github}`"
                    data-size="large" data-show-count="true" aria-label="View on GitHub">View on Github</github-button>
            </div>


            <div v-if="data.website!=null" class="card-multiline" style="padding-bottom: 5px; ">
                <span class="key-name ">{{t('projects.website')}}:</span>
            </div>
            <div v-if="data.website!=null" class="multiline-text">


                <a data-testid="website-link" :href="data.website" target="_blank"> {{data.website}}</a>
            </div>


            <div class="card-multiline" style="padding-bottom: 5px;">
                <span class="key-name ">{{t('projects.stack')}}:</span>
            </div>


            <div class="chip-area">

                <div v-for="chip in data.stack" class="chip">{{chip}}</div>

            </div>

            <div class="card-multiline"
                style="padding-bottom: 10px; padding-top: 0px; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                <span class="key-name ">{{t('projects.screenshots')}}:</span>

            </div>


            <carousel v-on:slide-end="refIndex=$event.currentSlideIndex" :wrapAround="true" :items-to-show="1">
                <slide v-for="(el, index) in data.images" :key="index">
                    <!-- {{slide}} -->
                    <div class="carousel-item">
                        <img v-if="el.type===0" :alt="el.descr" :src="el.src" />

                        <video v-else-if="el.type===1" :alt="el.descr" loop muted width="100%" controls>
                            <source :src="el.src" type="video/webm">
                            <source :src="el.fallback" type="video/mp4">
                        </video>
                        <embed v-else-if="el.type===2" :alt="el.descr" width="100%" :src="`${el.src}#view=FitH`">

                    </div>


                </slide>

                <template #addons>
                    <navigation />

                    <pagination />

                </template>
            </carousel>

            <div class="carousel-description">{{
                data.images[refIndex].descr}} </div>



            <div v-if="focused&&index!=1" v-on:click="switchEvent(-1)" class="switch-button left-button">
                <img alt="button to go left" src="../assets/icons/chevron-left-solid.svg" />
            </div>

            <div v-if="focused&&index!=4" v-on:click="switchEvent(1)" class="switch-button right-button">
                <img alt="button to go right" src="../assets/icons/chevron-right-solid.svg" />

            </div>



        </div>

    </div>
</template>

<script lang="ts" setup>
import 'vue3-carousel/dist/carousel.css'
import GithubButton from 'vue-github-button';

import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t }=useI18n()

const refIndex=ref(0);
const emit=defineEmits(['selected']);

interface PortfolioItem {
    type: number,
    src: string,
    fallback?: string
    descr: string
}

const props=defineProps<{
    index: number,
    total: number,
    focused: boolean,
    data: {
        website?: string,
        github?: string,
        logo: string,
        name: string,
        projectType: string,
        company: string,
        description: string,
        stack: string[],
        images: PortfolioItem[]
    }
}>()

function switchEvent(factor: number) {
    emit('selected', (props.index+factor-1))
}
const isMobile=computed(() => {
    return window.innerWidth<800
})

function cardClickedEvent() {
    if (!props.focused) emit('selected')
}
props.data;
props.focused;
props.index
</script>

<style scoped>
.portfolio-logo {
    display: flex;
    padding-bottom: 20px;
    padding-top: 0px;
    position: relative;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
}

.card-area {
    position: relative;
    width: calc(100% - 20px);
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.carousel-description {
    font-size: 15px !important;
    padding-top: 10px;
    white-space: normal;
    padding-bottom: 15px;
    color: #505050CC;
    line-height: 23px;
}

.carousel-item {
    border-radius: 6px;
    margin-right: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    /* aspect-ratio: 16/8.85; */
    position: relative;
}

.carousel-item embed {
    width: 100%;
    border-radius: 6px !important;
    /* border: 1px solid #c0c0c0aa; */
    height: 100% !important;
}

.carousel-item video {
    width: 100%;
    height: 100%;
    border-radius: 6px !important;
    /* border: 1px solid #c0c0c0aa; */

}

.carousel-item img {
    width: 100%;
    border-radius: 6px !important;
    /* border: 1px solid #c0c0c0aa; */

}

.card-multiline {
    /* padding: 15px; */
    padding-bottom: 10px;
    padding-top: 30px !important;
}



.multiline-text {
    font-size: 17px;
    max-width: 100%;
    line-height: 25px;
    white-space: normal;
    text-align: justify;
    padding-bottom: 0px;
    color: #303030;
    width: 100%
}

.card-oneliner {
    position: relative;

    padding-bottom: 5px;
    padding-top: 5px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.project-card {
    position: relative;

    user-select: none;
    background-color: red;
    min-height: 100%;

    z-index: 1000;
    width: 750px;
    padding-top: 0px;
    padding: 30px;
    margin: 10px !important;
    max-width: calc(100% - 40px - 20px);
    padding-bottom: 5px;
    border-radius: 12px !important;
    background-color: #FFFFFFDD;
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);

    box-shadow: 0px 0px 10px 0px #00000020;
}

@media screen and (max-width: 800px) {
    .project-card {
        padding-top: 80px;
    }


}

.key-name {
    font-weight: 500;
    color: #303030 !important;
    margin-right: 6px;
    font-size: 16px;
    margin-top: 15px;
    letter-spacing: .5px;
    width: 125px;
    text-transform: uppercase;
}

.key-value {
    font-size: 33px;
    border-bottom: 1.5px solid #505050CC;
    padding-bottom: 15px;
    padding-left: 2px;
    flex: 1;
    width: 300px;
}

.chip-area {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    /* padding-bottom: 10px; */
    padding-top: 5px;

}

.chip {
    width: fit-content;
    cursor: default;
    background-color: #F0F0F0AA;
    border: 1px solid #C0C0C0AA;
    padding: 6px;
    padding-top: 7px;
    user-select: all;
    -moz-user-select: all;
    -webkit-user-select: all;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 5px;
    font-weight: 400;
    font-size: 14px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 6px;
    color: #505050;
}

.close-fullscreen-button {
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 1000;
}

.switch-button {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: #F0F0F0CC;
    cursor: pointer;
    position: relative;
}

.switch-button img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    transform: translate(-50%, -50%);
}

.switch-button:hover {
    background-color: #F0F0F0FF;
    transition: all 150ms ease-in-out;
}

.left-button {
    position: absolute;
    top: 50%;
    left: -60px;

}

@media screen and (max-width: 800px) {
    .left-button {
        position: absolute !important;
        top: 15px !important;
        z-index: 1000;
        left: 15px;
    }
}

.right-button {
    position: absolute;
    top: 50%;
    right: -60px;

}


@media screen and (max-width: 800px) {
    .right-button {
        position: absolute !important;
        top: 15px !important;
        z-index: 1000;
        right: 15px
    }
}
</style>