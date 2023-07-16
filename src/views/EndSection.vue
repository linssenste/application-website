<template>
    <div class="main-content">
        <div class="text-content">
            <div class="title-text">
                <span class="text-highlight-blue-bold" style="font-size: 40px;"> {{t('footer.thatsIt')}}!</span>
                <img draggable="false" width="60" height="60" style="margin-top: 5px; margin-left: 10px"
                    src="../assets/icons/heart.webp" />
            </div>
            <div class="text">
                {{t('footer.intro')}}

                <p>{{t('footer.techDetail')}}</p>

                {{t('footer.invitation')}}

                <a :href="t('footer.cvLink')" target="_blank">
                    <button v-on:click="" class="action-button" style="margin-top: 30px;">
                        <img style="margin-right: 12px" src="../assets/icons/arrow-right-solid.svg" width="16" />
                        {{t('footer.cvButton')}}
                    </button>
                </a>

                <a href="https://github.com/linssenste/application-website" target="_blank">
                    <button v-on:click="" class="action-button">
                        <img style="margin-right: 12px" src="../assets/icons/github.svg" width="16" />
                        {{t('footer.sourceCodeButton')}}
                    </button>
                </a>

            </div>



        </div>

        <TLDRCard />
    </div>
</template>

<script lang="ts" setup>
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
</style>