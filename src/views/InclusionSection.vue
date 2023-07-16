<template>
    <div class="disability-card">



        <ImagesRow
            :images="[{ name: 'mountains/steffen_mountain_4.webp', type: 0, text: 'Meine erste Bergtour' }, { name: 'mountains/steffen_mountain_5.gif', type: 0, text: 'test' }, { name: 'mountains/steffen_mountain_3.webp', type: 0, text: 'Silvester am Herzogstand' }, { name: 'mountains/steffen_mountain_2.webp', type: 0, text: 'Wallberg' }, { name: 'mountains/steffen_mountain_1.webp', type: 0, text: 'Smrekovcu, Slovenia' }]"
            songId="3BuLtAmXKy5uQYl4ED1zBT" rowId="mountains" />

        <div class="content-row">
            <div>
                <iframe width="600" height="350" src="https://www.youtube-nocookie.com/embed/S-S5_oVNvZQ"
                    title="YouTube video player" frameborder="0"
                    style="border-radius: 15px; max-width: calc(100% - 20px)!important; margin: 10px; margin-top: 20px;"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
                <div>

                    <iframe v-if="!isMobile" class="embedded-podcast" style="margin: 10px; width: calc(100% - 20px)"
                        src="https://open.spotify.com/embed/episode/37APGyNAhgVwrTJZFxY56s?utm_source=generator&t=85"
                        width="100%" frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"></iframe>


                </div>
            </div>

            <div class="text-area">
                <h1 style="margin: 20px; line-height: 50px;">

                    I'm weak and what's wrong with that ?

                </h1>

                <div class="text" style="padding-top: 0px!important;">
                    Mit 16 Jahren wurde die chronische Muskelkrankheit Myasthenia Gravis Teil meines Lebens.
                    Trotz der
                    benötigten Hilfsmittel habe ich gelernt, meine Träume zu verwirklichen, und mich nicht einschränken
                    zu
                    lassen von der Behinderung - inspiriert von meinem
                    Lebensmotto: <div class="inline-handwriting">"Limitations</div>
                    <div class="inline-handwriting"> only</div>
                    <div class="inline-handwriting"> go</div>
                    <div class="inline-handwriting"> so</div>
                    <div class="inline-handwriting"> far"</div>. Dieser Leitsatz treibt mich dazu an, auch Hobbys wie das
                    Bergsteigen zu verfolgen, trotz der Herausforderungen, die meine Krankheit mit sich bringt.

                    <p>
                        Meine Behinderung hat mir auch die Augen für die Inklusionsprobleme unserer Gesellschaft geöffnet.
                        Um
                        hier
                        Veränderungen anzustoßen, engagiere ich mich aktiv für dieses Thema, habe einen TEDx-Vortrag
                        gehalten
                        und zusammen mit der Caritas den Podcast
                    <div class="inline-handwriting">"Inklusionsgedanken" </div> ins Leben gerufen. Hier beleuchten
                    wir
                    das
                    Thema Inklusion aus verschiedenen Perspektiven.
                    </p>


                    <iframe v-if="isMobile" class="embedded-podcast"
                        src="https://open.spotify.com/embed/episode/37APGyNAhgVwrTJZFxY56s?utm_source=generator&t=85"
                        width="100%" frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"></iframe>
                </div>
            </div>
        </div>


    </div>
</template>


<script lang="ts" setup>
import ImagesRow from '@/components/ImagesRow.vue';
import { computed } from 'vue'
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
    margin-top: -100px;
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
</style>