<template>
    <div class="cover-card">

        <div class="fav-text">
            <img draggable="false" width="60" style="margin-bottom: 10px; transform: rotate(-2deg); margin-right: 8px;"
                src="../assets/icons/heart.webp" />
            <h1 class="fav-text">
                Meine Lieblingssongs:
            </h1>
        </div>

        <div class="cover-area">
            <div class="photobanner">
                <div id="cover-container">

                    <img draggable="false" class="cover" v-for="i in shuffledIndices" :src="`/covers/${i+1}.webp`"
                        v-on:click="selectFavoriteSong(i+1)" />

                </div>
            </div>
        </div>


        <div class="fav-song" :class="{ 'fav-song-mobile': isMobile }">
            <iframe v-if="songId" class="fav-player" :key="songId"
                :src="`https://open.spotify.com/embed/track/${songId}?utm_source=generator&theme=0`" max-width="600"
                width="100%" :height="isMobile? 352:152" frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

            <div v-else class="song-placeholder">



                <div class="fav-subtext">Klicke auf ein Cover oder shuffle
                </div>
            </div>
            <div v-on:click="randomSong()" class="shuffle-button">
                <img src="../assets/icons/shuffle-solid.svg" width="17" />
                <div>SHUFFLE</div>
            </div>
        </div>

        <div v-if="!isMobile" style="max-width: 750px; margin: 0 auto; margin-top:50px; text-align: center;">
            <span
                style="font-size: 38px; font-family: 'biro_script_standardsloppy'; color: #000F55; line-height: 45px">"Music
                is the divine way to tell beautiful, poetic things to the heart."</span>

            <div style="color: #A0A0A0; margin-top: 20px;"> - Pablo Casals</div>
        </div>




    </div>
</template>


<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'



const songId=ref<null|string>(null)

