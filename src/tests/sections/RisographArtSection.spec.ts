import { mount } from "@vue/test-utils";
import RisographArtSection from "../../views/RisographArtSection.vue";
import { describe, expect, it } from "vitest";

describe("Risograph art section", () => {
    it("renders the image correctly when small prop is false", () => {
        const wrapper = mount(RisographArtSection, {
            props: {
                small: false,
            },
        });

        const image = wrapper.get('[data-testid="risograph-image"]');
        expect(image.attributes("src")).toBe("/risographics/risograph.webp");
        expect(image.classes()).toContain("art-image");
        expect(wrapper.classes()).toContain("art-image-container");
    });

    it("renders the image correctly when small prop is true", () => {
        const wrapper = mount(RisographArtSection, {
            props: {
                small: true,
            },
        });

        const image = wrapper.get('[data-testid="risograph-image"]');
        expect(image.attributes("src")).toBe(
            "/risographics/risograph_small.webp"
        );
        expect(image.classes()).toContain("art-image-small");
        expect(wrapper.classes()).toContain("art-image-container-small");
    });

    it("applies the rotate style correctly when rotate prop is true", () => {
        const wrapper = mount(RisographArtSection, {
            props: {
                rotate: true,
            },
        });

        const image = wrapper.get('[data-testid="risograph-image"]');
        expect(image.attributes("style")).toContain("transform: scaley(-1);");
    });

    it("does not apply the rotate style when rotate prop is false", () => {
        const wrapper = mount(RisographArtSection, {
            props: {
                rotate: false,
            },
        });

        const image = wrapper.get('[data-testid="risograph-image"]');
        expect(image.attributes("style")).not.toContain(
            "transform: scaley(-1);"
        );
    });

    it("renders without props", () => {
        const wrapper = mount(RisographArtSection);
        const image = wrapper.get('[data-testid="risograph-image"]');
        expect(image.classes()).toContain("art-image");
        expect(wrapper.classes()).toContain("art-image-container");
    });

    it("checks the image has the correct alt attribute", () => {
        const wrapper = mount(RisographArtSection);
        const image = wrapper.get('[data-testid="risograph-image"]');
        expect(image.attributes("alt")).toBe(
            "colorful rounded forms in risographic style with the letter S and L in the center"
        );
    });

    it("checks that the image is not draggable", () => {
        const wrapper = mount(RisographArtSection);
        const image = wrapper.get('[data-testid="risograph-image"]');
        expect(image.attributes("draggable")).toBe("false");
    });
});
