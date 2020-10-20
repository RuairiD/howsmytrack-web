import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import FeedbackGroup from "./FeedbackGroup";

jest.mock("react-ga");

describe("FeedbackGroup", () => {
    it("renders an error state if user has no response forms (implies the user isn't a member this group)", () => {
        const wrapper = shallow(
            <FeedbackGroup
                feedbackResponseForms={null}
                feedbackRequestSummary={null}
                feedbackReceived={null}
            />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders a List of FeedbackResponseForms for each of user's response forms, but doesn't render a FeedbackGroupRequest for a trackless request", () => {
        const wrapper = shallow(
            <FeedbackGroup
                feedbackResponseForms={[
                    {
                        feedbackResponseId: 1901,
                        currentFeedback: "currentFeedback",
                        mediaUrl: "mediaUrl",
                        mediaType: "mediaType",
                        feedbackPrompt: "feedbackPrompt",
                        alreadySubmitted: true,
                        currentAllowReplies: true,
                        replies: 5,
                        unreadReplies: 4,
                    },
                ]}
                feedbackRequestSummary={{
                    feedbackRequestId: 1901,
                    mediaUrl: null,
                    mediaType: null,
                    feedbackPrompt: null,
                    emailWhenGrouped: false,
                    genre: "genre",
                }}
                feedbackReceived={null}
            />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders a List of FeedbackResponseForms for each of user's response forms and the original request with the track", () => {
        const wrapper = shallow(
            <FeedbackGroup
                feedbackResponseForms={[
                    {
                        feedbackResponseId: 1901,
                        currentFeedback: "currentFeedback",
                        mediaUrl: "mediaUrl",
                        mediaType: "mediaType",
                        feedbackPrompt: "feedbackPrompt",
                        alreadySubmitted: true,
                        currentAllowReplies: true,
                        replies: 5,
                        unreadReplies: 4,
                    },
                ]}
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

    it("renders individual FeedbackResponseForms", () => {
        const wrapper = mount(
            <FeedbackGroup
                feedbackResponseForms={[
                    {
                        feedbackResponseId: 1901,
                        currentFeedback: "currentFeedback",
                        mediaUrl: "mediaUrl",
                        mediaType: "mediaType",
                        feedbackPrompt: "feedbackPrompt",
                        alreadySubmitted: true,
                        currentAllowReplies: true,
                        replies: 5,
                        unreadReplies: 4,
                    },
                ]}
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

        expect(wrapper.find("FeedbackResponseForm").length).toBe(1);
    });
});
