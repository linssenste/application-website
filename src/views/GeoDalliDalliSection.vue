
<template>
    <div style="position: relative; height: 100%; width: 100%;  padding-bottom: 190px;">
        <div class="text-element header">
            <h1>{{t('dalli.name')}}:</h1>

        </div>

        <!-- <div class="text-element text description">{{t('dalli.description')}}</div> -->
        <div
            style="position: relative;  height: 90%; width: 100%; align-items: center; justify-content: center; display: flex;">
            <iframe src="https://dalli-dalli.com?interval=0" class="game-iframe" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import GithubButton from 'vue-github-button';
import { useI18n } from 'vue-i18n'
const { t }=useI18n()
</script>


<style scoped>
.game-iframe {
    width: 95%;
    max-width: 1250px;
    height: 100%;
    border: none;
    border-radius: 12px;
    border: 1px solid #E0E0E0;
}

@media (max-width: 1000px) {
    .game-iframe {
        width: 100%;
        border-radius: 0px;
        border-left: none;
        border-right: none;
    }
}

.text-element {
    width: calc(100% - 20px);
    max-width: 1250px;

    padding-left: 10px;
    padding-right: 10px;
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.header {

    line-height: 60px;
    transform: rotate(-2deg);
    margin-top: 60px;
    margin-bottom: 20px;
    /* z-index: 10000 */
}

.header h1 {
    margin-bottom: 5px;
}

@media screen and (max-width: 800px) {
    .header {
        margin-top: 30px;
        flex-direction: column;
        justify-content: start;
        align-items: start;
    }


}




.description {
    margin-bottom: 30px;
    margin-top: 10px;
}
</style>