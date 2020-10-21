import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import waitForExpect from "wait-for-expect";
import { act } from "react-dom/test-utils";
import axios from "axios";
import { message } from "antd";
import FeedbackRequestSummary from "./FeedbackRequestSummary";

jest.mock("react-ga");
jest.mock("axios");

const errorMessageSpy = jest.spyOn(message, "error");

describe("FeedbackRequestSummary", () => {
    beforeEach(() => {
        axios.post.mockRestore();
    });

    it("renders a summary of an existing feedback request, including media and buttons to edit and delete the request", () => {
        const wrapper = shallow(
            <FeedbackRequestSummary
                feedbackRequestSummary={{
                    feedbackRequestId: 1901,
                    mediaUrl: "mediaUrl",
                    mediaType: "mediaType",
                    feedbackPrompt: "feedbackPrompt",
                    emailWhenGrouped: true,
                    genre: "genre",
                }}
                showButtons
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it("renders a summary of an existing feedback request without buttons if showButtons is omitted", () => {
        const wrapper = shallow(
            <FeedbackRequestSummary
                feedbackRequestSummary={{
                    feedbackRequestId: 1901,
                    mediaUrl: "mediaUrl",
                    mediaType: "mediaType",
                    feedbackPrompt: "feedbackPrompt",
                    emailWhenGrouped: true,
                    genre: "genre",
                }}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("shows an EditFeedbackRequestModal when the edit button is clicked", () => {
        const wrapper = mount(
            <FeedbackRequestSummary
                feedbackRequestSummary={{
                    feedbackRequestId: 1901,
                    mediaUrl: "mediaUrl",
                    mediaType: "mediaType",
                    feedbackPrompt: "feedbackPrompt",
                    emailWhenGrouped: true,
                    genre: "genre",
                }}
                showButtons
            />,
        );

        act(() => wrapper.find("RequestButtons").get(0).props.onEditClick());

        wrapper.update();
        expect(wrapper.find("EditFeedbackRequestModal").get(0).props.isVisible).toBeTruthy();
    });

    it("shows the EditFeedbackRequestModal when dismissed", () => {
        const wrapper = mount(
            <FeedbackRequestSummary
                feedbackRequestSummary={{
                    feedbackRequestId: 1901,
                    mediaUrl: "mediaUrl",
                    mediaType: "mediaType",
                    feedbackPrompt: "feedbackPrompt",
                    emailWhenGrouped: true,
                    genre: "genre",
                }}
                showButtons
            />,
        );

        act(() => wrapper.find("RequestButtons").get(0).props.onEditClick());
        act(() => wrapper.find("EditFeedbackRequestModal").get(0).props.onCancel());

        wrapper.update();
        expect(wrapper.find("EditFeedbackRequestModal").get(0).props.isVisible).not.toBeTruthy();
    });

    it("makes an API request to delete the feedback request when delete button is clicked, and shows a confirmation", async () => {
        axios.post.mockResolvedValueOnce({
            data: {
                data: {
                    deleteFeedbackRequest: {
                        success: true,
                        error: null,
                    },
                },
            },
        });

        const wrapper = mount(
            <FeedbackRequestSummary
                feedbackRequestSummary={{
                    feedbackRequestId: 1901,
                    mediaUrl: "mediaUrl",
                    mediaType: "mediaType",
                    feedbackPrompt: "feedbackPrompt",
                    emailWhenGrouped: true,
                    genre: "genre",
                }}
                showButtons
            />,
        );

        expect(wrapper.find("Result").length).toBe(0);
        expect(wrapper.find("Result[status=\"success\"]").length).toBe(0);

        await act(async () => wrapper.find("RequestButtons").get(0).props.onDelete());

        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.find("Result").length).toBe(1);
            expect(wrapper.find("Result[status=\"success\"]").length).toBe(1);
        });
    });

    it("shows an error if request deletion fails", async () => {
        axios.post.mockResolvedValueOnce({
            data: {
                data: {
                    deleteFeedbackRequest: {
                        success: false,
                        error: "error",
                    },
                },
            },
        });

        const wrapper = mount(
            <FeedbackRequestSummary
                feedbackRequestSummary={{
                    feedbackRequestId: 1901,
                    mediaUrl: "mediaUrl",
                    mediaType: "mediaType",
                    feedbackPrompt: "feedbackPrompt",
                    emailWhenGrouped: true,
                    genre: "genre",
                }}
                showButtons
            />,
        );

        await act(async () => wrapper.find("RequestButtons").get(0).props.onDelete());

        await waitForExpect(() => {
            wrapper.update();
            expect(errorMessageSpy).toHaveBeenCalled();
        });
    });
});
