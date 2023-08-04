import { mount, VueWrapper } from "@vue/test-utils";
import PolaroidCreativitySection from "../../views/PolaroidCreativitySection.vue";
import ImagesRow from "../../components/ImagesRow.vue";
import { describe, expect, it, beforeEach, vi } from "vitest";

vi.mock("vue-i18n", () => ({
    useI18n: () => ({ t: (key: string) => key }),
}));

describe("PolaroidCreativitySection.vue", () => {
    let wrapper: VueWrapper<any>;

    beforeEach(() => {
        wrapper = mount(PolaroidCreativitySection, {
            global: {
                components: {
                    ImagesRow,
                },
            },
        });
    });

    it("renders ImagesRow", () => {
        const imagesRow = wrapper.findComponent(ImagesRow);
        expect(imagesRow.exists()).toBe(true);
    });

    it("renders creativity disclaimer", () => {
        const disclaimer = wrapper.find(".text-highlight-blue");
        expect(disclaimer.text()).toContain("*");
    });

    it("renders the first polaroid image with correct properties", () => {
        const imagesRow = wrapper.findComponent(ImagesRow);
        expect(imagesRow.props("images")[0]).toEqual({
            name: "/polaroid_art/polaroid_art_1.webp",
            type: 0,
            text: "#67",
        });
    });

    it("renders the second polaroid image with correct properties", () => {
        const imagesRow = wrapper.findComponent(ImagesRow);
        expect(imagesRow.props("images")[1]).toEqual({
            name: "/polaroid_art/polaroid_art_5.webp",
            type: 0,
            text: "#31",
        });
    });

    it("renders the third polaroid image with correct properties", () => {
        const imagesRow = wrapper.findComponent(ImagesRow);
        expect(imagesRow.props("images")[2]).toEqual({
            name: "/polaroid_art/polaroid_art_2.webp",
            type: 0,
            text: "#3",
        });
    });

    it("renders the fourth polaroid image with correct properties", () => {
        const imagesRow = wrapper.findComponent(ImagesRow);
        expect(imagesRow.props("images")[3]).toEqual({
            name: "/polaroid_art/polaroid_art_4.webp",
            type: 0,
            text: "#14",
        });
    });
});
