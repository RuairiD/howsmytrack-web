import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import waitForExpect from "wait-for-expect";
import { act } from "react-dom/test-utils";
import axios from "axios";
import FeedbackResponseForm from "./FeedbackResponseForm";

jest.mock("axios");
jest.mock("react-ga");

describe("FeedbackResponseForm", () => {
    it("renders an empty textfield for writing feedback", () => {
        const wrapper = shallow(
            <FeedbackResponseForm
                feedbackResponseId={1901}
                mediaUrl="mediaUrl"
                mediaType="mediaType"
                feedbackPrompt="feedbackPrompt"
            />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("posts the feedback once it has been written and submitted, disables the form and shows a ViewRepliesButton after", async () => {
        axios.post.mockResolvedValue({
            data: {
                data: {
                    submitFeedbackResponse: {
                        success: true,
                        error: null,
                    },
                },
            },
        });

        const wrapper = mount(
            <FeedbackResponseForm
                feedbackResponseId={1901}
                mediaUrl="mediaUrl"
                mediaType="mediaType"
                feedbackPrompt="feedbackPrompt"
            />,
        );

        act(() => wrapper.find("TextArea").get(0).props.onChange({
            target: {
                value: "feedback",
            },
        }));
        act(() => wrapper.find("Checkbox").get(0).props.onChange({
            target: {
                checked: true,
            },
        }));
        await act(async () => wrapper.find("Button").get(0).props.onClick());

        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.find("TextArea").get(0).props.disabled).toBeTruthy();
            expect(wrapper.find("Checkbox").get(0).props.disabled).toBeTruthy();
            expect(wrapper.find("Button").get(0).props.disabled).toBeTruthy();
        });
        expect(wrapper.find("ViewRepliesButton").length).toBe(1);
    });

    it("shows an error if feedback submission fails", async () => {
        axios.post.mockResolvedValue({
            data: {
                data: {
                    submitFeedbackResponse: {
                        success: false,
                        error: "error",
                    },
                },
            },
        });

        const wrapper = mount(
            <FeedbackResponseForm
                feedbackResponseId={1901}
                mediaUrl="mediaUrl"
                mediaType="mediaType"
                feedbackPrompt="feedbackPrompt"
            />,
        );

        act(() => wrapper.find("TextArea").get(0).props.onChange({
            target: {
                value: "feedback",
            },
        }));
        act(() => wrapper.find("Checkbox").get(0).props.onChange({
            target: {
                checked: true,
            },
        }));
        await act(async () => wrapper.find("Button").get(0).props.onClick());

        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.find("TextArea").get(0).props.disabled).not.toBeTruthy();
            expect(wrapper.find("Checkbox").get(0).props.disabled).not.toBeTruthy();
            expect(wrapper.find("Button").get(0).props.disabled).not.toBeTruthy();
            expect(wrapper.find("Alert").length).toBe(1);
        });
    });

    it("shows a FeedbackResponseRepliesModal if ViewRepliesButton is clicked", () => {
        const wrapper = mount(
            <FeedbackResponseForm
                feedbackResponseId={1901}
                currentFeedback="currentFeedback"
                mediaUrl="mediaUrl"
                mediaType="mediaType"
                feedbackPrompt="feedbackPrompt"
                alreadySubmitted
                currentAllowReplies
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
            <FeedbackResponseForm
                feedbackResponseId={1901}
                currentFeedback="currentFeedback"
                mediaUrl="mediaUrl"
                mediaType="mediaType"
                feedbackPrompt="feedbackPrompt"
                alreadySubmitted
                currentAllowReplies
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
