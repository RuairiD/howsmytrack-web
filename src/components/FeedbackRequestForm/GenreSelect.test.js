import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import GenreSelect from "./GenreSelect";

describe("GenreSelect", () => {
    it("renders a Select containing all available genre options", () => {
        const wrapper = shallow(
            <GenreSelect
                decorator={(x) => x}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
