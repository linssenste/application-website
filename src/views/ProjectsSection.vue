<template>
    <div>
        <!-- <div class="text-highlight-blue" style="width: 100%; padding-bottom: 60px; text-align: center; ">
            <h1>{{t('projects.title')}}:</h1>
        </div> -->
        <div
            style="position: relative;width: 100%;  margin-bottom: 100px; position: relative; display: flex; flex-direction: row; align-items: center; justify-content: center;">
            <RisographArtSection style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" />



            <div class="row-scroll-content" ref="scrollContainer">

                <div v-for="(project, index) in projectReferences" :id="`card-${index}`" class="carousel-item">
                    <ProjectCard :index="index+1" :total="projectReferences.length" v-on:selected="selectCard(index)"
                        :focused="focusedIndex==index" :data="project" />

                </div>
            </div>



        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

import RisographArtSection from './RisographArtSection.vue';
import ProjectCard from '../components/ProjectCard.vue';
import { useI18n } from 'vue-i18n'
const { t }=useI18n()

const scrollContainer=ref(null); // Reference to the scroll container
const focusedIndex=ref(0); // Track the currently focused project

function selectCard(index: number): void {
    const doc=document.getElementById(`card-${index}`);
    if (doc!=null) doc.scrollIntoView({ behavior: 'smooth' });
}
onMounted(() => {
    const handleScroll=() => {
        const container=scrollContainer.value;
        const children=container.children;
        const center=container.scrollLeft+container.offsetWidth/2;

        for (let i=0; i<children.length; i++) {
            const child=children[i];
            const left=child.offsetLeft;
            const right=left+child.offsetWidth;

            if (left<center&&center<right) {
                focusedIndex.value=i;
                break;
            }
        }
    };

    // Attach scroll event listener
    scrollContainer.value.addEventListener('scroll', handleScroll);

    // Clean up event listener on component unmount
    onUnmounted(() => {
        scrollContainer.value.removeEventListener('scroll', handleScroll);
    });
});

