<template>
    <div class="hello-content">

        <div class="personal-image" data-testid="personal-image">
            <img alt="" draggable="false" class="riso-decorative" width="200" src="/risographics/riso_form_6.webp" />
            <PolaroidImage data-testid="personal-image-polaroid" name="./steffen_konstanz.webp"
                :text="t('welcome.thatsMe')" />
        </div>


        <div class="text-content">

            <!-- welcome header with handwritten font -->
            <div class="title-text">

                <span data-testid="welcoming-phrase" class="text-highlight-name-blue"
                    style="font-size: 40px">{{t('welcome.hello')}}<span style="margin-left: 12px;"
                        v-if="name!=null&&name.length>0" class="text-highlight-blue-bold">{{name}} </span>,
                    {{t('welcome.iam')}}
                    Steffen!</span>
            </div>

            <!-- about me description -->
            <div class="text" data-testid="description-text">

                <p>
                    {{t('welcome.introduction')}}
                </p>

                <div>{{t('welcome.websitePurpose1')}}<br />{{t('welcome.websitePurpose2')}} <div class="inline-handwriting">
                        {{t('welcome.human')}}</div>
                    {{t('welcome.websitePurpose3')}}
                </div>

            </div>
            <div class="welcome-music-container" data-testid="welcome-music-container">
                <iframe title="portfolio theme music" style="height: 80px;"
                    :src="`https://open.spotify.com/embed/track/${t('welcome.welcomeMusicId')}?utm_source=generator&theme=1`">
                </iframe>
            </div>
        </div>


    </div>
</template>

<script lang="ts" setup>


import PolaroidImage from '../components/PolaroidImage.vue';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n'
const { t }=useI18n()
const name=ref<string|null>(null)

onMounted(() => {
    const urlParams=new URLSearchParams(window.location.search);
    name.value=urlParams.get('name');

    if (import.meta.env.VITE_TARGET_NAME!=null) {
        name.value=import.meta.env.VITE_TARGET_NAME
    }
})
</script>

<style scoped>
.hello-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 30px;

}

@media (min-width: 800px) {
    .hello-content {
        flex-direction: row;
        min-height: calc(100vh - 150px);
    }
}


.title-text {
    color: black;
    font-size: 20px !important;
    line-height: 55px;
    text-align: start;
    margin-left: 10px;
    margin-right: 10px;
}

.text-content {

    position: relative;


}

@media (min-width: 800px) {
    .text-content {
        margin-left: 60px;
    }
}


.text-highlight-name-blue {
    font-size: 50px;
    display: inline-block;
    max-height: 27px;
    font-family: 'biro_script_standardregular';
    color: #000F55;
    margin-left: 10px;
}



.welcome-music-container {

    margin-left: 20px;
    margin-right: 20px;
    margin-top: 30px;
    margin-bottom: 30px;


}


@media (min-width: 800px) {
    .welcome-music-container {

        padding-bottom: 0px;
    }
}

.welcome-music-container iframe {
    border-radius: 12px;
    width: 100%;
    height: 102px;
    border: none;
}

.riso-decorative {
    position: absolute;
    top: -50px;
    left: -70px;
    z-index: -1;
}

.personal-image {
    transform: scale(1.1);
    transform-origin: 50% 50%;

    position: relative;
}
</style>
