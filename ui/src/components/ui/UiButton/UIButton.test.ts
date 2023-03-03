import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import UiButton from "./UiButton.vue";

describe("UIButton", () => {
    it("Renders primary button", () => {
        const comp = mount(UiButton, {
            props: { variant: "primary" },
            slots: { default: "Test Button" }
        });

        expect(comp.element).toMatchSnapshot();
    });

    it("Renders secondary button", () => {
        const comp = mount(UiButton, {
            props: { variant: "secondary" },
            slots: { default: "Test Button" }
        });

        expect(comp.element).toMatchSnapshot();
    });

    it("Renders circular button", () => {
        const comp = mount(UiButton, {
            props: { circular: true },
            slots: { default: "Test Button" }
        });

        expect(comp.element).toMatchSnapshot();
    });

    it("Renders icon button", () => {
        const comp = mount(UiButton, {
            props: { icon: true },
            slots: { default: "Test Button" }
        });

        expect(comp.element).toMatchSnapshot();
    });

    it("Renders the correct slot content", () => {
        const comp = mount(UiButton, {
            props: { icon: true },
            slots: { default: "A Great Button" }
        });

        expect(comp.text()).toBe("A Great Button");
        expect(comp.element).toMatchSnapshot();
    });
});
