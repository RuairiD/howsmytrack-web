import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import CardExtra from "./CardExtra";

describe("CardExtra", () => {
    it("renders the footer for a FeedbackGroupPreview with the formatted date", () => {
        const wrapper = shallow(
            <CardExtra timeCreated={123456} />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
