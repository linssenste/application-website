<template>
    <div>

        <ImagesRow rowId="polaroid-bugs" class="images-row" :images="[
            { name: '/polaroid_art/polaroid_art_1.webp', type: 0, text: '#67' },
            { name: '/polaroid_art/polaroid_art_5.webp', type: 0, text: '#31' },
            { name: '/polaroid_art/polaroid_art_2.webp', type: 0, text: '#3' },
            { name: '/polaroid_art/polaroid_art_4.webp', type: 0, text: '#14' }
        ]" />

        <div
            style=" font-size: 16px; color: #505050; margin-top: -10px; margin-bottom: 20px; margin: 0 auto; display: flex; flex-direction: row; align-items: start; justify-content: center;">
            <span style="margin-top: 0px; margin-right: 4px;" class="text-highlight-blue">*</span>
            {{t('creativity.disclaimer')}}
        </div>

    </div>
</template>

<script lang="ts" setup>
import ImagesRow from '../components/ImagesRow.vue';
import { useI18n } from 'vue-i18n'
const { t }=useI18n()
</script>

<style scoped>
.images-row {
    max-width: 100%;
}
</style>
