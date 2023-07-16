<template>
    <div class="main-content">
        <div class="text-content">
            <div class="title-text">
                <span class="text-highlight-blue-bold" style="font-size: 40px;">Das war's!</span>
            </div>
            <div class="text">
                Danke, dass ihr euch die Zeit genommen hast, meine persönliche Webseite zu besuchen.

                <p>
                    Vielleicht zum Abschluss noch ein wenig zum Technischen: Diese Webseite wurde mit Vite+Vue3 in
                    Typescript
                    realisiert sämtliche Komponenten wurden von mir selbst entworfen & entwickelt. Den Quellcode kannst du
                    gerne
                    auf Github einsehen.
                </p>

                Falls ihr mehr über mich und meine Fähigkeiten, auch im beruflichen Kontext, erfahren möchtest, lade ich
                Euch
                ein, einen Blick auf meinen Lebenslauf zu werfen.

                <button v-on:click="" class="action-button" style="margin-top: 30px;">
                    <img style="margin-right: 12px" src="../assets/icons/arrow-right-solid.svg" width="16" />

                    Lebenslauf öffnen
                </button>
                <button v-on:click="" class="action-button">

                    <img style="margin-right: 12px" src="../assets/icons/github.svg" width="16" />
                    Source Code
                </button>

            </div>


        </div>

        <TLDRCard />
    </div>
</template>

<script lang="ts" setup>
import TLDRCard from '@/components/TLDRCard.vue';



</script>


<style scoped>
.text-content {
    position: relative;
    max-width: 600px;
}


.title-text {
    color: black;
    font-size: 32px;
    padding-left: 10px;
    margin-bottom: 20px;
    margin-left: 10px;
    margin-right: 10px;
    /* transform: rotate(-1deg); */
    text-align: start;
}




.main-content {
    max-width: 100%;
    display: inline-block;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

@media (min-width: 600px) {
    .main-content {
        flex-direction: row;
    }
}
</style>