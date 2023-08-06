<template>
    <div class="main-content">
        <div class="text-content">
            <div class="title-text">
                <span class="text-highlight-blue-bold" style="font-size: 40px;"> {{t('footer.thatsIt')}}!</span>
                <!-- <img draggable="false" width="60" height="60" style="margin-top: 5px; margin-left: 10px"
                    src="../assets/icons/heart.webp" /> -->
            </div>
            <div class="text">
                {{t('footer.intro')}}

                <p>{{t('footer.techDetail')}}
                <div class="code-status">
                    <github-button data-testid="github-link" href="https://github.com$/linssenste/application-website"
                        data-size="large" data-show-count="true" aria-label="View on GitHub"> Source Code</github-button>


                    <div class="code-badges">
                        <a href="https://codecov.io/gh/linssenste/application-website">
                            <img alt="Code coverage with codecov" height="23"
                                src="https://codecov.io/gh/linssenste/application-website/branch/main/graph/badge.svg?token=L66XWC20WB" />
                        </a>

                        <a href="https://github.com/linssenste/application-website/actions/workflows/main.yml">
                            <img alt="github test pipeline" height="23"
                                src="https://github.com/linssenste/application-website/actions/workflows/main.yml/badge.svg?branch=main">
                        </a>
                    </div>

                </div>
                </p>






            </div>



        </div>

        <div style="position: relative;">
            <TLDRCard />
            <a :href="t('footer.cvLink')" target="_blank">
                <button v-on:click="" class="resume-button" style="margin-top: 50px;">
                    <!-- <img alt="arrow right button" style="margin-right: 12px; opacity: .6"
                            src="../assets/icons/file-solid.svg" width="13" /> -->
                    {{t('footer.cvButton')}}
                </button>
            </a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import GithubButton from 'vue-github-button';

import TLDRCard from '../components/TLDRCard.vue';
import { useI18n } from 'vue-i18n'
const { t }=useI18n()


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
    display: flex;
    flex-direction: row;
    align-content: center;
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


.code-status {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    justify-content: space-between;
}

.code-badges {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}


.resume-button {
    border: none;
    cursor: pointer;
    width: 100%;
    height: 40px;
    font-family: 'biro_script_standardsloppy';
    background-color: #F0F0F0CC;
    margin: auto;
    max-width: 330px;
    display: flex;
    border-radius: 12px;
    align-items: center;
    color: black;
    text-transform: uppercase;
    font-size: 20px;
    padding-top: 6px;
    justify-content: center;

    font-weight: 600 !important;
    letter-spacing: 1px;
    transition: background-color 100ms ease-in-out;

    margin-bottom: 8px;
    margin-top: -8px !important;
    margin-left: 100px
}

.resume-button:hover {
    background-color: #F0F0F0;
    transition: background-color 100ms ease-in-out;

}
</style>