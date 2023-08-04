import { mount, VueWrapper } from "@vue/test-utils";
import TLDRCard from "../../components/TLDRCard.vue";
import { describe, expect, it, beforeEach } from "vitest";

describe("TLDRCard.vue", () => {
    let wrapper: VueWrapper<any>;

    beforeEach(() => {
        wrapper = mount(TLDRCard);
    });

    it("renders the TL;DR text", () => {
        const tldrText = wrapper.find(".tldr-text");
        expect(tldrText.exists()).toBe(true);
        expect(tldrText.text()).toBe("TL;DR:");
    });

    it("renders the end text", () => {
        const tldrEndText = wrapper.find(".tldr-end-text");
        expect(tldrEndText.exists()).toBe(true);
        expect(tldrEndText.text()).toBe("!");
    });

    it("renders the crossout image", () => {
        const crossoutImg = wrapper.find(".crossout-img");
        expect(crossoutImg.exists()).toBe(true);
        expect(crossoutImg.attributes("src")).toBe("/src/assets/crossout.webp");
        expect(crossoutImg.attributes("alt")).toBe(
            "handdrawn crossout scribble"
        );
    });

    it("renders the spotify iframe", () => {
        const spotifyIframe = wrapper.find("iframe");
        expect(spotifyIframe.exists()).toBe(true);
        expect(spotifyIframe.attributes("src")).toBe(
            "https://open.spotify.com/embed/track/0XcC71H8QAjrW0NUqXHX1A?utm_source=generator&theme=0"
        );
        expect(spotifyIframe.attributes("title")).toBe(
            "Kraftklub - 'Ich will nicht nach Berlin' music with 'nicht' scribbled out"
        );
    });
});
