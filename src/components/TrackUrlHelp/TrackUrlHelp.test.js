import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import TrackUrlHelp from "./TrackUrlHelp";

describe("TrackUrlHelp", () => {
    it("displays a help page for finding the user's track's url", () => {
        const wrapper = shallow(
            <TrackUrlHelp />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders individual platform's instructions in the list", () => {
        const wrapper = mount(
            <TrackUrlHelp />,
        );
        expect(wrapper.find("Item").length).toBe(4);
    });
});