const projectReferences=[
    {
        name: 'Geo Dalli-Dalli',
        logo: 'https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Fgeo-dalli%2Fdalli_logo.webp?alt=media&token=0b41a7a8-7df6-41af-b811-2b59788cd4f4',
        projectType: 'Fun project',
        company: '/',
        stack: ['Vue', 'Konva', 'Google Maps API', 'Overpass Turbo API'],
        description: "AlinoCam ist eine Web-Anwendung zur visuellen Dokumentation von Baustellenprozessen. Die Endnutzer:innen sind hauptsächlich Bauleiter:innen, Architekt:innen und der Projektträger. Alinocam nutzt bewegbare PTZ-Kameras, um kontinuierlich und aus vielfältigen Perspektiven den Fortschritt auf der Baustelle zu dokumentieren. Dies geschieht in regelmäßigen Intervallen, was die Erstellung von Zeitraffern und eine fortlaufende, visuelle Dokumentation ermöglicht. Ein anpassbarer Zeitplan ermöglicht die genaue Planung von Absicherung und Dokumentationsblöcken. Zusätzlich verfügt AlinoCam über eine Protokollfunktion für KFZ-Einfahrtsbereiche, die wichtige Informationen wie Kennzeichen, Einfahrtart (Ein- oder Ausfahrt) und ein Beweisfoto erfasst.",
        images: [
            {
                type: 0,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Fgeo-dalli%2Fdalli_setup.webp?alt=media&token=4b80534a-4890-4ef3-aa2d-2d47b8311b9b",
                descr: ''
            },
            {
                type: 0,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Fgeo-dalli%2Fdalli_guess.webp?alt=media&token=68e09c2b-0e6b-4186-bb85-80d30f4760db",
                descr: ''
            },
            {
                type: 0,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Fgeo-dalli%2Fdalli_round.webp?alt=media&token=68bafc4c-47fe-4f4f-85c8-503b13312073",
                descr: ''
            },
            {
                type: 0,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Fgeo-dalli%2Fdalli_review.webp?alt=media&token=bcb147e6-d557-4483-b88c-fc6def685a3f",
                descr: ''
            },
            {
                type: 1,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Fgeo-dalli%2Fdalli_speedrun.mp4?alt=media&token=7053a037-5932-466f-af47-4f4981412d66",
                descr: ''
            }

        ]
    },

    {
        name: 'Instax Web',
        projectType: 'Reverse engineering',
        company: '/',
        stack: ['Vue', 'Web Bluetooth Api'],
        description: "AlinoCam ist eine Web-Anwendung zur visuellen Dokumentation von Baustellenprozessen. Die Endnutzer:innen sind hauptsächlich Bauleiter:innen, Architekt:innen und der Projektträger. Alinocam nutzt bewegbare PTZ-Kameras, um kontinuierlich und aus vielfältigen Perspektiven den Fortschritt auf der Baustelle zu dokumentieren. Dies geschieht in regelmäßigen Intervallen, was die Erstellung von Zeitraffern und eine fortlaufende, visuelle Dokumentation ermöglicht. Ein anpassbarer Zeitplan ermöglicht die genaue Planung von Absicherung und Dokumentationsblöcken. Zusätzlich verfügt AlinoCam über eine Protokollfunktion für KFZ-Einfahrtsbereiche, die wichtige Informationen wie Kennzeichen, Einfahrtart (Ein- oder Ausfahrt) und ein Beweisfoto erfasst.",
        images: [
            {
                type: 0,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Finstax-web%2Finstax_interface.webp?alt=media&token=10a24135-f5d9-40f8-bb86-f52a62bfcbfb",
                descr: ''
            },
            {
                type: 0,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Finstax-web%2Finstax_connection.webp?alt=media&token=481273e0-053a-4a62-8d18-6b4bae128493",
                descr: ''
            },


            {
                type: 1,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Finstax-web%2Finstax_video_2.webm?alt=media&token=55870d00-d7c6-4532-9de5-abc62ca1e6e0",
                descr: ''
            },
            {
                type: 1,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Finstax-web%2Finstax_video_3.webm?alt=media&token=8c389ef0-2004-434b-a584-550c96744157",
                descr: ''
            },

            {
                type: 0,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Finstax-web%2Fprint_result.webp?alt=media&token=f8400622-760c-46b7-8b59-cc106c96c89f",
                descr: ''
            },
            {
                type: 1,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Finstax-web%2Finstax_video_1.webm?alt=media&token=9685b261-7a9e-49bb-8494-4454f539c4a4",
                descr: ''
            },

        ]
    },
    {
        name: 'AlinoPlan',
        logo: 'https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Falinoplan%2Fplan_logo.webp?alt=media&token=bcb0a501-04a2-4dad-93ab-4b4f05f35cb5',
        projectType: 'internes Tool',
        company: 'AlinoTec',
        stack: ['Konva', 'JSPDF', 'Vue', 'Vuex', 'Firestore', 'GCP Functions'],
        description: "AlinoPlan ist eine webbasierte Anwendung, die eine visuelle Planung von kamerabasierten Absicherungen (z.B.von Baustellen) ermöglicht. Zur detaillierten Planung kann der Bauplan oder auch Satellitenbildern genutzt werden und die Projektgrenzen definieriert werden. Abschattungen, die durch Bäume, Container oder Bauabschnitte verursacht werden, werden in der Anwendung automatisch berechnet und visualisiert.Die Anwendung dient zum einen der Verbesserung der internen Zusammenarbeit und zum anderen der Bereitstellung einer übersichtlichen, logischen und vor allem transparenten Projektplanung für den Auftraggeber. Die Projektpläne können als formatierte PDF (DIN-A3) exportiert werden.",
        images: [
            {
                type: 0,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Falinoplan%2Fplan_shadow.webp?alt=media&token=25ad5694-d07e-4e36-8918-dc15638fdbe9",
                descr: 'Beispielhafte Abschattungen (Sichteinschränkungen) durch Bäume und Baubereiche für die Kameras von einem Videoturm zur Baustellenüberwachung.'
            },
            {
                type: 0,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Falinoplan%2Fplan_setup.webp?alt=media&token=7195ba11-b265-4327-910e-1e649a9f8854",
                descr: 'Bei der Erstellung von einem Projekt werden idealerweise Bebauungspläne verwendet. Alternativ können aber auch  Satellitenbilder aus Google Maps genutzt werden. '
            },
            {
                type: 1,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Falinoplan%2Fplan_video_1.webm?alt=media&token=fabb5128-4b42-440f-86c7-1060af9a7e73",
                descr: 'Platzierung von Bäumen auf dem Projektgelände, da diese möglicherweise die Sicht der Kameras einschränken könnten'
            },
            {
                type: 1,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Falinoplan%2Fplan_video_2.webm?alt=media&token=a91daae3-27b4-4b6a-b760-88ac8fa92cf3",
                descr: 'Baubereiche, Bäume, Container und Projektgrenzen müssen manuell in die Projektierung eingezeichnet werden, um Abschattungen zu berechnen'
            },
            {
                type: 0,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Falinoplan%2Fplan_history.webp?alt=media&token=dd3e23e9-3153-4e5d-b160-15e63c5255b3",
                descr: 'Mit jeder Änderung (Export, Review, Entwurf, etc.) wird dieser Schritt mit Kommentar zu einem Verlauf hinzugefügt. So sind alle Änderungen und der Bearbeiter dokumentiert.'
            },
            {
                type: 0,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Falinoplan%2Fplan_overview.webp?alt=media&token=a6d4ff05-7b47-40f0-9e53-f8bedea13ef9",
                descr: 'Auf der Startseite von der Anwendung, werden alle Projektierungen aufgelistet mit dem jeweiligen Status und ggf. dem Bearbeiter.'
            },
            {
                type: 1,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Falinoplan%2Fplan_video_3.webm?alt=media&token=6ffb72e0-7396-4970-a1fc-f811fd71d4c6",
                descr: 'Automatische Berechnung von Abschattungen (Sichteinschränkungen der Kameras) durch Bäume, Gebäude und Projektgrenzen'
            },
            {
                type: 2,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Falinoplan%2Fproject.pdf?alt=media&token=3b5b3bfe-de7b-48d8-b6f2-58623acf5100",
                descr: 'Projektierungen können als hochauflösender PDF-Export im DIN-A3 Format mit Legende und Maßstab exportiert werden'
            },

        ]
    },
    {
        name: 'AlinoCam',
        logo: 'https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Falinocam%2Fcam_logo.webp?alt=media&token=e9a84fdb-9c53-4154-b0fb-d0b73bc60449',
        projectType: 'SAAS',
        company: 'AlinoTec',
        stack: ['Vue', 'Vuetify', 'Vuex', 'Firebase'],
        description: "AlinoCam ist eine Web-Anwendung zur visuellen Dokumentation von Baustellenprozessen. Die Endnutzer:innen sind hauptsächlich Bauleiter:innen, Architekt:innen und der Projektträger. Alinocam nutzt bewegbare PTZ-Kameras, um kontinuierlich und aus vielfältigen Perspektiven den Fortschritt auf der Baustelle zu dokumentieren. Dies geschieht in regelmäßigen Intervallen, was die Erstellung von Zeitraffern und eine fortlaufende, visuelle Dokumentation ermöglicht. Ein anpassbarer Zeitplan ermöglicht die genaue Planung von Absicherung und Dokumentationsblöcken. Zusätzlich verfügt AlinoCam über eine Protokollfunktion für KFZ-Einfahrtsbereiche, die wichtige Informationen wie Kennzeichen, Einfahrtart (Ein- oder Ausfahrt) und ein Beweisfoto erfasst.",
        images: [
            {
                type: 0,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Falinocam%2Fcam_landing.webp?alt=media&token=347d3aee-2739-4b13-b208-1098df2884d5",
                descr: ''
            },
            {
                type: 0,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Falinocam%2Fcam_share.webp?alt=media&token=cc1f4758-1f39-46bf-af8e-de91156276b6",
                descr: ''
            },
            {
                type: 1,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Falinocam%2Fcam_video_1.webm?alt=media&token=6938965e-41ca-41f6-990c-8801581da317",
                descr: ''
            },
            {
                type: 1,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Falinocam%2Fcam_video_2.webm?alt=media&token=86eef972-e237-4a72-b262-1fdbb9f0f6a0",
                descr: ''
            },
            {
                type: 1,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Falinocam%2Fcam_video_3.webm?alt=media&token=825f24a0-182c-4f0e-b646-499f050829ac",
                descr: ''
            },
            {
                type: 1,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Falinocam%2Fcam_video_4.webm?alt=media&token=decc3e48-e45a-42d7-a505-8cc8362ade25",
                descr: ''
            },
            {
                type: 1,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Falinocam%2Fcam_video_5.webm?alt=media&token=66df92ed-c555-42cd-9623-04e7fbc8865e",
                descr: ''
            },

            {
                type: 0,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Falinocam%2Fcam_park_control.webp?alt=media&token=d8e59cd7-9391-4494-bbc3-7e66ee2e7fff",
                descr: ''
            }

        ]
    },



]


</script>


<style scoped>
.carousel-item {
    position: relative;
    width: 750px !important;
    width: 100%;
    max-width: 100%;

    scroll-snap-align: center;


}

@media screen and (min-width: 800px) {
    .carousel-item {
        min-width: 750px;
    }
}





.row-scroll-content {
    /* scroll-snap-type: x mandatory; */
    display: flex;
    flex-direction: row;
    width: 100%;
    /* height: 100%; */
    overflow-x: scroll;


    overflow-y: hidden;
    white-space: nowrap;

    justify-content: start;
    scroll-snap-type: x mandatory;
    /* gap: 20px; */

    /* For Webkit browsers */
    ::-webkit-scrollbar {
        display: none;
    }

    -webkit-overflow-scrolling: touch;

    ::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

@media screen and (min-width: 800px) {
    .row-scroll-content {

        gap: 150px;
        padding-left: calc(50% - 375px);
        padding-right: calc(50% - 375px);
    }
}
</style>