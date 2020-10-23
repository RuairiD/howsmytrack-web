import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import MissingGenreMessage from "./MissingGenreMessage";

describe("MissingGenreMessage", () => {
    it("renders an error message for a trackless request", () => {
        const wrapper = shallow(
            <MissingGenreMessage
                isRequestTrackless
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders an error message for a request with a track", () => {
        const wrapper = shallow(
            <MissingGenreMessage />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
