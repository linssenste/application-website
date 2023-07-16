<template>
    <div class="row-scroll-container">
        <ImagesRow rowId="polaroid-bugs" class="images-row" :images="[
            { name: 'polaroid_art/polaroid_art_1.webp', type: 0, text: '#67' },
            { name: 'polaroid_art/polaroid_art_5.webp', type: 0, text: '#31' },
            { name: 'polaroid_art/polaroid_art_2.webp', type: 0, text: '#3' },
            { name: 'polaroid_art/polaroid_art_3.webp', type: 0, text: '#42' },
            { name: 'polaroid_art/polaroid_art_4.webp', type: 0, text: '#14' }
        ]" />

        <div class="content-wrapper">

            <div class="text-wrapper text">
                <div class="text-header">
                    <h1>Polaroid-Projekt
                    </h1>
                    <!-- Place this tag where you want the button to render. -->
                    <github-button style="margin-top: 20px;" href="https://github.com/linssenste/instax-link-web"
                        data-size="large" data-show-count="true"
                        aria-label="Star linssenste/instax-link-web on GitHub">Github</github-button>
                </div>
                <div class="">
                    Auch in meiner Freizeit entfalte ich gerne meine Kreativität als Entwickler. Ein Beispiel dafür ist eine
                    <div class="inline-handwriting">Open-Source</div>
                    Webanwendung, die das direkte Drucken von Fotos aus Google Chrome auf Instax Polaroid-Druckern
                    ermöglicht - ganz ohne zusätzliche App.


                </div>

                <p>
                    Für dieses Projekt habe ich das Bluetooth-Protokoll der Drucker
                    reverse engineered und daraufaufbauen
                    eine
                    intuitiv bedienbare Anwendung entwickelt. Einige Drucke aus der Entwicklungsphase sind in der oben
                    dargestellten Bildreihe zu sehen.

                </p>



                <a href="https://polaroid.linssenste.com" target="_blank">
                    <button class="action-button" style="margin-top: 30px;">
                        <img style="margin-right: 12px" src="@/assets/icons/arrow-up-right-from-square-solid.svg"
                            width="16" />

                        Anwendung öffnen
                    </button>
                </a>

            </div>

            <div class="image-wrapper">
                <img draggable="false" style="position: absolute; top: -70px; left: -70px; z-index: -1;" width="200"
                    src="@/assets/risographics/riso_form_6.webp" alt="" />



                <img draggable="false" class="main-image" src="polaroid_art/polaroid_app_print.webp"
                    alt="Web-App und resultierendes Polaroid" />


                <div class="image-caption">
                    Web-Anwendung & das resultierendes Polaroid
                    <!-- <a href="https://polaroid.linssenste.com" target="_blank">
                        <button class="action-button">
                            <img src="../assets/icons/arrow-up-right-from-square-solid.svg" width="16"
                                alt="Open in new tab" />
                        </button>
                    </a> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import ImagesRow from '@/components/ImagesRow.vue';
import GithubButton from 'vue-github-button'
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
