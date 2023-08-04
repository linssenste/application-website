import { mount, VueWrapper } from "@vue/test-utils";
import PolaroidImage from "../../components/PolaroidImage.vue";
import { nextTick } from "vue";
import { describe, expect, it, beforeEach } from "vitest";

describe("Polaroid Image", () => {
    let wrapper: VueWrapper<any>;

    beforeEach(() => {
        wrapper = mount(PolaroidImage, {
            props: {
                name: "./test_image.webp",
                text: "Test Image",
            },
        });
    });

    it("renders polaroid image", async () => {
        const frameImage = wrapper.find(".polaroid-frame");
        await frameImage.trigger("load");
        await nextTick();

        const image = wrapper.find(".content-image");
        expect(image.exists()).toBe(true);
    });

    it("displays the correct text if provided", () => {
        const text = wrapper.find(".info-text");
        expect(text.text()).toBe("Test Image");
    });

    it("displays the correct image source", async () => {
        const frameImage = wrapper.find(".polaroid-frame");
        await frameImage.trigger("load");
        await nextTick();

        const image = wrapper.find(".content-image");
        expect(image.exists()).toBe(true);
        expect(image.attributes("src")).toBe("./test_image.webp");
    });

    it("polaroid frame image exists", () => {
        const frameImage = wrapper.find(".polaroid-frame");
        expect(frameImage.exists()).toBe(true);
    });

    it("double clicking triggers developPolaroidEvent", async () => {
        const polaroidDiv = wrapper.find(".polaroid");
        polaroidDiv.trigger("dblclick");
        await nextTick();
        expect(wrapper.vm.developPolaroid).toBe(true);
    });

    it("toggles 'developPolaroid' value on double click", async () => {
        const polaroid = wrapper.find(".polaroid");
        expect(wrapper.vm.developPolaroid).toBe(false);
        await polaroid.trigger("dblclick");
        expect(wrapper.vm.developPolaroid).toBe(true);
        await polaroid.trigger("dblclick");
        expect(wrapper.vm.developPolaroid).toBe(false);
    });

    it("renders no info-text div if text prop is not provided", async () => {
        const wrapper = mount(PolaroidImage, {
            props: {
                name: "./test_image.webp",
            },
        });
        await nextTick();

        const text = wrapper.find(".info-text");
        expect(text.exists()).toBe(false);
    });
});
