import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import LandingPitch from "./LandingPitch";

jest.mock("react-ga");

describe("LandingPitch", () => {
    it("renders a login form, along with an explanation of how the site works", () => {
        const wrapper = shallow(
            <LandingPitch />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
