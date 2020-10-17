import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import ViewRepliesButton from "./ViewRepliesButton";

describe("ViewRepliesButton", () => {
    it("displays a prompt to write a reply if none have been posted already", () => {
        const wrapper = shallow(
            <ViewRepliesButton
                replies={0}
                unreadReplies={0}
                onClick={() => {}}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("displays a singular string for 1 reply", () => {
        const wrapper = shallow(
            <ViewRepliesButton
                replies={1}
                unreadReplies={0}
                onClick={() => {}}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("displays a plural string for multiple replies", () => {
        const wrapper = shallow(
            <ViewRepliesButton
                replies={2}
                unreadReplies={0}
                onClick={() => {}}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("displays a badge with a singular title/hovertext indicating one unread reply", () => {
        const wrapper = shallow(
            <ViewRepliesButton
                replies={2}
                unreadReplies={1}
                onClick={() => {}}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("displays a badge with a plural title/hovertext indicating multiple unread replies", () => {
        const wrapper = shallow(
            <ViewRepliesButton
                replies={2}
                unreadReplies={2}
                onClick={() => {}}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
