import React from "react";
import { shallow } from "enzyme";
import FaqPage from "./FaqPage";

describe("FaqPage", () => {
    it("renders a GenericPage containing a Faq", () => {
        const wrapper = shallow(
            <FaqPage isMobile={false} />,
        );

        expect(wrapper.find("GenericPage").get(0).props.title).toBe("Frequently Asked Questions");
        expect(wrapper.find("GenericPage").get(0).props.isMobile).toBe(false);
        expect(wrapper.find("GenericPage Faq").length).toBe(1);
    });
});
