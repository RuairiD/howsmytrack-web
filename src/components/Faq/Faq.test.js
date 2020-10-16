import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Faq from "./Faq";

describe("Faq", () => {
    it("displays a list of FAQs", () => {
        const wrapper = shallow(
            <Faq />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
