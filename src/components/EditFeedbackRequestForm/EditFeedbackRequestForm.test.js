import React from "react";
import { mount } from "enzyme";
import axios from "axios";
import EditFeedbackRequestForm from "./EditFeedbackRequestForm";

jest.mock("react-ga");
jest.mock("axios");

describe("EditFeedbackRequestForm", () => {
    it("renders a wrapped FeedbackRequestForm with the appropriate callback props", async () => {
        const wrapper = mount(
            <EditFeedbackRequestForm
                feedbackRequestId={1901}
                mediaUrl="https://soundcloud.com/ruairidx/grey"
                feedbackPrompt="feedbackPrompt"
                emailWhenGrouped
            />,
        );

        expect(wrapper.find("FeedbackRequestForm").length).toBe(1);
        expect(wrapper.find("FeedbackRequestForm").get(0).props.emailWhenGrouped).toBe(true);
        expect(wrapper.find("FeedbackRequestForm").get(0).props.feedbackRequestId).toBe(1901);
        expect(wrapper.find("FeedbackRequestForm").get(0).props.feedbackPrompt).toBe("feedbackPrompt");
        expect(wrapper.find("FeedbackRequestForm").get(0).props.mediaUrl).toBe("https://soundcloud.com/ruairidx/grey");
        expect(wrapper.find("FeedbackRequestForm").get(0).props.trackless).toBe(false);
        expect(wrapper.find("FeedbackRequestForm").get(0).props.responseName).toBe("editFeedbackRequest");
        expect(wrapper.find("FeedbackRequestForm").get(0).props.gaCategory).toBe("editFeedbackRequest");
        expect(wrapper.find("FeedbackRequestForm").get(0).props.form).toBeTruthy();

        // Clear the existing call made to fetch mediaInfo within FeedbackRequestForm
        axios.post.mockRestore();
        wrapper.find("FeedbackRequestForm").get(0).props.makeRequest();
        expect(axios.post.mock.calls.length).toBe(1);
    });
});
