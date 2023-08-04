<template>
    <div class="festival-card">

        <ImagesRow rowId="festival" :songId="t('musicLove.songId')"
            :images="[{ name: './festivals/steffen_festival_2.webp', type: 0, text: 'Tempelhof Sounds \'22' }, { name: './festivals/steffen_festival_3.webp', type: 0, text: 'Frequency 2022 ' }, { name: './festivals/steffen_festival_4.webp', type: 0, text: 'Superbloom, München' }, { name: './festivals/steffen_csd.webp', type: 0, text: 'CSD München' }]" />

        <div class="music-text-area">
            <div class="text music-text">
                {{t('musicLove.musicForMe')}}
                <span class="inline-handwriting">{{t('musicLove.rhythm')}} </span>

                {{t('musicLove.everySongReflects')}}
                <p>
                    {{t('musicLove.musicInMyLife')}}
                    <span class="inline-handwriting">{{t('musicLove.inspiration')}} </span>
                    {{t('musicLove.myFavorites')}}
                </p>
            </div>

            <!-- <div v-show="!isMobile" class="text-highlight-blue lyrics">

                <div>"... trotzdem tanzen als ob keiner gucken</div>
                <div>Lachen als wenn es jeder liebt</div>
                <div> Singen ohne Texte kennen </div>
                <div> & feiern als ob es kein Ende gibt "</div>
            </div> -->
        </div>





    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import ImagesRow from '../components/ImagesRow.vue';
import { useI18n } from 'vue-i18n'
const { t }=useI18n()


const isMobile=computed(() => {
    return window.innerWidth<1000
})
</script>

<style scoped>
.festival-card {
    position: relative;
    width: 100%;
    padding-bottom: 30px;

}

.music-text-area {
    display: flex;
    justify-content: space-evenly;
}

.lyrics {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 30px;
}
</style>