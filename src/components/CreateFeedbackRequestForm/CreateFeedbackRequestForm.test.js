import React from "react";
import { mount } from "enzyme";
import axios from "axios";
import CreateFeedbackRequestForm from "./CreateFeedbackRequestForm";

jest.mock("react-ga");
jest.mock("axios");

describe("CreateFeedbackRequestForm", () => {
    it("renders a wrapped FeedbackRequestForm with the appropriate callback props", async () => {
        const wrapper = mount(
            <CreateFeedbackRequestForm />,
        );

        expect(wrapper.find("FeedbackRequestForm").length).toBe(1);
        expect(wrapper.find("FeedbackRequestForm").get(0).props.responseName).toBe("createFeedbackRequest");
        expect(wrapper.find("FeedbackRequestForm").get(0).props.gaCategory).toBe("createFeedbackRequest");
        expect(wrapper.find("FeedbackRequestForm").get(0).props.form).toBeTruthy();

        wrapper.find("FeedbackRequestForm").get(0).props.makeRequest();
        expect(axios.post.mock.calls.length).toBe(1);
    });
});
