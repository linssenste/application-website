import { describe, expect, it, beforeEach, vi } from "vitest";

import { mount, VueWrapper } from "@vue/test-utils";
import ProjectCard from "../../components/ProjectCard.vue"; // Replace with your actual component path
import { nextTick } from "vue";

vi.mock("vue-i18n", () => ({
    useI18n: () => ({ t: (key: string) => key }),
}));
describe("ProjectCard", () => {
    let wrapper: VueWrapper<any>;

    const mockData = {
        website: "https://example.com",
        github: "/linssenste/instax-link-web",
        logo: "https://example.com/logo.png",
        name: "Test Project",
        projectType: "Type 1",
        company: "Test Company",
        description: "This is a test project",
        stack: ["Vue.js", "Node.js"],
        images: [
            {
                type: 0,
                src: "https://example.com/image1.png",
                descr: "Image 1",
            },
            {
                type: 1,
                src: "https://example.com/image2.png",
                descr: "Image 2",
            },
        ],
    };

    beforeEach(() => {
        wrapper = mount(ProjectCard, {
            props: {
                index: 1,
                total: 2,
                focused: true,
                data: mockData,
            },
        });
    });

    it("should display project name", () => {
        expect(wrapper.text()).toContain(mockData.name);
    });

    it("should display project type", () => {
        expect(wrapper.text()).toContain(mockData.projectType);
    });

    it("should display project company", () => {
        expect(wrapper.text()).toContain(mockData.company);
    });

    it("should display project description", () => {
        expect(wrapper.text()).toContain(mockData.description);
    });

    it("should display project stack", () => {
        mockData.stack.forEach((tech) => {
            expect(wrapper.text()).toContain(tech);
        });
    });
    it("should emit selected event when card is clicked and not focused", async () => {
        await wrapper.setProps({ focused: false });
        await wrapper.find(".project-card").trigger("click");
        await wrapper.vm.$nextTick(); // Wait for updates
        expect(wrapper.emitted()).toHaveProperty("selected");
    });

    it("should display the correct website link", () => {
        const linkElement = wrapper.get('[data-testid="website-link"]');
        expect(linkElement.attributes().href).toBe(mockData.website);
    });
});
