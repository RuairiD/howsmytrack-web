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
                timeCreated={new Date(Date.UTC(2014, 6, 13, 18, 0, 0))}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
