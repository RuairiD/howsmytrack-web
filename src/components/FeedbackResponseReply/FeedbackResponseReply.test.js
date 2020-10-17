import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import FeedbackResponseReply from "./FeedbackResponseReply";

describe("FeedbackResponseReply", () => {
    it("renders a Comment containing the reply's content", () => {
        const wrapper = shallow(
            <FeedbackResponseReply
                username="username"
                text="text"
                timeCreated={new Date(1405274400000)}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
