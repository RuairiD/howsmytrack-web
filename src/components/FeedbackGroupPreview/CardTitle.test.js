import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import CardTitle from "./CardTitle";

describe("CardTitle", () => {
    it("renders the header for a FeedbackGroupPreview with a formatted URL and badge for unread replies", () => {
        const wrapper = shallow(
            <CardTitle
                feedbackGroupId={1901}
                name="name"
                unreadReplies={2}
            />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
