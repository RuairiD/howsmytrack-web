import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { act } from "react-dom/test-utils";
import waitForExpect from "wait-for-expect";
import axios from "axios";
import FeedbackResponseRater from "./FeedbackResponseRater";

jest.mock("axios");

describe("FeedbackResponseRater", () => {
    it("renders an unset Rate and a disabled submission Button if no currentRating is provided", () => {
        const wrapper = shallow(
            <FeedbackResponseRater
                feedbackResponseId={1901}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders a Rate preset with the currentRating and a disabled submission Button since the feedback has already been rated", () => {
        const wrapper = shallow(
            <FeedbackResponseRater
                feedbackResponseId={1901}
                currentRating={5}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("submits a rating and disables the form if successful", async () => {
        axios.post.mockResolvedValue({
            data: {
                data: {
                    rateFeedbackResponse: {
                        success: true,
                        error: null,
                    },
                },
            },
        });

        const wrapper = mount(
            <FeedbackResponseRater
                feedbackResponseId={1901}
            />,
        );

        act(() => wrapper.find("Rate").get(0).props.onChange(5));
        await act(() => wrapper.find("Button").get(0).props.onClick());

        await waitForExpect(async () => {
            wrapper.update();
            expect(wrapper.find("Button").get(0).props.disabled).toBeTruthy();
            expect(wrapper.find("Rate").get(0).props.disabled).toBeTruthy();
            expect(wrapper.text().includes("Rated")).toBeTruthy();
        });
    });

    it("submits a rating but does not disable the form if there is an error", async () => {
        axios.post.mockResolvedValue({
            data: {
                data: {
                    rateFeedbackResponse: {
                        success: false,
                        error: "error",
                    },
                },
            },
        });

        const wrapper = mount(
            <FeedbackResponseRater
                feedbackResponseId={1901}
            />,
        );

        act(() => wrapper.find("Rate").get(0).props.onChange(5));
        await act(async () => wrapper.find("Button").get(0).props.onClick());

        await waitForExpect(async () => {
            wrapper.update();
            expect(wrapper.find("Rate").get(0).props.disabled).not.toBeTruthy();
            expect(wrapper.find("Button").get(0).props.disabled).not.toBeTruthy();
            expect(wrapper.text().includes("Rated")).not.toBeTruthy();
        });
    });
});
