import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import FeedbackRequestSummaryMedia from "./FeedbackRequestSummaryMedia";

describe("FeedbackRequestSummaryMedia", () => {
    it("shows an information message if mediaUrl is missing/request is trackless", () => {
        const wrapper = shallow(
            <FeedbackRequestSummaryMedia />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("shows an error if mediaType is missing (implies the url is malformed or not supported)", () => {
        const wrapper = shallow(
            <FeedbackRequestSummaryMedia
                mediaUrl="mediaUrl"
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders a MediaEmbed for the given mediaUrl and mediaType", () => {
        const wrapper = shallow(
            <FeedbackRequestSummaryMedia
                mediaUrl="mediaUrl"
                mediaType="mediaType"
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
