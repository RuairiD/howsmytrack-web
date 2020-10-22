import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import UnwrappedRegisterForm from "./UnwrappedRegisterForm";

jest.mock("../../apiRoot", () => "http://localhost:8000");

const mockValidForm = {
    getFieldDecorator: jest.fn(() => (c) => c),
    validateFieldsAndScroll: jest.fn((afterValidation) => afterValidation(false, {
        success: true,
        error: null,
    })),
};

describe("UnwrappedRegisterForm", () => {
    it("renders a blank form for registering a new account", () => {
        const wrapper = shallow(
            <UnwrappedRegisterForm
                form={mockValidForm}
                onSubmit={() => {}}
            />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("disables Submit button if disabled is set (e.g. if request is loading or form has already been submitted)", () => {
        const wrapper = shallow(
            <UnwrappedRegisterForm
                form={mockValidForm}
                onSubmit={() => {}}
                disabled
            />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
