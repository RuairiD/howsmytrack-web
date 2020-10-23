import React from "react";
import { mount } from "enzyme";
import ReactGA from "react-ga";
import waitForExpect from "wait-for-expect";
import axios from "axios";
import { act } from "react-dom/test-utils";
import FeedbackRequestForm from "./FeedbackRequestForm";

jest.mock("axios");
jest.mock("react-ga");

const mockValidForm = {
    getFieldValue: jest.fn(() => "track"),
    getFieldDecorator: jest.fn(() => (c) => c),
    validateFieldsAndScroll: jest.fn((afterValidation) => afterValidation(false, {
        feedbackRequestId: 1901,
        genre: "genre",
        mediaUrl: "mediaUrl",
        feedbackPrompt: "feedbackPrompt",
        emailWhenGrouped: false,
    })),
};

const mockValidTracklessForm = {
    getFieldValue: jest.fn(() => "track"),
    getFieldDecorator: jest.fn(() => (c) => c),
    validateFieldsAndScroll: jest.fn((afterValidation) => afterValidation(false, {
        feedbackRequestId: 1901,
        genre: "genre",
        trackless: "trackless",
        emailWhenGrouped: false,
    })),
};

const mockInvalidForm = {
    getFieldValue: jest.fn(() => "track"),
    getFieldDecorator: jest.fn(() => (c) => c),
    validateFieldsAndScroll: jest.fn((afterValidation) => afterValidation(true)),
};

const makeRequest = jest.fn();

