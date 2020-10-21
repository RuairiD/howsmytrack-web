import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import UserDetails from "./UserDetails";

describe("UserDetails", () => {
    it("renders the user's username and rating rounded to 2 decimal places", () => {
        const wrapper = shallow(
            <UserDetails
                username="username"
                rating={4.321}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders the user's username only, if no rating is available", () => {
        const wrapper = shallow(
            <UserDetails
                username="username"
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
