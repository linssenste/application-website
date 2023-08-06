import { mount, VueWrapper } from "@vue/test-utils";
import PolaroidImage from "../../components/PolaroidImage.vue";
import { nextTick } from "vue";
import { describe, expect, it, beforeEach } from "vitest";

describe("Polaroid Image", () => {
    let wrapper: VueWrapper<any>;
    const mockProps = {
        name: "./test_image.webp",
        text: "Sample Image",
    };
    beforeEach(() => {
        wrapper = mount(PolaroidImage, {
            props: mockProps,
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
        expect(text.text()).toBe("Sample Image");
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

    it("displays the polaroid frame", async () => {
        const frame = wrapper.find(".polaroid-frame");
        expect(frame.exists()).toBe(true);

        await frame.trigger("load");
        const contentImage = wrapper.find(".content-image");
        expect(contentImage.exists()).toBe(true);
    });

    it("toggles developPolaroid value on double click", async () => {
        expect(wrapper.vm.developPolaroid).toBe(false);
        await wrapper.trigger("dblclick");
        expect(wrapper.vm.developPolaroid).toBe(true);
    });

    it("has correct alt text for images", () => {
        const images = wrapper.findAll("img");
        for (let i = 0; i < images.length; i++) {
            expect(images[i].attributes("alt")).toBe(
                `Polaroid style sqaure picture described handwritten as ${mockProps.text}`
            );
        }
    });

    it("sets loadedFrame to true when the polaroid frame loads", async () => {
        const wrapper = mount(PolaroidImage, {
            props: { name: "image.jpg", text: "description" },
        });
        await wrapper.find(".polaroid-frame").trigger("load");
        expect(wrapper.vm.loadedFrame).toBe(true);
    });
});
