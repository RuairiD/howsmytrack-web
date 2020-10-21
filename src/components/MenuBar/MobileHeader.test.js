import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import MobileHeader from "./MobileHeader";

describe("MobileHeader", () => {
    it("renders notifications Badge when relevant menu is collapsed", () => {
        const wrapper = shallow(
            <MobileHeader
                mobileMenuCollapsed
                notifications={2}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("does not render notifications Badge when relevant menu is open", () => {
        const wrapper = shallow(
            <MobileHeader
                notifications={2}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