describe("UnwrappedLoginFormController", () => {
    beforeEach(() => {
        axios.post.mockRestore();
        ReactGA.event.mockRestore();
        makeRequest.mockRestore();
        jest.useFakeTimers();
    });

    it("renders a success indicator upon successful request, and logs the submission and success", async () => {
        makeRequest.mockResolvedValue({
            data: {
                data: {
                    testFeedbackRequest: {
                        success: true,
                        error: null,
                        invalidMediaUrl: false,
                    },
                },
            },
        });

        const wrapper = mount(
            <FeedbackRequestForm
                form={mockValidForm}
                submittedText={{
                    title: "title",
                    subTitle: "subTitle",
                }}
                makeRequest={makeRequest}
                responseName="testFeedbackRequest"
                gaCategory="testFeedbackRequest"
            />,
        );

        expect(wrapper.find("FeedbackRequestFormFields").length).toBe(1);
        await act(async () => wrapper.find("FeedbackRequestFormFields").get(0).props.onSubmit({
            preventDefault: jest.fn(),
        }));

        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.find("Result").length).toBe(1);
            expect(wrapper.find("Result").get(0).props.title).toBe("title");
            expect(wrapper.find("Result").get(0).props.subTitle).toBe("subTitle");
            expect(wrapper.find("FeedbackRequestFormFields").length).toBe(0);
        });

        expect(ReactGA.event.mock.calls.length).toBe(3);
        expect(ReactGA.event.mock.calls[0][0].action).toBe("view");
        expect(ReactGA.event.mock.calls[1][0].action).toBe("submit");
        expect(ReactGA.event.mock.calls[2][0].action).toBe("success");
    });

    it("excludes mediaUrl and feedbackPrompt from the request if trackless is true", async () => {
        makeRequest.mockResolvedValue({
            data: {
                data: {
                    testFeedbackRequest: {
                        success: true,
                        error: null,
                        invalidMediaUrl: false,
                    },
                },
            },
        });

        const wrapper = mount(
            <FeedbackRequestForm
                form={mockValidTracklessForm}
                submittedText={{
                    title: "title",
                    subTitle: "subTitle",
                }}
                makeRequest={makeRequest}
                responseName="testFeedbackRequest"
                gaCategory="testFeedbackRequest"
                trackless
            />,
        );

        expect(wrapper.find("FeedbackRequestFormFields").length).toBe(1);
        await act(async () => wrapper.find("FeedbackRequestFormFields").get(0).props.onSubmit({
            preventDefault: jest.fn(),
        }));

        await waitForExpect(() => {
            wrapper.update();
            expect(makeRequest).toBeCalled();
            expect(makeRequest).not.toBeCalledWith(expect.objectContaining({
                mediaUrl: expect.any(String),
                feedbackPrompt: expect.any(String),
            }));
        });
    });

    it("shows an error if the request fails", async () => {
        makeRequest.mockResolvedValue({
            data: {
                data: {
                    testFeedbackRequest: {
                        success: false,
                        error: "error",
                        invalidMediaUrl: false,
                    },
                },
            },
        });

        const wrapper = mount(
            <FeedbackRequestForm
                form={mockValidForm}
                submittedText={{
                    title: "title",
                    subTitle: "subTitle",
                }}
                makeRequest={makeRequest}
                responseName="testFeedbackRequest"
                gaCategory="testFeedbackRequest"
            />,
        );

        expect(wrapper.find("FeedbackRequestFormFields").length).toBe(1);
        await act(async () => wrapper.find("FeedbackRequestFormFields").get(0).props.onSubmit({
            preventDefault: jest.fn(),
        }));

        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.find("Result").length).toBe(0);
            expect(wrapper.find("Alert").length).toBe(1);
            expect(wrapper.find("Alert").get(0).props.message).toBe("error");
        });

        expect(ReactGA.event.mock.calls.length).toBe(3);
        expect(ReactGA.event.mock.calls[0][0].action).toBe("view");
        expect(ReactGA.event.mock.calls[1][0].action).toBe("submit");
        expect(ReactGA.event.mock.calls[2][0].action).toBe("error");
    });

    it("shows a specific error message if the mediaUrl is invalid", async () => {
        makeRequest.mockResolvedValue({
            data: {
                data: {
                    testFeedbackRequest: {
                        success: false,
                        error: "error",
                        invalidMediaUrl: true,
                    },
                },
            },
        });

        const wrapper = mount(
            <FeedbackRequestForm
                form={mockValidForm}
                submittedText={{
                    title: "title",
                    subTitle: "subTitle",
                }}
                makeRequest={makeRequest}
                responseName="testFeedbackRequest"
                gaCategory="testFeedbackRequest"
            />,
        );

        expect(wrapper.find("FeedbackRequestFormFields").length).toBe(1);
        await act(async () => wrapper.find("FeedbackRequestFormFields").get(0).props.onSubmit({
            preventDefault: jest.fn(),
        }));

        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.find("Result").length).toBe(0);
            expect(wrapper.find("Alert").length).toBe(1);
            expect(wrapper.find("Alert").get(0).props.message).not.toBe("error");
        });
    });

    it("does not attempt to post the form if it has invalid fields", async () => {
        const wrapper = mount(
            <FeedbackRequestForm
                form={mockInvalidForm}
                submittedText={{
                    title: "title",
                    subTitle: "subTitle",
                }}
                makeRequest={makeRequest}
                responseName="testFeedbackRequest"
                gaCategory="testFeedbackRequest"
            />,
        );

        await act(async () => wrapper.find("FeedbackRequestFormFields").get(0).props.onSubmit({
            preventDefault: jest.fn(),
        }));

        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.find("Result").length).toBe(0);
            expect(wrapper.find("FeedbackRequestFormFields").length).toBe(1);
        });

        expect(makeRequest).not.toBeCalled();
        expect(ReactGA.event.mock.calls.length).toBe(1);
        expect(ReactGA.event.mock.calls[0][0].action).toBe("view");
    });

    it("sets a timeout to make a request for mediaInfo after typing", () => {
        const wrapper = mount(
            <FeedbackRequestForm
                form={mockInvalidForm}
                submittedText={{
                    title: "title",
                    subTitle: "subTitle",
                }}
                makeRequest={makeRequest}
                responseName="testFeedbackRequest"
                gaCategory="testFeedbackRequest"
            />,
        );

        act(() => wrapper.find("FeedbackRequestFormFields").get(0).props.onMediaUrlChange());
        expect(setTimeout).toBeCalled();
    });

    it("clears the existing timeout to make a request for mediaInfo after typing, if one exists", () => {
        const wrapper = mount(
            <FeedbackRequestForm
                form={mockInvalidForm}
                submittedText={{
                    title: "title",
                    subTitle: "subTitle",
                }}
                makeRequest={makeRequest}
                responseName="testFeedbackRequest"
                gaCategory="testFeedbackRequest"
            />,
        );

        // Clear setTimeout and axios mocks of
        // any calls from constructing and mounting
        jest.useFakeTimers();
        axios.post.mockRestore();

        act(() => {
            wrapper.find("FeedbackRequestFormFields").get(0).props.onMediaUrlChange();
            wrapper.find("FeedbackRequestFormFields").get(0).props.onMediaUrlChange();
        });
        expect(clearTimeout).toBeCalled();
        expect(setTimeout).toBeCalledTimes(2);
    });

    it("makes a request to get a mediaUrl's mediaInfo if a mediaUrl already exists", async () => {
        axios.post.mockResolvedValue({
            data: {
                data: {
                    mediaInfo: {
                        mediaType: "SOUNDCLOUD",
                    },
                },
            },
        });
        const wrapper = mount(
            <FeedbackRequestForm
                form={mockInvalidForm}
                submittedText={{
                    title: "title",
                    subTitle: "subTitle",
                }}
                makeRequest={makeRequest}
                responseName="testFeedbackRequest"
                gaCategory="testFeedbackRequest"
                mediaUrl="mediaUrl"
            />,
        );

        await waitForExpect(() => {
            wrapper.update();
            expect(axios.post).toBeCalled();
            expect(wrapper.find("FeedbackRequestSummaryContent").length).toBe(1);
        });
    });

    it("makes a request to get a mediaUrl's mediaInfo when it is typed in", async () => {
        axios.post.mockResolvedValue({
            data: {
                data: {
                    mediaInfo: {
                        mediaType: "SOUNDCLOUD",
                    },
                },
            },
        });

        const wrapper = mount(
            <FeedbackRequestForm
                form={mockInvalidForm}
                submittedText={{
                    title: "title",
                    subTitle: "subTitle",
                }}
                makeRequest={makeRequest}
                responseName="testFeedbackRequest"
                gaCategory="testFeedbackRequest"
            />,
        );

        expect(wrapper.find("FeedbackRequestFormFields").length).toBe(1);
        await act(async () => wrapper.find("FeedbackRequestFormFields").get(0).props.onMediaUrlChange());

        jest.runAllTimers();

        await waitForExpect(() => {
            wrapper.update();
            expect(axios.post).toBeCalled();
            expect(wrapper.find("FeedbackRequestSummaryContent").length).toBe(1);
        });
    });
});
