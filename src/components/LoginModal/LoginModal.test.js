import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import LoginModal from "./LoginModal";

describe("LoginModal", () => {
    it("renders a Modal containing a LoginForm", () => {
        const onCancel = () => {};
        const wrapper = shallow(
            <LoginModal
                onCancel={onCancel}
                isVisible
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
