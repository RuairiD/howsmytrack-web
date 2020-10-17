import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import PageFooter from "./PageFooter";

describe("PageFooter", () => {
    it("renders a footer section with source and website links", () => {
        const wrapper = shallow(
            <PageFooter />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
