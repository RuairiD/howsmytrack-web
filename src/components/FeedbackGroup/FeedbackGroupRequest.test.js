import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import FeedbackGroupRequest from "./FeedbackGroupRequest";

describe("FeedbackGroupRequest", () => {
    it("renders a FeedbackRequestSummary and ReceivedFeedback for the given request", () => {
        const wrapper = shallow(
            <FeedbackGroupRequest
                feedbackRequestSummary={{
                    feedbackRequestId: 1901,
                    mediaUrl: "mediaUrl",
                    mediaType: "mediaType",
                    feedbackPrompt: "feedbackPrompt",
                    emailWhenGrouped: false,
                    genre: "genre",
                }}
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
});
