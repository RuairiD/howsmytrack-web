import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { act } from "react-dom/test-utils";
import UnwrappedLoginForm from "./UnwrappedLoginForm";

jest.mock("../../apiRoot", () => "http://localhost:8000");

const mockValidForm = {
    getFieldDecorator: jest.fn(() => (c) => c),
    validateFieldsAndScroll: jest.fn((afterValidation) => afterValidation(false, {
        username: "username",
        password: "password",
    })),
};

describe("UnwrappedLoginForm", () => {
    it("renders a blank form for logging in on pageload", () => {
        const wrapper = shallow(
            <UnwrappedLoginForm
                form={mockValidForm}
                onSubmit={() => {}}
            />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders an additional registration button if showRegisterButton is provided", () => {
        const wrapper = shallow(
            <UnwrappedLoginForm
                form={mockValidForm}
                onSubmit={() => {}}
                showRegisterButton
            />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("shows a RegisterModal if the registration button is clicked", () => {
        const wrapper = mount(
            <UnwrappedLoginForm
                form={mockValidForm}
                onSubmit={() => {}}
                showRegisterButton
            />,
        );

        act(() => wrapper.find("Button").get(1).props.onClick());

        wrapper.update();
        expect(wrapper.find("RegisterModal").get(0).props.isVisible).toBeTruthy();

        act(() => wrapper.find("RegisterModal").get(0).props.onCancel());
        wrapper.update();

        expect(wrapper.find("RegisterModal").get(0).props.isVisible).not.toBeTruthy();
    });

    it("renders large buttons if largeButtons is true", () => {
        const wrapper = shallow(
            <UnwrappedLoginForm
                form={mockValidForm}
                onSubmit={() => {}}
                showRegisterButton
                largeButtons
            />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
