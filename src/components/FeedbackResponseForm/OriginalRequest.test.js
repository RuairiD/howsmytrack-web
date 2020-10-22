import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import OriginalRequest from "./OriginalRequest";

describe("OriginalRequest", () => {
    it("renders a MediaEmbed for the request's track", () => {
        const wrapper = shallow(
            <OriginalRequest
                mediaUrl="mediaUrl"
                mediaType="mediaType"
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders a feedback prompt, if one exists", () => {
        const wrapper = shallow(
            <OriginalRequest
                mediaUrl="mediaUrl"
                mediaType="mediaType"
                feedbackPrompt="feedbackPrompt"
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
