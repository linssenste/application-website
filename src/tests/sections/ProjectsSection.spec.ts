import { mount, VueWrapper } from "@vue/test-utils";
import ProjectsSection from "../../views/ProjectsSection.vue";
import ProjectCard from "../../components/ProjectCard.vue";
import { describe, expect, it, vi } from "vitest";

vi.mock("vue-i18n", () => ({
    useI18n: () => ({ t: (key: string) => key }),
}));

describe("ProjectsSection", () => {
    it("renders portfolio title", () => {
        const wrapper = mount(ProjectsSection);
        const title = wrapper.find('[data-testid="portfolio-title"]');
        expect(title.exists()).toBe(true);
    });

    it("renders RisographArtSection component", () => {
        const wrapper = mount(ProjectsSection);
        const artSection = wrapper.findComponent({
            name: "RisographArtSection",
        });
        expect(artSection.exists()).toBe(true);
    });

    it("renders ProjectCard components based on projectReferences", () => {
        const wrapper = mount(ProjectsSection);
        const projectCards = wrapper.findAllComponents({ name: "ProjectCard" });

        expect(projectCards.length).toBe(wrapper.vm.projectReferences.length);
    });

    it("renders the correct number of projects", () => {
        const wrapper = mount(ProjectsSection);
        const projectCards = wrapper.findAllComponents(ProjectCard);

        expect(projectCards.length).toBe(wrapper.vm.projectReferences.length); // Assuming you have a 'projects' array in your component's data
    });

    it("scrolls to selected card when selectCard is called", async () => {
        const wrapper = mount(ProjectsSection);
        const mockScrollIntoView = vi.fn();
        document.getElementById = vi.fn(() => ({
            scrollIntoView: mockScrollIntoView,
        }));
        wrapper.vm.selectCard(1); // Assuming index 1 is valid
        expect(mockScrollIntoView).toHaveBeenCalled();
    });

    it("initially sets the focusedIndex to 0", () => {
        const wrapper = mount(ProjectsSection);
        expect(wrapper.vm.focusedIndex).toBe(0);
    });

    it("correctly positions RisographArtSection in the center", () => {
        const wrapper = mount(ProjectsSection);
        const artSection = wrapper.findComponent({
            name: "RisographArtSection",
        });
        expect(artSection.attributes("style")).toBe(
            "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
        );
    });
});
