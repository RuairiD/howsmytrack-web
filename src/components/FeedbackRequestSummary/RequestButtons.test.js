import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import RequestButtons from "./RequestButtons";

describe("RequestButtons", () => {
    it("renders edit and delete buttons with a warning for deleting a request", () => {
        const wrapper = shallow(
            <RequestButtons
                mediaUrl="mediaUrl"
                onEditClick={() => {}}
                onDelete={() => {}}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders edit and delete buttons with a gentler warning for deleting a trackless request", () => {
        const wrapper = shallow(
            <RequestButtons
                onEditClick={() => {}}
                onDelete={() => {}}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
