import { mount, VueWrapper } from "@vue/test-utils";
import MusicLoveSection from "../../views/MusicLoveSection.vue";
import ImagesRow from "../../components/ImagesRow.vue";
import { nextTick } from "vue";
import { describe, expect, it, beforeEach, vi } from "vitest";

vi.mock("vue-i18n", () => ({
    useI18n: () => ({ t: (key: string) => key }),
}));

describe("MusicLoveSection.vue", () => {
    let wrapper: VueWrapper<any>;

    beforeEach(() => {
        wrapper = mount(MusicLoveSection, {
            global: {
                components: {
                    ImagesRow,
                },
            },
        });
    });

    const testCases = [
        { id: "festival", msg: "renders ImagesRow", isComponent: true },
        {
            id: "music-text",
            msg: "renders music text",
            textContains: "musicLove.musicForMe",
        },
    ];

    for (const { id, msg, isComponent, textContains } of testCases) {
        it(msg, () => {
            const target = isComponent
                ? wrapper.findComponent(ImagesRow)
                : wrapper.find(`.${id}`);
            expect(target.exists()).toBe(true);
            if (textContains) {
                expect(target.text()).toContain(textContains);
            }
        });
    }

    it("renders correct number of festival images", () => {
        const imagesRow = wrapper.findComponent(ImagesRow);
        expect(imagesRow.props("images")).toHaveLength(4);
    });
    it("renders the first festival image with correct properties", () => {
        const imagesRow = wrapper.findComponent(ImagesRow);
        expect(imagesRow.props("images")[0]).toEqual({
            name: "./festivals/steffen_festival_2.webp",
            type: 0,
            text: "Tempelhof Sounds '22",
        });
    });

    it("renders the second festival image with correct properties", () => {
        const imagesRow = wrapper.findComponent(ImagesRow);
        expect(imagesRow.props("images")[1]).toEqual({
            name: "./festivals/steffen_festival_3.webp",
            type: 0,
            text: "Frequency 2022 ",
        });
    });

    it("renders the third festival image with correct properties", () => {
        const imagesRow = wrapper.findComponent(ImagesRow);
        expect(imagesRow.props("images")[2]).toEqual({
            name: "./festivals/steffen_festival_4.webp",
            type: 0,
            text: "Superbloom, München",
        });
    });

    it("renders the fourth festival image with correct properties", () => {
        const imagesRow = wrapper.findComponent(ImagesRow);
        expect(imagesRow.props("images")[3]).toEqual({
            name: "./festivals/steffen_csd.webp",
            type: 0,
            text: "CSD München",
        });
    });

    it("renders the music text correctly", () => {
        const musicText = wrapper.find(".music-text");
        expect(musicText.text()).toContain("musicLove.musicForMe");
        expect(musicText.text()).toContain("musicLove.rhythm");
        expect(musicText.text()).toContain("musicLove.everySongReflects");
        expect(musicText.text()).toContain("musicLove.musicInMyLife");
        expect(musicText.text()).toContain("musicLove.inspiration");
        expect(musicText.text()).toContain("musicLove.myFavorites");
    });

    // Add other tests as needed
});
