import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import MenuBar from "./MenuBar";

describe("MenuBar", () => {
    it("renders MenuBarContent within an Affix for non-mobile clients", () => {
        const wrapper = shallow(
            <MenuBar />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders solo MenuBarContent mobile clients", () => {
        const wrapper = shallow(
            <MenuBar isMobile />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
