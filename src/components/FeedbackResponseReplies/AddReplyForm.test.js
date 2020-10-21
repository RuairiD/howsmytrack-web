import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import axios from "axios";
import waitForExpect from "wait-for-expect";
import { act } from "react-dom/test-utils";
import AddReplyForm from "./AddReplyForm";

jest.mock("axios");

describe("AddReplyForm", () => {
    beforeEach(() => {
        axios.post.mockRestore();
    });

    it("renders an empty text field if replies are allowed for this thread", () => {
        const wrapper = shallow(
            <AddReplyForm
                feedbackResponseId={1901}
                refetchReplies={jest.fn()}
                allowFurtherReplies
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders an an informational message if replies are not allowed for this thread", () => {
        const wrapper = shallow(
            <AddReplyForm
                feedbackResponseId={1901}
                refetchReplies={jest.fn()}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders nothing if replies are not allowed, but replies are still loading", () => {
        const wrapper = shallow(
            <AddReplyForm
                feedbackResponseId={1901}
                refetchReplies={jest.fn()}
                isLoadingReplies
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("posts a new reply if one is submitted, refetches replies upstream, and resets the form", async () => {
        axios.post.mockResolvedValue({
            data: {
                data: {
                    addFeedbackResponseReply: {
                        reply: {
                            allowReplies: true,
                        },
                        error: null,
                    },
                },
            },
        });

        const refetchReplies = jest.fn();
        const wrapper = mount(
            <AddReplyForm
                feedbackResponseId={1901}
                refetchReplies={refetchReplies}
                allowFurtherReplies
            />,
        );

        await act(async () => wrapper.find("TextArea").get(0).props.onChange({
            target: {
                value: "This is a new reply.",
            },
        }));
        await act(async () => wrapper.find("Checkbox").get(0).props.onChange({
            target: {
                value: true,
            },
        }));

        await act(async () => wrapper.find("Button").get(0).props.onClick());

        await waitForExpect(() => {
            wrapper.update();
            expect(refetchReplies).toHaveBeenCalled();
            expect(wrapper.find("TextArea").get(0).props.value).toBe("");
        });
    });

    it("prevents further replies if the user disabled replies when sending a new reply", async () => {
        axios.post.mockResolvedValue({
            data: {
                data: {
                    addFeedbackResponseReply: {
                        reply: {
                            allowReplies: false,
                        },
                        error: null,
                    },
                },
            },
        });

        const wrapper = mount(
            <AddReplyForm
                feedbackResponseId={1901}
                refetchReplies={jest.fn()}
                allowFurtherReplies
            />,
        );

        await act(async () => wrapper.find("TextArea").get(0).props.onChange({
            target: {
                value: "This is the final reply. Good day.",
            },
        }));
        await act(async () => wrapper.find("Checkbox").get(0).props.onChange({
            target: {
                value: false,
            },
        }));

        await act(async () => wrapper.find("Button").get(0).props.onClick());

        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.find("TextArea").length).toBe(0);
            expect(wrapper.text().includes("Additional replies have been disabled for this conversation.")).toBeTruthy();
        });
    });

    it("shows an error if adding a new reply failed", async () => {
        axios.post.mockResolvedValue({
            data: {
                data: {
                    addFeedbackResponseReply: {
                        reply: null,
                        error: "error",
                    },
                },
            },
        });

        const wrapper = mount(
            <AddReplyForm
                feedbackResponseId={1901}
                refetchReplies={jest.fn()}
                allowFurtherReplies
            />,
        );

        await act(async () => wrapper.find("TextArea").get(0).props.onChange({
            target: {
                value: "This is the final reply. Good day.",
            },
        }));

        await act(async () => wrapper.find("Button").get(0).props.onClick());

        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.find("Alert").length).toBe(1);
        });
    });
});
