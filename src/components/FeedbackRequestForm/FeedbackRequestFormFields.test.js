import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import axios from "axios";
import { act } from "react-dom/test-utils";
import FeedbackRequestFormFields from "./FeedbackRequestFormFields";

jest.mock("axios");
jest.mock("./getFeedbackPromptPlaceholder", () => () => "placeholder text");

const mockForm = {
    getFieldDecorator: jest.fn(() => (c) => c),
    getFieldValue: jest.fn(() => "track"),
};

describe("FeedbackRequestFormFields", () => {
    beforeEach(() => {
        axios.post.mockRestore();
    });

    it("renders an empty form for submitting a request", () => {
        const wrapper = shallow(
            <FeedbackRequestFormFields
                form={mockForm}
                onMediaUrlChange={jest.fn()}
                onSubmit={jest.fn()}
                isLoading={false}
                submitted={false}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("skips mediaUrl and feedbackPrompt fields if request is trackless", () => {
        const wrapper = shallow(
            <FeedbackRequestFormFields
                form={mockForm}
                onMediaUrlChange={jest.fn()}
                onSubmit={jest.fn()}
                isLoading={false}
                submitted={false}
                trackless
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("disables the submit button if a submission request is still loading", () => {
        const wrapper = shallow(
            <FeedbackRequestFormFields
                form={mockForm}
                onMediaUrlChange={jest.fn()}
                onSubmit={jest.fn()}
                isLoading
                submitted={false}
                emailWhenGrouped
                trackless
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("calls the onMediaUrlChange callback when the mediaUrl is changed", () => {
        const onMediaUrlChange = jest.fn();
        const wrapper = mount(
            <FeedbackRequestFormFields
                form={mockForm}
                onMediaUrlChange={onMediaUrlChange}
                onSubmit={jest.fn()}
                isLoading={false}
                submitted={false}
            />,
        );

        act(() => wrapper.find("Input").get(0).props.onChange());

        expect(onMediaUrlChange).toHaveBeenCalled();
    });

    it("calls the onSubmit callback when the form is submitted, and shows any errors", () => {
        const onSubmit = jest.fn();
        const wrapper = mount(
            <FeedbackRequestFormFields
                form={mockForm}
                onMediaUrlChange={jest.fn()}
                onSubmit={onSubmit}
                isLoading={false}
                submitted={false}
            />,
        );

        act(() => wrapper.find("Form").get(0).props.onSubmit());

        expect(onSubmit).toHaveBeenCalled();
    });
});
