import React from "react";
import { mount, shallow } from "enzyme";
import axios from "axios";
import waitForExpect from "wait-for-expect";
import { when } from "jest-when";
import FeedbackGroupsPage from "./FeedbackGroupsPage";

jest.mock("axios");

const mockFeedbackGroups = [
    {
        id: 1901,
        name: "name",
        timeCreated: 123456,
        members: 3,
        tracklessMembers: 1,
        feedbackRequest: {
            mediaUrl: "mediaUrl",
            mediaType: "mediaType",
        },
        feedbackResponses: [
            {
                submitted: true,
                unreadReplies: 1,
            },
            {
                submitted: false,
                unreadReplies: 2,
            },
        ],
        userFeedbackResponses: [
            {
                submitted: true,
                unreadReplies: 1,
            },
            {
                submitted: false,
                unreadReplies: 2,
            },
        ],
        userFeedbackResponseCount: 1,
    },
];

const mockFeedbackGroupsWithoutResponses = [
    {
        id: 1901,
        name: "name",
        timeCreated: 123456,
        members: 3,
        tracklessMembers: 1,
        feedbackRequest: {
            mediaUrl: "mediaUrl",
            mediaType: "mediaType",
        },
        feedbackResponses: null,
        userFeedbackResponses: null,
        userFeedbackResponseCount: 0,
    },
];

const mockUnassignedRequest = {
    id: 1901,
    mediaUrl: "mediaUrl",
    mediaType: "mediaType",
    feedbackPrompt: "feedbackPrompt",
    emailWhenGrouped: false,
    genre: "genre",
};

