import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import FeedbackResponseReplies from "./FeedbackResponseReplies";
import axios from "axios";
import waitForExpect from "wait-for-expect";

jest.mock("axios");

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
        })

        const wrapper = mount(
            <FeedbackResponseReplies
                feedbackResponseId={1901}
                feedback="feedback"
            />,
        );

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

        const wrapper = mount(
            <FeedbackResponseReplies
                feedbackResponseId={1901}
                feedback="feedback"
            />,
        );

        await waitForExpect(async () => {
            wrapper.update();
            // TODO assertions fail since clientHeight and scrollHeight are both 0.
            // They need to be mocked to valid values for this case.
            expect(wrapper.state.topShadowOpacity).toBe(1);
            expect(wrapper.state.bottomShadowOpacity).toBe(0);
            expect(wrapper.state.allowingScrolling).toBe(true);
        });
    });
});
