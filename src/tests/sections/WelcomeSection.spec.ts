import { mount, VueWrapper } from "@vue/test-utils";
import WelcomeSection from "../../views/WelcomeSection.vue";
import PolaroidImage from "../../components/PolaroidImage.vue";
import { nextTick } from "vue";
import { describe, expect, it, beforeEach, vi } from "vitest";

vi.mock("vue-i18n", () => ({
    useI18n: () => ({ t: (key: string) => key }),
}));

describe("WelcomeSection.vue", () => {
    let wrapper: VueWrapper<any>;

    beforeEach(() => {
        wrapper = mount(WelcomeSection, {
            global: {
                components: {
                    PolaroidImage,
                },
            },
        });
    });

    const testCases = [
        { id: "personal-image", msg: "renders personal image" },
        {
            id: "personal-image-polaroid",
            msg: "renders polaroid image",
            isComponent: true,
        },
        {
            id: "welcoming-phrase",
            msg: "renders welcome header",
            textContains: "welcome.hello",
        },
        { id: "description-text", msg: "renders about me description" },
        {
            id: "welcome-music-container",
            msg: "renders welcome music container",
        },
    ];

    for (const { id, msg, isComponent, textContains } of testCases) {
        it(msg, () => {
            const target = isComponent
                ? wrapper.findComponent(PolaroidImage)
                : wrapper.find(`[data-testid="${id}"]`);
            expect(target.exists()).toBe(true);
            if (textContains) {
                expect(target.text()).toContain(textContains);
            }
        });
    }

    it("renders name in welcome phrase if provided", async () => {
        wrapper.vm.name = "Test";
        await nextTick();
        const welcomePhrase = wrapper.find('[data-testid="welcoming-phrase"]');
        expect(welcomePhrase.text()).toContain("Test");
    });

    it("does not render name in welcome phrase if not provided", async () => {
        wrapper.vm.name = "";
        await nextTick();
        const welcomePhrase = wrapper.find('[data-testid="welcoming-phrase"]');
        expect(welcomePhrase.text()).not.toContain("Test");
    });

    it("renders 'Steffen' in the welcome phrase", () => {
        const welcomePhrase = wrapper.find('[data-testid="welcoming-phrase"]');
        expect(welcomePhrase.text()).toContain("Steffen");
    });

    it("displays the welcome music with correct source", () => {
        const welcomeMusicContainer = wrapper.find(
            '[data-testid="welcome-music-container"]'
        );
        const welcomeMusicSrc = welcomeMusicContainer
            .find("iframe")
            .attributes("src");
        expect(welcomeMusicSrc).toContain(
            `https://open.spotify.com/embed/track/${wrapper.vm.t(
                "welcome.welcomeMusicId"
            )}?utm_source=generator&theme=1`
        );
    });

    it("renders the introduction text", () => {
        const descriptionText = wrapper.find(
            '[data-testid="description-text"]'
        );
        expect(descriptionText.text()).toContain(
            wrapper.vm.t("welcome.introduction")
        );
    });
});
