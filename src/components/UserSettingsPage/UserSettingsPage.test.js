import React from "react";
import { mount } from "enzyme";
import axios from "axios";
import waitForExpect from "wait-for-expect";
import UserSettingsPage from "./UserSettingsPage";

jest.mock("axios");

describe("UserSettingsPage", () => {
    afterEach(() => {
        axios.mockClear();
    });

    it("renders a LoadingSpinner until the query resolves", () => {
        const wrapper = mount(
            <UserSettingsPage isMobile={false} />,
        );

        expect(wrapper.find("LoadingSpinner").length).toBe(1);
    });

    it("renders a GenericPage containing a UserSettings after receiving data", async () => {
        axios.post.mockReturnValue({
            data: {
                data: {
                    userDetails: {
                        username: "username",
                        sendReminderEmails: true,
                    },
                },
            },
        });

        const wrapper = mount(
            <UserSettingsPage isMobile={false} />,
        );

        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.find("GenericPage").get(0).props.title).toBe("Settings");
            expect(wrapper.find("GenericPage").get(0).props.isMobile).toBe(false);
            expect(wrapper.find("GenericPage UserSettings").length).toBe(1);
            expect(wrapper.find("GenericPage UserSettings").get(0).props.currentEmail).toBe("username");
            expect(wrapper.find("GenericPage UserSettings").get(0).props.currentSendReminderEmails).toBe(true);
        });
    });
});
