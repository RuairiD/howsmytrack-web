import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import axios from "axios";
import waitForExpect from "wait-for-expect";
import { act } from "react-dom/test-utils";
import FeedbackResponseReplies from "./FeedbackResponseReplies";

import setAllowingScrollingAndShadowOpacities from "./setAllowingScrollingAndShadowOpacities";

jest.mock("axios");

jest.mock("./setAllowingScrollingAndShadowOpacities");

describe("FeedbackGroupPreview", () => {
    beforeEach(() => {
        axios.post.mockRestore();
    });

    it("displays an empty loading state before replies load", () => {
        const wrapper = shallow(
            <FeedbackResponseReplies
                feedbackResponseId={1901}
                feedback="feedback"
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("loads and renders replies, and marks the replies as read", async () => {
        axios.post.mockResolvedValue({
            data: {
                data: {
                    replies: {
                        allowFurtherReplies: true,
                        replies: [
                            {
                                id: 1901,
                                username: "username",
                                text: "text",
                                timeCreated: 123456,
                            },
                        ],
                    },
                },
            },
        });

        let wrapper;
        await act(async () => {
            wrapper = mount(
                <FeedbackResponseReplies
                    feedbackResponseId={1901}
                    feedback="feedback"
                />,
            );
        });

        await waitForExpect(async () => {
            wrapper.update();
            expect(wrapper.find("FeedbackResponseReply").length).toBe(1);
            expect(axios.post).toBeCalledWith(
                expect.any(String),
                expect.objectContaining({
                    query: expect.stringContaining("replies("),
                }),
            );
            expect(axios.post).toBeCalledWith(
                expect.any(String),
                expect.objectContaining({
                    query: expect.stringContaining("markRepliesAsRead("),
                }),
            );
        });
    });

    it("scrolls to the bottom of the replies container after receiving replies, and set shadow opacities", async () => {
        axios.post.mockResolvedValue({
            data: {
                data: {
                    replies: {
                        allowFurtherReplies: true,
                        replies: [
                            {
                                id: 1901,
                                username: "username",
                                text: "text",
                                timeCreated: 123456,
                            },
                        ],
                    },
                },
            },
        });

        let wrapper;
        await act(async () => {
            wrapper = mount(
                <FeedbackResponseReplies
                    feedbackResponseId={1901}
                    feedback="feedback"
                />,
            );
        });

        await waitForExpect(async () => {
            wrapper.update();
            expect(setAllowingScrollingAndShadowOpacities).toHaveBeenCalled();
        });
    });
});
