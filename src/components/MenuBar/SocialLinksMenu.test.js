import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import SocialLinksMenu from "./SocialLinksMenu";

describe("SocialLinksMenu", () => {
    it("renders Twitter and Discord links within a Menu", () => {
        const wrapper = shallow(
            <SocialLinksMenu
                onMenuClick={() => {}}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders without absolute positioning and includes an additional Divider for mobile clients", () => {
        const wrapper = shallow(
            <SocialLinksMenu
                isMobile
                onMenuClick={() => {}}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
