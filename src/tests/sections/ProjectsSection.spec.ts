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
        console.log(projectCards.length);
        expect(projectCards.length).toBe(wrapper.vm.projectReferences.length); // Assuming you have a 'projects' array in your component's data
    });
});
