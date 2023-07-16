<template>
    <div class="hello-content">

        <div style="transform: scale(1.1); transform-origin: 50% 50%;; position: relative;">
            <img draggable="false" style="position: absolute; top: -50px; left: -70px; z-index: -1;" width="200"
                src="@/assets/risographics/riso_form_6.webp" alt="" />
            <PolaroidImage name="./steffen_konstanz.webp" text="Das bin ich" />
        </div>

        <div class="text-content">

            <!-- welcome header with handwritten font -->
            <div class="title-text">
                <!-- <span>Hallo <span class="text-highlight-blue-bold">WHOEVER</span>, ich bin</span> -->
                <span class="text-highlight-name-blue" style="font-size: 40px">Hallo<span style="margin-left: 12px;"
                        v-if="name!=null&&name.length>0" class="text-highlight-blue-bold">{{name}} </span>,
                    ich
                    bin
                    Steffen!</span>
            </div>

            <!-- about me description -->
            <div class="text">

                <p>
                <div>Ich bin ein
                    Frontend-Entwickler mit 6 Jahren
                    Erfahrung und
                    einem Faible für ansprechende UI & UX.
                    Außerdem bin ich stolzer Hundepapa und ein absoluter Musikliebhaber.
                </div>
                </p>

                <div>Diese Website habe ich entwickelt, um sowohl mein technisches Wissen & Kreativität zu präsentieren als
                    auch einen
                    persönlichen Einblick in mein Leben zu geben. Im Vordergrund stehen nicht meine beruflichen Leistungen,
                    sondern ich als <div class="inline-handwriting">Mensch</div>. Ich möchte euch in meine Welt entführen,
                    meine Leidenschaft für Musik
                    mit euch teilen und offen über meine Behinderung sprechen.
                </div>

            </div>
            <div class="welcome-music-container">
                <iframe style="height: 80px; background-color: #C80018;"
                    src="https://open.spotify.com/embed/track/254AnlO6Fr8ge2hH0nywp7?utm_source=generator&theme=1"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
                </iframe>
            </div>
        </div>
        <!-- 
        <div class="menu-selector">Musik</div>
        <div class="menu-selector">Inklusion</div> -->

    </div>
</template>

<script lang="ts" setup>
import PolaroidImage from '../components/PolaroidImage.vue';
import { onMounted, ref } from 'vue';

const name=ref<string|null>(null)
onMounted(() => {
    const urlParams=new URLSearchParams(window.location.search);
    name.value=urlParams.get('name');
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

@media (min-width: 600px) {
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

@media (min-width: 600px) {
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


@media (min-width: 600px) {
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
</style>
