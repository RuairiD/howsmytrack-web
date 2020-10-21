import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import LoggedOutMenu from "./LoggedOutMenu";

describe("LoggedOutMenu", () => {
    it("renders menu for logged out users with Sign In, Register and FAQ options", () => {
        const wrapper = shallow(
            <LoggedOutMenu
                onMenuClick={() => {}}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
