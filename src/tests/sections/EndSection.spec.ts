import { mount, VueWrapper } from "@vue/test-utils";
import EndSection from "../../views/EndSection.vue";
import TLDRCard from "../../components/TLDRCard.vue";
import { nextTick } from "vue";

import { describe, expect, it, beforeEach, vi } from "vitest";

vi.mock("vue-i18n", () => ({
    useI18n: () => ({ t: (key: string) => key }),
}));

describe("EndSection.vue", () => {
    let wrapper: VueWrapper<any>;

    beforeEach(() => {
        wrapper = mount(EndSection, {});
    });

    it("renders main-content div", () => {
        const mainContent = wrapper.find(".main-content");
        expect(mainContent.exists()).toBe(true);
    });

    it("renders text-content div", () => {
        const textContent = wrapper.find(".text-content");
        expect(textContent.exists()).toBe(true);
    });

    it("renders title-text div", () => {
        const titleText = wrapper.find(".title-text");
        expect(titleText.exists()).toBe(true);
    });

    it("renders TLDRCard", async () => {
        await nextTick();
        expect(wrapper.findComponent(TLDRCard).exists()).toBe(true);
    });
});
