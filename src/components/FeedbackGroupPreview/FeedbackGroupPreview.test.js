import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import FeedbackGroupPreview from "./FeedbackGroupPreview";

describe("FeedbackGroupPreview", () => {
    it("displays a feedback group's preview, including a media preview", () => {
        const wrapper = shallow(
            <FeedbackGroupPreview
                feedbackGroupId={1901}
                name="name"
                timeCreated={123456}
                feedbackRequestSummary={{
                    feedbackRequestId: 808,
                    mediaUrl: "mediaUrl",
                    mediaType: "mediaType",
                    feedbackPrompt: "feedbackPrompt",
                    emailWhenGrouped: false,
                    genre: "genre",
                }}
                userCount={4}
                tracklessUserCount={1}
                userFeedbackCount={3}
                feedbackResponseCount={3}
                unreadReplies={2}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("displays a feedback group's preview for a trackless request without media", () => {
        const wrapper = shallow(
            <FeedbackGroupPreview
                feedbackGroupId={1901}
                name="name"
                timeCreated={123456}
                feedbackRequestSummary={{
                    feedbackRequestId: 808,
                    mediaUrl: null,
                    mediaType: null,
                    feedbackPrompt: null,
                    emailWhenGrouped: false,
                    genre: "genre",
                }}
                userCount={4}
                tracklessUserCount={null}
                userFeedbackCount={3}
                feedbackResponseCount={3}
                unreadReplies={2}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("formats counts for Progress meters", () => {
        const wrapper = mount(
            <FeedbackGroupPreview
                feedbackGroupId={1901}
                name="name"
                timeCreated={123456}
                feedbackRequestSummary={{
                    feedbackRequestId: 808,
                    mediaUrl: "mediaUrl",
                    mediaType: "mediaType",
                    feedbackPrompt: "feedbackPrompt",
                    emailWhenGrouped: false,
                    genre: "genre",
                }}
                userCount={4}
                tracklessUserCount={1}
                userFeedbackCount={3}
                feedbackResponseCount={2}
                unreadReplies={2}
            />,
        );

        expect(wrapper.find("Progress").length).toBe(2);
        expect(wrapper.find("Progress").get(0).props.percent).toBe(75);
        expect(wrapper.find("Progress").get(0).props.format()).toBe("3/4");
        expect(wrapper.find("Progress").get(1).props.percent).toBe(40);
        expect(wrapper.find("Progress").get(1).props.format()).toBe("2/5");
    });
});
