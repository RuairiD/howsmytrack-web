import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { act } from "react-dom/test-utils";
import FeedbackResponse from "./FeedbackResponse";

describe("FeedbackResponse", () => {
    it("renders a piece of received feedback and a FeedbackResponseRater for that feedback", () => {
        const wrapper = shallow(
            <FeedbackResponse
                feedbackResponseId={1901}
                feedback="feedback"
                currentRating={5}
                allowReplies
                replies={3}
                unreadReplies={2}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("does not render a ViewRepliesButton if replies were not allowed by the original feedback writer", () => {
        const wrapper = shallow(
            <FeedbackResponse
                feedbackResponseId={1901}
                feedback="feedback"
                currentRating={5}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("does not render a ViewRepliesButton if the feedback has not been rated", () => {
        const wrapper = shallow(
            <FeedbackResponse
                feedbackResponseId={1901}
                feedback="feedback"
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("shows a FeedbackResponseRepliesModal when ViewRepliesButton is clicked", () => {
        const wrapper = mount(
            <FeedbackResponse
                feedbackResponseId={1901}
                feedback="feedback"
                currentRating={5}
                allowReplies
                replies={3}
                unreadReplies={2}
            />,
        );

        act(() => wrapper.find("ViewRepliesButton").get(0).props.onClick());
        wrapper.update();

        expect(wrapper.find("FeedbackResponseRepliesModal").get(0).props.isVisible).toBeTruthy();
    });

    it("hides the FeedbackResponseRepliesModal when dismissed", () => {
        const wrapper = mount(
            <FeedbackResponse
                feedbackResponseId={1901}
                feedback="feedback"
                currentRating={5}
                allowReplies
                replies={3}
                unreadReplies={2}
            />,
        );

        act(() => wrapper.find("ViewRepliesButton").get(0).props.onClick());
        wrapper.update();
        act(() => wrapper.find("FeedbackResponseRepliesModal").get(0).props.onCancel());
        wrapper.update();

        expect(wrapper.find("FeedbackResponseRepliesModal").get(0).props.isVisible).not.toBeTruthy();
    });
});
