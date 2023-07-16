<template>
    <div class="festival-card">

        <ImagesRow rowId="festival" songId="1YplKY2G8yN0bWf8rM5Egz"
            :images="[{ name: './festivals/steffen_festival_2.webp', type: 0, text: 'Tempelhof Sounds \'22' }, { name: './festivals/steffen_festival_3.webp', type: 0, text: 'Frequency 2022 ' }, { name: './festivals/steffen_festival_4.webp', type: 0, text: 'Superbloom, München' }, { name: './festivals/steffen_csd.webp', type: 0, text: 'CSD München' }, { name: './festivals/steffen_festival_1.webp', type: 0, text: 'Lolla 2019' }]" />




        <div class="music-text-area">
            <div class="text music-text">

                Musik ist für mich weit mehr als reine Unterhaltung. Sie ist der Spiegel meiner Gefühle und formt den
                <span class="inline-handwriting">Rhythmus </span> <span class="inline-handwriting">meines </span> <span
                    class="inline-handwriting">Lebens </span>. Jeder Song,
                den ich höre, reflektiert auf gewisse
                Weise meine Gedanken. Jedes Konzert, das
                ich
                besuche, schafft eine Verbindung zu Menschen, die diese Leidenschaft teilen.
                <p>
                    So ist Musik in meinem Leben nicht
                    nur ein Hobby, sondern ein stetiger, unersetzbarer Begleiter und gleichzeitig Quelle ständiger
                    <span class="inline-handwriting">Inspiration </span>
                </p>
            </div>
        </div>





    </div>
</template>

<script lang="ts" setup>
import ImagesRow from '../components/ImagesRow.vue';

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