const favoriteSongsList: Record<number, string>={
    1: '3x4I4nRuZp5NdtGvCPw6Ms',
    2: '5aOAuKoVtxk5qj0rSD75Gu',
    3: '2cGJrMY1TxKn66h6d76wc0',
    4: '45ullNbpOK2rpFB9cbAKi9',
    5: '6xaYLLfvVYxAcUu2xMMVOT',
    6: '7nrjWF8qnqT59lIFLLh1Di',
    7: '3pJlJBxitGP7Btt5veLnDd',
    8: '2YtSRsWYbmXibPDiyfg47K',
    9: '2TdDRjNiF1HuRvnclprnce',
    10: '2PGA1AsJal6cyMNmKyE56q',
    11: '1XfyzTI7FvG8kAVBSFlf60',
    12: '3zg0RVk6GcXFvJG6BWVFre',
    13: '1G8c9Fc37NRdqD2vOkAQk1',
    14: '6ezZTpRzpz97Ke3tCS6zpH',
    15: '13Fo5bvBmmDDaMGtLlAqB5',
    16: '1K29Kg3INLK0gX2nDzblw5',
    17: '4OH61pwCVqF8pzjXM50Saj',
    18: '4lejmZ2vgWRqRfURm25LNp',
    19: '2FK03KdYSIJGy4iXpKzdkS',
    20: '1Qq7D3SfXxg64g6nmbNAfU',
    21: '7JpOx2VVD5UZSD6K0bwgk1',
    22: '38kC2MFInAmxJ1GpNsDwUF',
    23: '5VlLXBGg4hwSYha7iUhUTB',
    24: '21ownMQ51Jqlv8si9CTI6R',
    25: '254AnlO6Fr8ge2hH0nywp7',
    26: '4mFcJNX2bDJoMr4BDBoXRd',
    27: '4J2s7nWDdA7i92sojYX8RJ',
    28: '0WtDGnWL2KrMCk0mI1Gpwz',
    29: '6oHDvarQSp0mf5AD1SyNH0',
    30: '1EbdQ54jFLGEH94cUif3TI',
    31: '4gh92MOGkhnJoYVztbruGX',
    32: '6YZMvvQUqeDDoBks0att2p',
    33: '5hqxBvQJ3XJDSbxT9vyyqA',
    34: '60jQoHwEzJByhXP8bl9A86',
    35: '4GBZ441sYKCc1vbZUi05vp',
    36: '3LyldIrLlF44oVJZGykqUu',
    37: '3rahbqSvvYHaz6TdwPft6M',
    38: '0bg4DFk9Vry0VAfjQRk2Bq',
    39: '3myv2NeAU38pe1FKOoEDEq',
    40: '4GnMTpqR1LVDdE18XWZ2lR',
    41: '153EN3KLSNnm7chVHUgklc',
    42: '4IBK0s9QPphO37DPcYhsAO',
    43: '3uCAZ7WcpYCeEqBXqfi8Uu',
    44: '6YfX7FGOtQufYdeWw9aWfG',
    45: '64Iu1YYGfIkMQWnf0LJHMD',
    46: '6jDBtBoLWCQB44Kwerdku1',
    47: '4wEDActEN5ZyJi0DK8bCtf',
    48: '2zpWbs6fq02ZMucEuBclwM',
    49: '5ZAyNbEdh9JBgXRCOWIPLK',
    50: '3FMA3lHztKK6L2g9oaKmfR',
    51: '6XuplOlrHP00OZHsgGwKrc',
    52: '0JqThwQsfEB7ifoqPPHtcm',
    53: '0fHZirprNSLEc1OLs1OiwL',
    54: '6lFE3aWWixcBaZsnAS84I1',
    55: '0cLe1yq9COZkE2ixOocSNU',
    56: '0DrVnGIRPrA2oEYmClbFgZ',
    57: '6UelLqGlWMcVH1E5c4H7lY',
    58: '1QV6tiMFM6fSOKOGLMHYYg',
    59: '4cpgfehZebzkNDgwacvumb',
    60: '3dQ3jBVbDvQ8mi6yWkKTME',
    61: '6crBy2sODw2HS53xquM6us',
    62: '5oaBqJf0ZsJWaPuhUOOBCZ',
    63: '7zkFI0VrVVW82r2nQkaIKk',
    64: '4lZ7OpzFPYJIWVgfuWU0zv',
    65: '1hhhJKOi5amv2eKGNbSgrn',
    66: '0Rnp3YXS9rROU7x6XW9hbF',
    67: '7oQepKHmXDaPC3rgeLRvQu',
    68: '37M2lFzqAuOD8xoROGCavL',
    69: '6HUmYTZaXZt6SXv6hzH8Db',
    70: '0HAlvNpyu0bBNl18AFq27s',
    71: '0dEcedP3LmK78T4mFj8muw',
    72: '5Cls00KnBm6s7FiNkCn12h',
    73: '2WRTnY0slmFgWcrmEr8dPj',
    74: '2xLMifQCjDGFmkHkpNLD9h',
    75: '1sr9lbDDGIxmFK7wUdA1Z8',
    76: '5rZRM3Lf4eGsMpCDcOJ87C',
    77: '4mjwuLRPVbyYSPgNZO7cVI',
    78: '06WLdOCFfgTMJNV7JZGefX',
    79: '6AtWxelRp0stEVKvqyJSxk',
    80: '0tmLuKzUN3ibePth7C3vX8',
    81: '1d0LKskvREPlQfBanvabh8',
    82: '4VY7aTxsMypdajrZULZFtg',
    83: '3xNy465FPVZIlvwHf0sMol',
    84: '7AyE8MRf4dIK75mqqpks9S',
    85: '6Hu2qQEO8iymos64xx698e',
    86: '3OdHIdk90XI12jLS3DiHdX',
    87: '6gZEyiqUvEpWpJYz7QjLjx',
    88: '0gsXBDy0CT4bti4LmqVsT3',
    89: '4HaD0AISPni1Y9WrBf2Avq',
    90: '5lUODTfLFX22VI2JUK5eDo',
    91: '1YZGtX8kM8y03KVI5MQkhd',
    92: '7neLRiDEffSr5kl0wYU7Xw',
    93: '6YrwMCFXgFio2GBwUTQLp1',
    94: '2pLEX7AoWXsYTyTLUacveR'
}

