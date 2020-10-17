import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import PageSidebar from "./PageSidebar";

describe("PageSidebar", () => {
    it("renders a sidebar menu with width relative to the screen size", () => {
        Object.defineProperty(
            window.screen,
            "width",
            {
                value: 780,
                writable: true,
                configurable: true,
            },
        );

        const wrapper = shallow(
            <PageSidebar />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("does not render a sidebar narrower than 200px", () => {
        Object.defineProperty(
            window.screen,
            "width",
            {
                value: 640,
                writable: true,
                configurable: true,
            },
        );

        const wrapper = shallow(
            <PageSidebar />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("does not render a sidebar wider than 256px", () => {
        Object.defineProperty(
            window.screen,
            "width",
            {
                value: 1980,
                writable: true,
                configurable: true,
            },
        );

        const wrapper = shallow(
            <PageSidebar />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
