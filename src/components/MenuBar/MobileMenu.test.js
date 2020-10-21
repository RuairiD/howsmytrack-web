import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import MobileMenu from "./MobileMenu";

describe("MobileMenu", () => {
    it("renders a MainMenu within a Collapse to allow mobile users to show/hide the menu at will", () => {
        const wrapper = shallow(
            <MobileMenu
                onMenuClick={() => {}}
                username="username"
                rating={4.321}
                notifications={2}
                onCollapseChange={() => {}}
                mobileMenuCollapsed
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders an unrotated menu icon in the Collapse header when collapsed", () => {
        const wrapper = mount(
            <MobileMenu
                onMenuClick={() => {}}
                username="username"
                rating={4.321}
                notifications={2}
                onCollapseChange={() => {}}
                mobileMenuCollapsed
            />,
        );

        expect(wrapper.find("Collapse").get(0).props.expandIcon({ isActive: false }).props.rotate).toBe(0);
    });

    it("renders a rotated menu icon in the Collapse header when uncollapsed", () => {
        const wrapper = mount(
            <MobileMenu
                onMenuClick={() => {}}
                username="username"
                rating={4.321}
                notifications={2}
                onCollapseChange={() => {}}
                mobileMenuCollapsed
            />,
        );

        expect(wrapper.find("Collapse").get(0).props.expandIcon({ isActive: true }).props.rotate).toBe(90);
    });
});
