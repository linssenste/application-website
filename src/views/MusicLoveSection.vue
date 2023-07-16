<template>
    <div class="festival-card">

        <ImagesRow rowId="festival" :songId="t('musicLove.songId')"
            :images="[{ name: './festivals/steffen_festival_2.webp', type: 0, text: 'Tempelhof Sounds \'22' }, { name: './festivals/steffen_festival_3.webp', type: 0, text: 'Frequency 2022 ' }, { name: './festivals/steffen_festival_4.webp', type: 0, text: 'Superbloom, München' }, { name: './festivals/steffen_csd.webp', type: 0, text: 'CSD München' }, { name: './festivals/steffen_festival_1.webp', type: 0, text: 'Lolla 2019' }]" />

        <div class="music-text-area">
            <div class="text music-text">
                {{t('musicLove.musicForMe')}}
                <span class="inline-handwriting">{{t('musicLove.rhythm')}} </span>
                <span class="inline-handwriting">{{t('musicLove.my')}} </span>
                <span class="inline-handwriting">{{t('musicLove.life')}} </span>.
                {{t('musicLove.everySongReflects')}}
                <p>
                    {{t('musicLove.musicInMyLife')}}
                    <span class="inline-handwriting">{{t('musicLove.inspiration')}} </span>
                </p>
            </div>
        </div>





    </div>
</template>

<script lang="ts" setup>
import ImagesRow from '../components/ImagesRow.vue';
import { useI18n } from 'vue-i18n'
const { t }=useI18n()
</script>

<style scoped>
.festival-card {
    position: relative;
    width: 100%;
    padding-bottom: 30px;
    margin-top: -200px;
}

.music-text-area {
    display: flex;
    justify-content: center;
}
</style>