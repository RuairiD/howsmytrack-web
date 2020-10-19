import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
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
});
