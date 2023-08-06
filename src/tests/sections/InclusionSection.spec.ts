import { mount, VueWrapper } from "@vue/test-utils";
import InclusionSection from "../../views/InclusionSection.vue";
import ImagesRow from "../../components/ImagesRow.vue";
import { nextTick } from "vue";
import { describe, expect, it, beforeEach, vi } from "vitest";

vi.mock("vue-i18n", () => ({
    useI18n: () => ({ t: (key: string) => key, locale: "en" }),
}));

describe("InclusionSection.vue", () => {
    let wrapper: VueWrapper<any>;

    beforeEach(() => {
        wrapper = mount(InclusionSection, {
            global: {
                components: {
                    ImagesRow,
                },
            },
        });
    });

    const testCases = [
        {
            id: "disability-card",
            msg: "renders Disability Card",
            isComponent: false,
        },
        {
            id: "content-row",
            msg: "renders content row",
            isComponent: false,
        },
        {
            id: "text-area",
            msg: "renders text area",
            isComponent: false,
        },
        {
            id: ImagesRow,
            msg: "renders ImagesRow",
            isComponent: true,
        },
    ];

    for (const { id, msg, isComponent } of testCases) {
        it(msg, () => {
            const target = isComponent
                ? wrapper.findComponent(id)
                : wrapper.find(`.${id}`);
            expect(target.exists()).toBe(true);
        });
    }

    it("renders correct number of images", () => {
        const imagesRow = wrapper.findComponent(ImagesRow);
        expect(imagesRow.props("images")).toHaveLength(5);
    });

    it("renders the first image with correct properties", () => {
        const imagesRow = wrapper.findComponent(ImagesRow);
        expect(imagesRow.props("images")[0]).toEqual({
            name: "./mountains/steffen_mountain_4.webp",
            type: 0,
            text: "disability.imageText.0",
        });
    });

    // Add similar tests for remaining images

    it("renders the text area correctly", () => {
        const textArea = wrapper.find(".text-area");
        expect(textArea.text()).toContain("disability.textSection.paragraph1");
        expect(textArea.text()).toContain("disability.textSection.motto");
        expect(textArea.text()).toContain("disability.textSection.paragraph2");
        expect(textArea.text()).toContain("disability.textSection.podcast");
    });

    it("renders the iframes when not on mobile", async () => {
        Object.defineProperty(window, "innerWidth", {
            writable: true,
            configurable: true,
            value: 1500,
        });
        await nextTick();
        const iframes = wrapper.findAll("iframe");
        expect(iframes.length).toBe(3); // count for non-mobile view
    });

    // it("renders the iframes when on mobile", async () => {
    //     Object.defineProperty(window, "innerWidth", {
    //         writable: true,
    //         configurable: true,
    //         value: 500,
    //     });
    //     await nextTick();
    //     const iframes = wrapper.findAll("iframe");
    //     expect(iframes.length).toBe(2); // count for mobile view
    // });
});
