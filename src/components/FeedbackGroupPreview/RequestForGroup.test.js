import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import RequestForGroup from "./RequestForGroup";

describe("RequestForGroup", () => {
    it("renders an inline feedback request media preview", () => {
        const wrapper = shallow(
            <RequestForGroup
                mediaUrl="mediaUrl"
                mediaType="mediaType"
            />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders a trackless inline feedback request preview", () => {
        const wrapper = shallow(
            <RequestForGroup />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
