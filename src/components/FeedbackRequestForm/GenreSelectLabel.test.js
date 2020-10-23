import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import GenreSelectLabel from "./GenreSelectLabel";

describe("GenreSelectLabel", () => {
    it("renders a label for a GenreSelect, including informational tooltip", () => {
        const wrapper = shallow(
            <GenreSelectLabel />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
