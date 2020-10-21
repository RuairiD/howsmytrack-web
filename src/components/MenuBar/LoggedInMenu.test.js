import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import LoggedInMenu from "./LoggedInMenu";

describe("LoggedInMenu", () => {
    it("renders menu for logged in users with New Request, Your Groups, FAQ, Settings and Sign Out options", () => {
        const wrapper = shallow(
            <LoggedInMenu
                onMenuClick={() => {}}
                username="username"
                rating={4.321}
                notifications={2}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
