import { describe, expect, afterEach, it, beforeEach, vi } from "vitest";

import { mount, VueWrapper, shallowMount } from "@vue/test-utils";
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
        logo: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Falinoplan%2Fplan_logo.webp?alt=media&token=bcb0a501-04a2-4dad-93ab-4b4f05f35cb5",
        name: "Test Project",
        projectType: "Type 1",
        company: "Test Company",
        description: "This is a test project",
        stack: ["Vue.js", "Node.js"],
        images: [
            {
                type: 0,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Falinoplan%2Fplan_logo.webp?alt=media&token=bcb0a501-04a2-4dad-93ab-4b4f05f35cb5",
                descr: "Image 1",
            },
            {
                type: 1,
                src: "https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/application%2Falinoplan%2Fplan_logo.webp?alt=media&token=bcb0a501-04a2-4dad-93ab-4b4f05f35cb5",
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

    const createComponent = (propsData) => {
        wrapper = shallowMount(ProjectCard, { propsData });
    };

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

    it("should display project name", () => {
        const projectName = wrapper.find(".text-highlight-blue.key-value");
        expect(projectName.text()).toBe(mockData.name);
    });

    it("should have correct GitHub link", () => {
        const githubLink = wrapper.find('[data-testid="github-link"] a');
        console.log(githubLink.attributes());
        expect(githubLink.attributes("href")).toBe(
            "https://github.com" + mockData.github
        );
    });

    it("should display project logo", () => {
        const projectLogo = wrapper.find(".portfolio-logo img");
        expect(projectLogo.attributes("src")).toBe(mockData.logo);
    });
    it('calls switchEvent function and emits "selected" event', async () => {
        wrapper.vm.switchEvent(2);
        await nextTick();
        expect(wrapper.emitted().selected[0]).toEqual([2]);
    });

    it('does not emit "selected" event when card is clicked and focused', async () => {
        await wrapper.find(".project-card").trigger("click");
        await nextTick();
        expect(wrapper.emitted().selected).toBeUndefined();
    });

    it("emits 'selected' when cardClickedEvent is called and props.focused is false", async () => {
        wrapper.setProps({ focused: false });
        await wrapper.vm.$nextTick();
        wrapper.vm.cardClickedEvent();
        expect(wrapper.emitted().selected).toBeTruthy();
    });

    it("does not emit 'selected' when cardClickedEvent is called and props.focused is true", async () => {
        wrapper.setProps({ focused: true });
        await wrapper.vm.$nextTick();
        wrapper.vm.cardClickedEvent();
        expect(wrapper.emitted().selected).toBeFalsy();
    });

    it("should check isMobile computed property for screens less than 800px width", () => {
        Object.defineProperty(window, "innerWidth", {
            writable: true,
            configurable: true,
            value: 700,
        });
        createComponent({
            data: mockData,
            index: 1,
            total: 2,
            focused: true,
        });
        expect(wrapper.vm.isMobile).toBe(true);
        // wrapper.destroy();
    });

    it("should check isMobile computed property for screens greater than or equal to 800px width", () => {
        Object.defineProperty(window, "innerWidth", {
            writable: true,
            configurable: true,
            value: 810,
        });
        createComponent({
            data: mockData,
            index: 1,
            total: 2,
            focused: true,
        });
        expect(wrapper.vm.isMobile).toBe(false);
    });

    it('should emit "selected" event with index decreased by 1 when left switch button is clicked', async () => {
        createComponent({
            index: 2,
            total: 4,
            focused: true,
            data: mockData,
        });
        await wrapper.find(".left-button").trigger("click");
        expect(wrapper.emitted().selected).toBeTruthy();
        expect(wrapper.emitted().selected[0]).toEqual([0]); // assuming your component emits index-1
    });

    it('should emit "selected" event with index increased by 1 when right switch button is clicked', async () => {
        createComponent({
            index: 2,
            total: 4,
            focused: true,
            data: mockData,
        });
        await wrapper.find(".right-button").trigger("click");
        expect(wrapper.emitted().selected).toBeTruthy();
        expect(wrapper.emitted().selected[0]).toEqual([2]); // assuming your component emits index+1
    });

    it("should render all provided project images", () => {
        mockData.images.forEach((img) => {
            const imgElement = wrapper.find(`img[src="${img.src}"]`);
            expect(imgElement.exists()).toBe(true);
        });
    });

    it("should not display website link if not provided", () => {
        createComponent({
            index: 1,
            total: 2,
            focused: true,
            data: { ...mockData, website: null },
        });
        const linkElement = wrapper.find('[data-testid="website-link"]');
        expect(linkElement.exists()).toBe(false);
    });

    it("should not display GitHub link if not provided", () => {
        createComponent({
            index: 1,
            total: 2,
            focused: true,
            data: { ...mockData, github: null },
        });
        const githubElement = wrapper.find('[data-testid="github-link"]');
        expect(githubElement.exists()).toBe(false);
    });
});
