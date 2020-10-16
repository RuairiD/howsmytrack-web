import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Faq from "./Faq";

describe("Faq", () => {
    it("displays a list of FAQs", () => {
        const wrapper = shallow(
            <Faq />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders individual FAQs as a List", () => {
        const wrapper = mount(
            <Faq />,
        );
        expect(wrapper.find("Item").length).toBe(11);
    });
});
