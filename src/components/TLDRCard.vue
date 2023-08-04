<template>
    <div class="tldr-card">
        <div class="text-highlight-blue tldr-text">
            TL;DR:</div>
        <img alt="handdrawn crossout scribble" draggable="false" src="@/assets/crossout.webp" width="60" height="22"
            class="crossout-img" />

        <div class="tldr-end-text">
            !</div>
        <iframe title="Kraftklub - 'Ich will nicht nach Berlin' music with 'nicht' scribbled out"
            style="border-radius:12px; "
            src="https://open.spotify.com/embed/track/0XcC71H8QAjrW0NUqXHX1A?utm_source=generator&theme=0" width="330"
            height="352" frameBorder="0" loading="lazy"></iframe>
    </div>
</template>

<style scoped>
.tldr-end-text {
    position: absolute;
    top: 230px;
    left: 270px;
    transform: rotate(-15deg);
    font-family: 'biro_script_standardbold';
    color: white;
    font-size: 40px
}

.tldr-text {
    position: absolute;
    top: -60px;
    transform: rotate(2deg);
    font-size: 40px;
}

.crossout-img {
    position: absolute;
    filter: invert();
    top: 246px;
    left: 97px;
    opacity: .95
}

.tldr-card {
    position: relative;
    width: 350px;
    height: 352px;
    margin: 100px;
    margin-bottom: 20px;
    ;
    border-radius: 12px;
}
</style>