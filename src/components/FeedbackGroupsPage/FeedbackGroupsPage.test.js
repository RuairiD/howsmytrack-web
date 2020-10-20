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
        ],
        userFeedbackResponses: [
            {
                submitted: true,
                unreadReplies: 1,
            },
        ],
        userFeedbackResponseCount: 1,
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

    it.only("renders a FeedbackGroups with formatted feedbackGroups", async () => {
        when(axios.post).calledWith(
            expect.any(String),
            expect.objectContaining({
                query: expect.stringContaining("FeedbackGroups"),
            }),
        ).mockImplementation(() => Promise.resolve({
            data: {
                data: {
                    feedbackGroups: mockFeedbackGroups,
                },
            },
        }));

        when(axios.post).calledWith(
            expect.any(String),
            expect.objectContaining({
                query: expect.stringContaining("UnassignedRequest"),
            }),
        ).mockImplementation(() => Promise.resolve({
            data: {
                data: {
                    unassignedRequest: null,
                },
            },
        }));

        const wrapper = mount(
            <FeedbackGroupsPage />,
        );

        expect(axios.post).toBeCalledWith(
            expect.any(String),
            expect.objectContaining({
                query: expect.stringContaining("FeedbackGroups"),
            }),
        );

        expect(axios.post).toBeCalledWith(
            expect.any(String),
            expect.objectContaining({
                query: expect.stringContaining("UnassignedRequest"),
            }),
        );

        await waitForExpect(async () => {
            expect(wrapper.find("FeedbackGroups").length).toBe(1);
        });

        expect(wrapper.find("FeedbackGroups").get(0).props.feedbackGroups).toBe([]);
        expect(wrapper.find("FeedbackGroups").get(0).props.unassignedRequest).toBe(null);
    });

    it("renders a FeedbackGroups with formatted feedbackGroups and unassignedRequest", async () => {
        const wrapper = mount(
            <FeedbackGroupsPage />,
        );

        await waitForExpect(async () => {
            expect(wrapper.find("FeedbackGroups").length).toBe(1);
        });

        expect(wrapper.find("FeedbackGroups").get(0).props.feedbackGroups).toBe([]);
        expect(wrapper.find("FeedbackGroups").get(0).props.unassignedRequest).toBe({});
    });
});
