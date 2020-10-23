import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import TracklessRadioGroup from "./TracklessRadioGroup";

describe("TracklessRadioGroup", () => {
    it("renders a RadioGroup for selecting whether the request is trackless or not", () => {
        const wrapper = shallow(
            <TracklessRadioGroup
                decorator={(x) => x}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
