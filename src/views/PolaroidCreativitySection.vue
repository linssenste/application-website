<template>
    <div>

        <ImagesRow rowId="polaroid-bugs" class="images-row" :images="[
            { name: '/polaroid_art/polaroid_art_1.webp', type: 0, text: '#67' },
            { name: '/polaroid_art/polaroid_art_5.webp', type: 0, text: '#31' },
            { name: '/polaroid_art/polaroid_art_2.webp', type: 0, text: '#3' },
            { name: '/polaroid_art/polaroid_art_4.webp', type: 0, text: '#14' }
        ]" />

        <!-- <div class="content-wrapper">

            <div class="text-wrapper text">
                <div class="text-header">
                    <h1>{{t('creativity.polaroidProject')}}</h1>
                    <github-button style="margin-top: 20px;" href="https://github.com/linssenste/instax-link-web"
                        data-size="large" data-show-count="true"
                        aria-label="Star linssenste/instax-link-web on GitHub">Github</github-button>
                </div>
                <div class="">
                    {{t('creativity.openSourceWebappDesc')}}
                    <div class="inline-handwriting">{{t('creativity.openSource')}}</div>
                    {{t('creativity.printerProtocol')}}
                </div>

                <p>
                    {{t('creativity.reverseEngineered')}}
                </p>

                <a href="https://polaroid.linssenste.com" target="_blank">
                    <button class="action-button" style="margin-top: 30px;">
                        <img style="margin-right: 12px" src="@/assets/icons/arrow-up-right-from-square-solid.svg"
                            width="16" />
                        {{t('creativity.openApp')}}
                    </button>
                </a>
            </div>


            <div class="image-wrapper">
                <img draggable="false" style="position: absolute; top: -70px; left: -70px; z-index: -1;" width="200"
                    src="@/assets/risographics/riso_form_6.webp" alt="" />



                <img draggable="false" class="main-image" src="/polaroid_art/polaroid_app_print.webp"
                    alt="Web-App und resultierendes Polaroid" />


                <div class="image-caption">
                    {{t('creativity.imageAlt')}}
                </div>
            </div>
        </div> -->
    </div>
</template>

<script lang="ts" setup>
import ImagesRow from '../components/ImagesRow.vue';
import GithubButton from 'vue-github-button';
import { useI18n } from 'vue-i18n'
const { t }=useI18n()
</script>

<style scoped>
.row-scroll-container {
    position: relative;
    width: 100%;
    margin-top: 50px;
    margin-bottom: 75px;
}

.images-row {
    max-width: 100%;
}

.content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: start;
}



@media (min-width: 600px) {
    .content-wrapper {
        flex-direction: row;
    }
}

.text-wrapper {
    margin-top: 30px;
}

@media (min-width: 600px) {
    .text-wrapper {
        margin-right: 60px;
    }
}

.text-header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    font-size: 40px;
    margin-bottom: 20px
}

@media (min-width: 600px) {
    .text-header {
        flex-direction: row;
    }
}

.text-content {
    margin-right: 5px;
}

.image-wrapper {
    display: flex;
    max-width: 400px;
    margin: 10px;
    margin-top: 30px;
    position: relative;
    flex-direction: column;
}

.main-image {
    border-radius: 10px;
    width: 100%;
    min-width: 330px;
    margin-top: 20px;
    height: auto;
    max-width: 400px;
}

.image-caption {
    display: flex;
    color: #808080;
    font-weight: 300;
    font-size: 15px;
    margin-top: 5px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
</style>