const shuffledIndices=computed(() => {
    const indices=Array.from(Array(Object.keys(favoriteSongsList).length).keys()); // Create an array of indices from 0 to imageCount-1
    return shuffleArray(indices);
})

const isMobile=computed(() => {
    return window.innerWidth<400
})


onMounted(() => {


    // reset cover scroll on mounted
    const doc=document.getElementById('horizontal-scroll')
    if (doc) doc.scrollLeft=0

})


function selectFavoriteSong(id: number): void {
    songId.value=null;

    if (favoriteSongsList[id]&&songId.value!=favoriteSongsList[id]) songId.value=favoriteSongsList[id]
    else songId.value=null;
}


function randomSong(): void {
    songId.value=favoriteSongsList[Math.floor(Math.random()*Object.keys(favoriteSongsList).length)+1]
}
function shuffleArray(array: number[]) {
    let currentIndex=array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex!==0) {
        // Pick a remaining element...
        randomIndex=Math.floor(Math.random()*currentIndex);
        currentIndex-=1;

        // And swap it with the current element.
        temporaryValue=array[currentIndex];
        array[currentIndex]=array[randomIndex];
        array[randomIndex]=temporaryValue;
    }

    return array;
}

</script>

<style scoped>
.highlight {
    background: url(//s2.svgbox.net/pen-brushes.svg?ic=brush-1&color=fede00);
    background-size: 100% 55px;
    background-position: right 9px;
    background-repeat: no-repeat;
    font-family: 'biro_script_standardbold';

}

.cover-card {
    width: 100%;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    position: relative;
}

.fav-player {
    border-radius: 12px;
    max-width: 600px !important;
    transition: all 1s linear;
}


.fav-subtext {
    width: 100%;
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
    position: absolute;
    top: 50%;
    padding-bottom: 40px;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: .5;
    color: #FFFFFFAA;
    letter-spacing: .5px;
}

.fav-text {

    margin-top: 10px;
    margin-bottom: 10px;

}

.cover {
    transform: scale(.96);
}

.cover:hover {
    transform: scale(1);
}

.fav-song {
    /* This section calls the slideInFromLeft animation we defined above */


    position: relative;

    max-width: 600px;
    height: 222px;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 30px;

    width: calc(100% - 20px);
    background-color: #282828;
    border-radius: 10px;
}


.fav-song-mobile {
    height: 422px
}



.fav-text {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

@media (min-width: 600px) {
    .fav-text {
        flex-direction: row;
    }
}

#cover-container {
    width: 100%;
    height: 150px;
    position: relative;
    overflow: hidden;
}


.cover-area {
    position: relative;
    width: 100%;
    height: 150px;
    margin-top: 20px;

}

.photobanner {
    position: absolute;
    top: 0px;
    left: 0px;

    overflow: hidden;
    white-space: nowrap;
    animation: bannermove 120s linear infinite;
}

.photobanner img {
    height: 150px;
    cursor: pointer;
    width: 150px;

    margin-left: 10px;

    border-radius: 10px;
    transition: all 100ms ease-in;
    -webkit-user-drag: none !important;
    user-select: none !important;
    background-color: #F0F0F0;
}


@media (hover: hover) and (pointer: fine) {

    .photobanner img:hover {
        transition: all 100ms ease-out;
    }

}

@keyframes bannermove {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(-50%, 0);
    }
}



.shuffle-button {
    margin: 0 auto;
    position: absolute;
    bottom: 0px;
    background-color: #FFFFFFAA;
    color: black;
    margin: 10px;
    height: 40px;
    font-size: 17px;
    border-radius: 10px;
    display: flex;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    justify-content: center;
    align-items: center;
    font-weight: 700 !important;
    letter-spacing: 1px;
    transition: background-color 100ms ease-in-out;
    cursor: pointer;
    width: calc(100% - 20px)
}

.shuffle-button img {
    margin-right: 10px;
}

.shuffle-button:hover {

    transition: background-color 100ms ease-in-out;
    background-color: #FFFFFF;
}


.song-placeholder {
    margin-top: 40px;
}
</style>