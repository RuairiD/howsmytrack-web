import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import FeedbackRequestSummaryContent from "./FeedbackRequestSummaryContent";

describe("FeedbackRequestSummaryContent", () => {
    it("renders a FeedbackRequestSummaryMedia and genre for a trackless request", () => {
        const wrapper = shallow(
            <FeedbackRequestSummaryContent
                feedbackRequestSummary={{
                    genre: "genre",
                }}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders a FeedbackRequestSummaryMedia without a feedback prompt, if one is not provided", () => {
        const wrapper = shallow(
            <FeedbackRequestSummaryContent
                feedbackRequestSummary={{
                    genre: "genre",
                    mediaUrl: "mediaUrl",
                }}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders a FeedbackRequestSummaryMedia and feedback prompt, if one is provided", () => {
        const wrapper = shallow(
            <FeedbackRequestSummaryContent
                feedbackRequestSummary={{
                    genre: "genre",
                    mediaUrl: "mediaUrl",
                    feedbackPrompt: "feedbackPrompt",
                }}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
