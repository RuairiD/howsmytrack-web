import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import RegisterModal from "./RegisterModal";

describe("RegisterModal", () => {
    it("renders a Modal containing a RegisterForm", () => {
        const onCancel = () => {};
        const wrapper = shallow(
            <RegisterModal
                onCancel={onCancel}
                isVisible
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
