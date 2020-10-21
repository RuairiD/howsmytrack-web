import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import MainMenu from "./MainMenu";

describe("MainMenu", () => {
    it("renders LoggedInMenu and SocialLinksMenu when a username is provided, implying that the user is logged in", () => {
        const wrapper = shallow(
            <MainMenu
                onMenuClick={() => {}}
                username="username"
                rating={4.321}
                notifications={2}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders LoggedInMenu and SocialLinksMenu when a username is provided, implying that the user is logged in", () => {
        const wrapper = shallow(
            <MainMenu
                onMenuClick={() => {}}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
