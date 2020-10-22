import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import FeedbackRequestModal from "./FeedbackRequestModal";

describe("FeedbackRequestModal", () => {
    it("renders a Modal containing a CreateFeedbackRequestForm", () => {
        const onCancel = () => {};
        const wrapper = shallow(
            <FeedbackRequestModal
                onCancel={onCancel}
                isVisible
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
