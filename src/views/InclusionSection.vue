<template>
    <div class="disability-card">

        <div class="content-row">
            <div>
                <iframe width="600" height="350" src="https://www.youtube-nocookie.com/embed/S-S5_oVNvZQ"
                    title="YouTube video player" frameborder="0"
                    style="border-radius: 15px; max-width: calc(100% - 20px)!important; margin: 10px; margin-top: 20px;"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
                <div>

                    <iframe title="Inklusionsgedanken podcast on spotify" v-if="!isMobile" class="embedded-podcast"
                        style="margin: 10px; width: calc(100% - 20px)"
                        src="https://open.spotify.com/embed/episode/37APGyNAhgVwrTJZFxY56s?utm_source=generator&t=85"
                        width="100%" frameBorder="0" loading="lazy"></iframe>
                    <div v-if="locale==='en'&&!isMobile" class="en-sorry">Sorry, the TEDx-talk and podcast are in German
                    </div>

                </div>
            </div>

            <div class="text-area">
                <h1 style="margin: 20px; line-height: 50px;">

                    I'm weak and what's wrong with that ?

                </h1>

                <div class="text" style="padding-top: 0px!important;">
                    {{t('disability.textSection.paragraph1')}}
                    <div class="inline-handwriting">"Limitations</div>
                    <div class="inline-handwriting"> only</div>
                    <div class="inline-handwriting"> go</div>
                    <div class="inline-handwriting"> so</div>
                    <div class="inline-handwriting"> far"</div>.
                    {{t('disability.textSection.motto')}}

                    <p>
                        {{t('disability.textSection.paragraph2')}}
                    <div class="inline-handwriting">Inklusionsgedanken</div> {{t('disability.textSection.podcast')}}

                    </p>
                    <iframe title="Inklusionsgedanken podcast on spotify" v-if="isMobile" class="embedded-podcast"
                        src="https://open.spotify.com/embed/episode/37APGyNAhgVwrTJZFxY56s?utm_source=generator&t=85"
                        width="100%" frameBorder="0" loading="lazy"></iframe>
                    <div v-if="isMobile&&locale==='en'" class="en-sorry">Sorry, the TEDx-talk and podcast are in German
                    </div>

                </div>
            </div>
        </div>

        <ImagesRow style="margin-top: 50px;" :images="[
            { name: './mountains/steffen_mountain_4.webp', type: 0, text: t('disability.imageText.0') },
            // { name: './mountains/steffen_mountain_5.gif', type: 0, text: t('disability.imageText.1') },
            { name: './mountains/steffen_mountain_3.webp', type: 0, text: t('disability.imageText.2') },
            { name: './mountains/steffen_mountain_2.webp', type: 0, text: t('disability.imageText.3') },
            { name: './mountains/steffen_mountain_1.webp', type: 0, text: t('disability.imageText.4') }
        ]" songId="3BuLtAmXKy5uQYl4ED1zBT" rowId="mountains" />


    </div>
</template>


<script lang="ts" setup>
import ImagesRow from '../components/ImagesRow.vue';
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, locale }=useI18n()

const isMobile=computed(() => {
    return window.innerWidth<600
})


</script>


<style scoped>
.content-row {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    margin-top: 30px;
}

@media (min-width: 600px) {
    .content-row {
        flex-direction: row;
    }
}

.disability-card {
    position: relative;
    width: 100%;
    margin: 0 auto;
    margin-top: 0px;
}


.embedded-podcast {
    border-radius: 12px;
    margin-bottom: 12px;
    margin-top: 4px;
    height: 352px
}


@media (min-width: 600px) {
    .embedded-podcast {
        height: 152px
    }
}


.text-area {
    max-width: 600px;
}

@media (min-width: 600px) {
    .text-area {
        margin-left: 30px
    }
}

.en-sorry {
    text-align: center;
    color: #A0A0A0;
    font-size: 14px;
    padding-bottom: 15px;
}
</style>