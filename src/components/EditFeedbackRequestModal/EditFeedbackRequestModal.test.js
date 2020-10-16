import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import EditFeedbackRequestModal from "./EditFeedbackRequestModal";

describe("EditFeedbackRequestModal", () => {
    it("renders a Modal containing an EditFeedbackRequest", () => {
        const onCancel = () => {};
        const wrapper = shallow(
            <EditFeedbackRequestModal
                onCancel={onCancel}
                isVisible
                feedbackRequestId={1901}
                mediaUrl="https://soundcloud.com/ruairidx/sturzflug"
                feedbackPrompt="jery get ipad"
                emailWhenGrouped
                genre="electronic"
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
