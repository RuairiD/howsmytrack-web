import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { act } from "react-dom/test-utils";
import MenuBarContent from "./MenuBarContent";

describe("MenuBarContent", () => {
    it("renders logo and MainMenu for non-mobile clients", () => {
        const wrapper = shallow(
            <MenuBarContent />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders a MobileMenu for mobile clients", () => {
        const wrapper = shallow(
            <MenuBarContent isMobile />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("keeps track of menu collapsed state on mobile clients", () => {
        const wrapper = mount(
            <MenuBarContent isMobile />,
        );

        act(() => wrapper.find("MobileMenu").get(0).props.onCollapseChange([]));
        wrapper.update();
        expect(wrapper.find("MobileMenu").get(0).props.mobileMenuCollapsed).toBeTruthy();

        act(() => wrapper.find("MobileMenu").get(0).props.onCollapseChange([1]));
        wrapper.update();
        expect(wrapper.find("MobileMenu").get(0).props.mobileMenuCollapsed).not.toBeTruthy();
    });
});
