import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import ReceivedFeedback from "./ReceivedFeedback";

describe("ReceivedFeedback", () => {
    it("renders an error state if feedback is null (implying user hasn't written their own feedback yet)", () => {
        const wrapper = shallow(
            <ReceivedFeedback
                feedbackReceived={null}
            />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders an empty state if no feedback is provided", () => {
        const wrapper = shallow(
            <ReceivedFeedback
                feedbackReceived={[]}
            />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders a list of feedback, if feedback is provided", () => {
        const wrapper = shallow(
            <ReceivedFeedback
                feedbackReceived={[
                    {
                        feedbackResponseId: 1901,
                        feedback: "pretty good",
                        currentRating: 5,
                        allowReplies: false,
                        replies: 3,
                        unreadReplies: 2,
                    },
                ]}
            />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders individual FeedbackResponse items", () => {
        const wrapper = mount(
            <ReceivedFeedback
                feedbackReceived={[
                    {
                        feedbackResponseId: 1901,
                        feedback: "pretty good",
                        currentRating: 5,
                        allowReplies: false,
                        replies: 3,
                        unreadReplies: 2,
                    },
                ]}
            />,
        );

        expect(wrapper.find("FeedbackResponse").length).toBe(1);
    });
});
