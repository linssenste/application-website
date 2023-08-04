import { mount } from "@vue/test-utils";
import ImagesRow from "../../components/ImagesRow.vue";
import PolaroidImage from "../../components/PolaroidImage.vue";
import { describe, expect, it, beforeEach, vi } from "vitest";

describe("ImagesRow", () => {
    let images: any[];
    let scrollBySpy: any;

    beforeEach(() => {
        images = [
            { name: "test1", type: 1, text: "test text 1" },
            { name: "test2", type: 2, text: "test text 2" },
            { name: "test3", type: 3, text: "test text 3" },
        ];

        scrollBySpy = vi.fn();
        Object.defineProperty(window.HTMLElement.prototype, "scrollBy", {
            configurable: true,
            value: scrollBySpy,
        });
    });

    it("renders scroll buttons", () => {
        const wrapper = mount(ImagesRow, {
            props: { rowId: "test-row", images },
        });
        const scrollButtons = wrapper.findAll(".scroll-arrow");
        expect(scrollButtons.length).toBe(2);
    });

    it("renders the correct number of PolaroidImage components", () => {
        const wrapper = mount(ImagesRow, {
            props: { rowId: "test-row", images },
        });
        const polaroidImages = wrapper.findAllComponents(PolaroidImage);
        expect(polaroidImages.length).toBe(images.length);
    });

    it("renders a spotify music iframe if songId is provided", () => {
        const songId = "test-song";
        const wrapper = mount(ImagesRow, {
            props: { rowId: "test-row", songId, images },
        });
        const iframe = wrapper.get("iframe");
        expect(iframe.attributes("src")).toContain(songId);
    });

    it("does not render a spotify music iframe if songId is not provided", () => {
        const wrapper = mount(ImagesRow, {
            props: { rowId: "test-row", images },
        });
        const iframes = wrapper.findAll("iframe");
        expect(iframes.length).toBe(0);
    });

    it("should call scroll when clicking scroll buttons", async () => {
        const scrollBySpy = vi.fn();
        Object.defineProperty(window.HTMLElement.prototype, "scrollBy", {
            configurable: true,
            value: scrollBySpy,
        });

        const wrapper = mount(ImagesRow, {
            props: { rowId: "test-row", images },
        });
        const scrollButtons = wrapper.findAll(".scroll-arrow");

        await scrollButtons[0].trigger("click");
        expect(scrollBySpy).toHaveBeenLastCalledWith({
            left: -300,
            behavior: "smooth",
        });

        await scrollButtons[1].trigger("click");
        expect(scrollBySpy).toHaveBeenLastCalledWith({
            left: 300,
            behavior: "smooth",
        });
    });
});
