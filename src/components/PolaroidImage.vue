<template>
    <div ref="tiltImage" class="polaroid" v-on:dblclick="developPolaroidEvent">

        <img v-on:load="loadedFrame=true" src="@/assets/polaroid_frame.webp" class="polaroid-frame" alt="Tilted Image">



        <div :key="`polaroid-${developPolaroid}`" class="polaroid-image" v-if="loadedFrame">

            <img class="content-image" :src="`${name}`" />

        </div>


        <div v-if="text" class="info-text">{{text}}</div>
    </div>
</template>


<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import VanillaTilt from 'vanilla-tilt'

const tiltImage=ref<any>(null)

const props=defineProps<{
    name: string,
    text?: string
}>()

const loadedFrame=ref(false)
const developPolaroid=ref(false);

function developPolaroidEvent(): void {
    developPolaroid.value=!developPolaroid.value
}
onMounted(() => {
    VanillaTilt.init(tiltImage.value, {
        max: 2,
        speed: 200,
        reverse: true,

        glare: false,
        gyroscope: true,
        "max-glare": 0,
    })


})

props.name;
props.text;
</script>

<style scoped>
.polaroid {
    position: relative !important;
    z-index: 50 !important
}

.info-text {
    color: #000F55;
    position: absolute;
    bottom: 335px;

    top: 333px;
    left: 50%;
    transform: translateX(-50%) rotate(-1deg);
    font-family: 'biro_script_standardregular';
    user-select: none !important;
    font-size: 22px
}

.polaroid-frame {
    width: 350px;

    -webkit-user-drag: none;
    user-select: none;
    pointer-events: none;
}


.content-image {
    object-fit: cover;
    width: 100%;
    height: 100%;
    -webkit-user-drag: none;
    user-select: none;
    pointer-events: none;
    z-index: 10 !important;
    background-color: black;
    animation: fadein 5s;
    -moz-animation: fadein 5s;
    /* Firefox */
    -webkit-animation: fadein 5s;
    /* Safari and Chrome */
    -o-animation: fadein 5s;
    z-index: 1;
}

.polaroid-image {
    position: absolute;
    top: 69.5px;
    left: 55.5px;
    width: 100%;
    width: 243.5px !important;

    -webkit-user-drag: none;
    user-select: none;
    pointer-events: none;
    height: 243.5px !important;

    background-color: black;
}

@keyframes fadein {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@-moz-keyframes fadein {

    /* Firefox */
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@-webkit-keyframes fadein {

    /* Safari and Chrome */
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@-o-keyframes fadein {

    /* Opera */
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>

