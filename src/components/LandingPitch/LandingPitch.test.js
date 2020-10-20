import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { act } from "react-dom/test-utils";
import LandingPitch from "./LandingPitch";

jest.mock("react-ga");

describe("LandingPitch", () => {
    it("renders login and register buttons, along with an explanation of how the site works", () => {
        const wrapper = shallow(
            <LandingPitch />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("shows a LoginModal when Sign In button is clicked, and hides it when dismissed", () => {
        const wrapper = mount(
            <LandingPitch />,
        );

        act(() => wrapper.find("Button").get(1).props.onClick());

        wrapper.update();
        expect(wrapper.find("LoginModal").get(0).props.isVisible).toBeTruthy();

        act(() => wrapper.find("LoginModal").get(0).props.onCancel());
        wrapper.update();

        expect(wrapper.find("LoginModal").get(0).props.isVisible).not.toBeTruthy();
    });

    it("shows a RegisterModal when Register button is clicked, and hides it when dismissed", () => {
        const wrapper = mount(
            <LandingPitch />,
        );

        act(() => wrapper.find("Button").get(0).props.onClick());

        wrapper.update();
        expect(wrapper.find("RegisterModal").get(0).props.isVisible).toBeTruthy();

        act(() => wrapper.find("RegisterModal").get(0).props.onCancel());
        wrapper.update();

        expect(wrapper.find("RegisterModal").get(0).props.isVisible).not.toBeTruthy();
    });
});