describe("FeedbackGroupsPage", () => {
    beforeEach(() => {
        axios.mockRestore();
    });

    it("renders a LoadingSpinner while loading", async () => {
        const wrapper = shallow(
            <FeedbackGroupsPage />,
        );

        // Loading spinner will be present before POST request resolves.
        expect(wrapper.find("LoadingSpinner").length).toBe(1);
    });

    it("renders a FeedbackGroups with formatted feedbackGroups", async () => {
        when(axios.post).calledWith(
            expect.any(String),
            expect.objectContaining({
                query: expect.stringContaining("FeedbackGroups"),
            }),
        ).mockResolvedValue({
            data: {
                data: {
                    feedbackGroups: mockFeedbackGroups,
                },
            },
        });

        when(axios.post).calledWith(
            expect.any(String),
            expect.objectContaining({
                query: expect.stringContaining("UnassignedRequest"),
            }),
        ).mockResolvedValue({
            data: {
                data: {
                    unassignedRequest: null,
                },
            },
        });

        const wrapper = mount(
            <FeedbackGroupsPage />,
        );

        await waitForExpect(async () => {
            wrapper.update();
            expect(wrapper.find("FeedbackGroups").length).toBe(1);
        });

        expect(wrapper.find("FeedbackGroups").get(0).props.feedbackGroups).toStrictEqual([
            {
                feedbackGroupId: 1901,
                feedbackRequestSummary: {
                    mediaType: "mediaType",
                    mediaUrl: "mediaUrl",
                },
                feedbackResponseCount: 1,
                name: "name",
                timeCreated: 123456,
                tracklessUserCount: 1,
                unreadReplies: 6,
                userCount: 3,
                userFeedbackCount: 1,
            },
        ]);
        expect(wrapper.find("FeedbackGroups").get(0).props.unassignedRequest).toStrictEqual(null);
    });

    it("renders a FeedbackGroups with empty feedbackGroups, if none are provided", async () => {
        when(axios.post).calledWith(
            expect.any(String),
            expect.objectContaining({
                query: expect.stringContaining("FeedbackGroups"),
            }),
        ).mockResolvedValue({
            data: {
                data: {
                    feedbackGroups: null,
                },
            },
        });

        when(axios.post).calledWith(
            expect.any(String),
            expect.objectContaining({
                query: expect.stringContaining("UnassignedRequest"),
            }),
        ).mockResolvedValue({
            data: {
                data: {
                    unassignedRequest: null,
                },
            },
        });

        const wrapper = mount(
            <FeedbackGroupsPage />,
        );

        await waitForExpect(async () => {
            wrapper.update();
            expect(wrapper.find("FeedbackGroups").length).toBe(1);
        });

        expect(wrapper.find("FeedbackGroups").get(0).props.feedbackGroups).toStrictEqual([]);
        expect(wrapper.find("FeedbackGroups").get(0).props.unassignedRequest).toStrictEqual(null);
    });

    it("renders a FeedbackGroups without responses, if none are provided", async () => {
        when(axios.post).calledWith(
            expect.any(String),
            expect.objectContaining({
                query: expect.stringContaining("FeedbackGroups"),
            }),
        ).mockResolvedValue({
            data: {
                data: {
                    feedbackGroups: mockFeedbackGroupsWithoutResponses,
                },
            },
        });

        when(axios.post).calledWith(
            expect.any(String),
            expect.objectContaining({
                query: expect.stringContaining("UnassignedRequest"),
            }),
        ).mockResolvedValue({
            data: {
                data: {
                    unassignedRequest: null,
                },
            },
        });

        const wrapper = mount(
            <FeedbackGroupsPage />,
        );

        await waitForExpect(async () => {
            wrapper.update();
            expect(wrapper.find("FeedbackGroups").length).toBe(1);
        });

        expect(wrapper.find("FeedbackGroups").get(0).props.feedbackGroups).toStrictEqual([
            {
                feedbackGroupId: 1901,
                feedbackRequestSummary: {
                    mediaType: "mediaType",
                    mediaUrl: "mediaUrl",
                },
                feedbackResponseCount: 0,
                name: "name",
                timeCreated: 123456,
                tracklessUserCount: 1,
                unreadReplies: 0,
                userCount: 3,
                userFeedbackCount: 0,
            },
        ]);
        expect(wrapper.find("FeedbackGroups").get(0).props.unassignedRequest).toStrictEqual(null);
    });

    it("renders a FeedbackGroups with formatted feedbackGroups and unassignedRequest", async () => {
        when(axios.post).calledWith(
            expect.any(String),
            expect.objectContaining({
                query: expect.stringContaining("FeedbackGroups"),
            }),
        ).mockResolvedValue({
            data: {
                data: {
                    feedbackGroups: mockFeedbackGroups,
                },
            },
        });

        when(axios.post).calledWith(
            expect.any(String),
            expect.objectContaining({
                query: expect.stringContaining("UnassignedRequest"),
            }),
        ).mockResolvedValue({
            data: {
                data: {
                    unassignedRequest: mockUnassignedRequest,
                },
            },
        });

        const wrapper = mount(
            <FeedbackGroupsPage />,
        );

        await waitForExpect(async () => {
            wrapper.update();
            expect(wrapper.find("FeedbackGroups").length).toBe(1);
        });

        expect(wrapper.find("FeedbackGroups").get(0).props.feedbackGroups).toStrictEqual([
            {
                feedbackGroupId: 1901,
                feedbackRequestSummary: {
                    mediaType: "mediaType",
                    mediaUrl: "mediaUrl",
                },
                feedbackResponseCount: 1,
                name: "name",
                timeCreated: 123456,
                tracklessUserCount: 1,
                unreadReplies: 6,
                userCount: 3,
                userFeedbackCount: 1,
            },
        ]);
        expect(wrapper.find("FeedbackGroups").get(0).props.unassignedRequest).toStrictEqual({
            emailWhenGrouped: false,
            feedbackPrompt: "feedbackPrompt",
            feedbackRequestId: 1901,
            genre: "genre",
            mediaType: "mediaType",
            mediaUrl: "mediaUrl",
        });
    });
});
