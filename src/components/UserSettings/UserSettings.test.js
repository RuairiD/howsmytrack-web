import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import UserSettings from "./UserSettings";

jest.mock("../../apiRoot", () => "http://localhost:8000");

describe("UserSettings", () => {
    it("renders EmailSettings and EmailRemindersPreference with user's current settings", () => {
        const wrapper = shallow(
            <UserSettings
                currentEmail="alemac@brightonandhovealbion.com"
                currentSendReminderEmails={false}
            />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
