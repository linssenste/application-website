import { mount } from "@vue/test-utils";
import InstagramMusicSection from "../../views/InstagramMusicSection.vue";
import { describe, expect, it, vi } from "vitest";

vi.mock("vue-i18n", () => ({
    useI18n: () => ({ t: (key: string) => key }),
}));

describe("Instagram music links", () => {
    it("renders video element", () => {
        const wrapper = mount(InstagramMusicSection);
        expect(wrapper.find("video").exists()).toBe(true);
    });

    it("renders decorative image", () => {
        const wrapper = mount(InstagramMusicSection);
        expect(wrapper.find(".video-decorative").exists()).toBe(true);
    });

    it("renders Instagram feed", () => {
        const wrapper = mount(InstagramMusicSection);
        expect(wrapper.find(".instagram-feed").exists()).toBe(true);
    });

    it("renders Instagram posts", () => {
        const wrapper = mount(InstagramMusicSection);
        const posts = wrapper.findAll(".img-link");
        expect(posts.length).toBe(9); // There are 9 Instagram posts
    });

    it("renders the Spotify iframe", () => {
        const wrapper = mount(InstagramMusicSection);
        expect(wrapper.find(".music-instagram iframe").exists()).toBe(true);
    });
});
