<template>
    <div class="instagram-area">
        <div class="video-wrapper">

            <video controls poster="/instagram/slovenia_thumbnail.jpg">
                <source
                    src="https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/slovenia_aftermovie.mp4?alt=media&token=7ab60e9b-2a72-437f-90e1-22c491a053fb"
                    type="video/mp4" />
            </video>
            <img draggable="false" class="video-decorative" src="/risographics/riso_form_1.webp" alt="" />
            <!-- <img draggable="false" class="video-decorative" src="/risographics/riso_form_2.webp" alt="" />
            <img draggable="false" class="video-decorative" src="/risographics/riso_form_3.webp" alt="" /> -->
        </div>
        <div class="instagram-feed">

            <div class="text" style="margin-bottom: 30px; margin-left: 0px!important; margin-right: 0px!important;">
                {{t('instagram.musicPassion')}}
                <span class="text-highlight-blue"
                    style="display: inline-block; max-height: 27px">{{t('instagram.dogName')}}</span>
                {{t('instagram.everyStoryAndPost')}}
                <p>
                    {{t('instagram.creativeProcess')}}
                    <span class="text-highlight-blue"
                        style="display: inline-block; max-height: 27px">{{t('instagram.creative')}}</span>
                    {{t('instagram.processDescription')}}
                </p>
            </div>


            <a href="https://www.instagram.com/thejasperfromtheblock/" target="_blank" rel="noopener noreferrer">
                <div class="instagram-profile-link">
                    <img src="../assets/icons/instagram_logo_icon.webp" width="30" alt="Instagram Logo" />
                    <span class="text-highlight-blue instagram-handle">@jasperfromtheblock</span>
                </div>
            </a>
            <!-- instagram link images row #1 -->
            <div class="img-row">
                <a href="https://www.instagram.com/p/Cm3X6lwIESU/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=="
                    target="_blank" rel="noopener noreferrer">
                    <img draggable="false" class="img-link" style="border-top-left-radius: 12px;"
                        src="/instagram/insta_jas_1.webp" width="110" height="110" alt="Instagram Post 1" />
                </a>
                <a href="https://www.instagram.com/p/CmOXfmjgOZX/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=="
                    target="_blank" rel="noopener noreferrer">
                    <img draggable="false" class="img-link" src="/instagram/insta_jas_2.webp" height="110" width="110"
                        alt="Instagram Post 2" />
                </a>
                <a href="https://www.instagram.com/p/CkYfEu1I8TR/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=="
                    target="_blank" rel="noopener noreferrer">
                    <img draggable="false" class="img-link" style="border-top-right-radius: 12px;"
                        src="/instagram/insta_jas_3.webp" width="110" height="110" alt="Instagram Post 3" />
                </a>
            </div>
            <!-- instagram link images row #2 -->
            <div class="img-row">
                <a href="https://www.instagram.com/p/CkDghP9DmjY/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=="
                    target="_blank" rel="noopener noreferrer">
                    <img draggable="false" class="img-link" src="/instagram/insta_jas_9.webp" height="110" width="110"
                        alt="Instagram Post 4" />
                </a>
                <a href="https://www.instagram.com/p/Cibx_erDPpC/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=="
                    target="_blank" rel="noopener noreferrer">
                    <img draggable="false" class="img-link" src="/instagram/insta_jas_8.webp" height="110" width="110"
                        alt="Instagram Post 5" />
                </a>
                <a href="https://www.instagram.com/p/Cg2FAlYjfni/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=="
                    target="_blank" rel="noopener noreferrer">
                    <img draggable="false" class="img-link" src="/instagram/insta_jas_7.webp" height="110" width="110"
                        alt="Instagram Post 6" />
                </a>
            </div>
            <!-- instagram link images row #3 -->
            <div class="img-row">
                <a href="https://www.instagram.com/p/CejCcFHDECi/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=="
                    target="_blank" rel="noopener noreferrer">
                    <img draggable="false" class="img-link" src="/instagram/insta_jas_6.webp" height="110" width="110"
                        alt="Instagram Post 7" />
                </a>
                <a href="https://www.instagram.com/p/CdBcLvSvMpj/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=="
                    target="_blank" rel="noopener noreferrer">
                    <img draggable="false" class="img-link" src="/instagram/insta_jas_5.webp" height="110" width="110"
                        alt="Instagram Post 8" />
                </a>
                <a href="https://www.instagram.com/p/CSpJ34TIvDm/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=="
                    target="_blank" rel="noopener noreferrer">
                    <img draggable="false" class="img-link" src="/instagram/insta_jas_4.webp" height="110" width="110"
                        alt="Instagram Post 9" />
                </a>
            </div>
            <div class="music-instagram">
                <iframe title="'Jenny from the block' song on spotify"
                    style="border-radius: 0px!important; border-bottom-right-radius:12px!important"
                    src="https://open.spotify.com/embed/track/7LqjznQwfrax7MjQXmxqdQ?utm_source=generator&theme=0"
                    width="100%" height="102" frameborder="0" loading="lazy"></iframe>
            </div>



        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t }=useI18n()

</script>

<style scoped>
.img-link {
    user-select: none;
    -webkit-user-drag: none;
    margin: 2px;
    margin-bottom: 0px;
    margin-top: 0px;
    background-color: #f0f0f0;
}

.img-link:hover {
    transform: scale(1.02);
}

.img-row {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.music-instagram {
    height: 82px;
    overflow: hidden;
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    margin-left: 2px;
}

.instagram-profile-link {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    align-content: center;
    margin-bottom: 5px;
}

.instagram-handle {
    margin-bottom: 15px;
    margin-left: 10px;
}

.instagram-handle:hover {
    color: #c80018 !important;
}

.instagram-feed {
    display: inline-block;
    position: relative;
    margin-top: 40px;
    margin-bottom: 40px;
    max-width: 340px;
    margin-left: 30px;
    margin-right: 30px;
}

.video-wrapper {
    position: relative;
    margin: auto;
    max-width: 400px;
    width: calc(100% - 40px);

    border-radius: 10px;
}

.video-wrapper video {
    z-index: 20;
    border-radius: 10px;
    width: 100%;
    aspect-ratio: 9/16;
}

.video-decorative {
    position: absolute;
    width: 200px;
    opacity: 1;
    user-select: none;
    -webkit-user-drag: none;
    z-index: -1;
}

.video-decorative:nth-child(2) {
    top: -40px;
    left: -50px;
    transform: scale(1.5);
}

.video-decorative:nth-child(3) {
    bottom: -10px;
    right: -50px;
    transform: scale(1.5);
}

.video-decorative:nth-child(4) {
    bottom: 80px;
    left: -110px;
}

.instagram-area {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px
}

@media (min-width: 800px) {
    .instagram-area {
        flex-direction: row;
    }

    .instagram-feed {
        margin-top: 0;
        margin-bottom: 0;
    }

    .video-wrapper {
        margin-right: 100px;
        margin-left: 0;
    }
}
</style>
