import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import LoadingSpinner from "./LoadingSpinner";

describe("LoadingSpinner", () => {
    it("renders a Spin", () => {
        const wrapper = shallow(
            <LoadingSpinner />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
