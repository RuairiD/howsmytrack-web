import React from "react";
import { mount, shallow } from "enzyme";
import axios from "axios";
import waitForExpect from "wait-for-expect";
import FeedbackGroupPage from "./FeedbackGroupPage";

jest.mock("axios");
jest.mock("react-ga");

const mockFeedbackGroup = {
    id: 1901,
    name: "name",
    timeCreated: 123456,
    feedbackRequest: {
        mediaUrl: "mediaUrl",
        mediaType: "mediaType",
        feedbackPrompt: "feedbackPrompt",
        genre: "genre",
    },
    feedbackResponses: [
        {
            id: 9,
            feedback: "feedback",
            submitted: false,
            feedbackRequest: {
                feedbackPrompt: "feedbackPrompt",
                mediaUrl: "mediaUrl",
                mediaType: "mediaType",
            },
            allowReplies: false,
            replies: 1,
            unreadReplies: 1,
        },
    ],
    userFeedbackResponses: [
        {
            id: 13,
            feedback: "feedback",
            rating: 5,
            allowReplies: true,
            replies: 2,
            unreadReplies: 2,
        },
    ],
};

const mockFeedbackGroupWithoutResponses = {
    id: 1901,
    name: "name",
    timeCreated: 123456,
    feedbackRequest: {
        mediaUrl: "mediaUrl",
        mediaType: "mediaType",
        feedbackPrompt: "feedbackPrompt",
        genre: "genre",
    },
    feedbackResponses: [
        {
            id: 9,
            feedback: "feedback",
            submitted: false,
            feedbackRequest: {
                feedbackPrompt: "feedbackPrompt",
                mediaUrl: "mediaUrl",
                mediaType: "mediaType",
            },
            allowReplies: false,
            replies: 1,
            unreadReplies: 1,
        },
    ],
    userFeedbackResponses: null,
};

describe("FeedbackGroupPage", () => {
    beforeEach(() => {
        axios.mockRestore();
    });

    it("renders a LoadingSpinner while loading", async () => {
        const wrapper = shallow(
            <FeedbackGroupPage feedbackGroupId={1901} />,
        );

        // Loading spinner will be present before POST request resolves.
        expect(wrapper.find("LoadingSpinner").length).toBe(1);
    });

    it("renders a FeedbackGroup with formatted responses", async () => {
        axios.post.mockResolvedValue({
            data: {
                data: {
                    feedbackGroup: mockFeedbackGroup,
                },
            },
        });

        const wrapper = mount(
            <FeedbackGroupPage feedbackGroupId={1901} />,
        );

        await waitForExpect(async () => {
            wrapper.update();
            expect(wrapper.find("FeedbackGroup").length).toBe(1);
        });

        expect(axios.post.mock.calls.length).toBeGreaterThan(0);
        expect(axios.post.mock.calls[0][1].variables.feedbackGroupId).toBe(1901);
        expect(wrapper.find("FeedbackGroup").get(0).props.feedbackResponseForms).toStrictEqual(
            [
                {
                    feedbackResponseId: 9,
                    currentFeedback: "feedback",
                    mediaUrl: "mediaUrl",
                    mediaType: "mediaType",
                    feedbackPrompt: "feedbackPrompt",
                    alreadySubmitted: false,
                    currentAllowReplies: false,
                    replies: 1,
                    unreadReplies: 1,
                },
            ],
        );
        expect(wrapper.find("FeedbackGroup").get(0).props.feedbackReceived).toStrictEqual(
            [
                {
                    feedbackResponseId: 13,
                    feedback: "feedback",
                    currentRating: 5,
                    allowReplies: true,
                    replies: 2,
                    unreadReplies: 2,
                },
            ],
        );
        expect(wrapper.find("FeedbackGroup").get(0).props.feedbackRequestSummary).toStrictEqual({
            mediaUrl: "mediaUrl",
            mediaType: "mediaType",
            feedbackPrompt: "feedbackPrompt",
            genre: "genre",
        });
    });

    it("renders a FeedbackGroup without userFeedbackResponses", async () => {
        axios.post.mockResolvedValue({
            data: {
                data: {
                    feedbackGroup: mockFeedbackGroupWithoutResponses,
                },
            },
        });

        const wrapper = mount(
            <FeedbackGroupPage feedbackGroupId={1901} />,
        );

        await waitForExpect(async () => {
            wrapper.update();
            expect(wrapper.find("FeedbackGroup").length).toBe(1);
        });

        expect(axios.post.mock.calls.length).toBeGreaterThan(0);
        expect(axios.post.mock.calls[0][1].variables.feedbackGroupId).toBe(1901);
        expect(wrapper.find("FeedbackGroup").get(0).props.feedbackResponseForms).toStrictEqual(
            [
                {
                    feedbackResponseId: 9,
                    currentFeedback: "feedback",
                    mediaUrl: "mediaUrl",
                    mediaType: "mediaType",
                    feedbackPrompt: "feedbackPrompt",
                    alreadySubmitted: false,
                    currentAllowReplies: false,
                    replies: 1,
                    unreadReplies: 1,
                },
            ],
        );
        expect(wrapper.find("FeedbackGroup").get(0).props.feedbackReceived).toBeNull();
        expect(wrapper.find("FeedbackGroup").get(0).props.feedbackRequestSummary).toStrictEqual({
            mediaUrl: "mediaUrl",
            mediaType: "mediaType",
            feedbackPrompt: "feedbackPrompt",
            genre: "genre",
        });
    });

    it("renders an error state if the group doesn't exist (or the user isn't permitted to access it)", async () => {
        axios.post.mockResolvedValue({
            data: {
                data: {
                    feedbackGroup: null,
                },
            },
        });

        const wrapper = mount(
            <FeedbackGroupPage feedbackGroupId={1901} />,
        );

        await waitForExpect(async () => {
            wrapper.update();
            expect(wrapper.find("FeedbackGroup").length).toBe(1);
        });

        expect(wrapper.find("FeedbackGroup").get(0).props.feedbackResponseForms).toBe(undefined);
        expect(wrapper.find("FeedbackGroup").get(0).props.feedbackReceived).toBe(undefined);
        expect(wrapper.find("FeedbackGroup").get(0).props.feedbackRequestSummary).toBe(undefined);
    });
});
