import { mount, VueWrapper } from "@vue/test-utils";
import FavoriteMusicSection from "../../views/FavoriteMusicSection.vue";
import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("vue-i18n", () => ({
    useI18n: () => ({ t: (key: string) => key }),
}));

describe("FavoriteMusicSection.vue", () => {
    let wrapper: VueWrapper<any>;

    beforeEach(() => {
        wrapper = mount(FavoriteMusicSection, {});
    });

    it("should render without crashing", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("should show album covers", () => {
        const coverImages = wrapper.findAll(".cover");
        expect(coverImages.length).toBeGreaterThan(0);
    });

    it("should start with no song selected", () => {
        expect(wrapper.vm.songId).toBeNull();
    });

    it("should select a song when an album cover is clicked", async () => {
        const coverImages = wrapper.findAll(".cover");
        await (coverImages as any).at(0).trigger("click");
        expect(wrapper.vm.songId).not.toBeNull();
    });

    it("should change song when shuffle is clicked", async () => {
        await wrapper.find(".shuffle-button").trigger("click");
        expect(wrapper.vm.songId).not.toBeNull();
    });

    it("should select a song from the favoriteSongsList on selectFavoriteSong() method call", async () => {
        // Simulate a call to selectFavoriteSong method with a valid id.
        await wrapper.vm.selectFavoriteSong(3);

        // Expect songId to have changed.
        expect(wrapper.vm.songId).toBe("2cGJrMY1TxKn66h6d76wc0");
    });

    it("should select a random song on randomSong() method call", async () => {
        // Record the initial songId.
        const initialSongId = wrapper.vm.songId;

        // Simulate a call to randomSong method.
        await wrapper.vm.randomSong();

        expect(wrapper.vm.songId).not.toBe(initialSongId);
    });
});
