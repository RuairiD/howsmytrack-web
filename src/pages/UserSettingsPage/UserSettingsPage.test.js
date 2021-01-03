import React from "react";
import { mount } from "enzyme";
import axios from "axios";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import UserSettingsPage from "./UserSettingsPage";

jest.mock("axios");
jest.mock("react-ga");

const mockStore = configureStore();

describe("UserSettingsPage", () => {
    afterEach(() => {
        axios.mockClear();
    });

    it("renders a LoadingSpinner until the query resolves", () => {
        const store = mockStore({
            userDetails: {
                data: null,
                isLoading: true,
            },
        });

        const wrapper = mount(
            <Provider store={store}>
                <UserSettingsPage isMobile={false} />
            </Provider>,
        );

        expect(wrapper.find("LoadingSpinner").length).toBe(1);
    });

    it("renders a GenericPage containing a UserSettings after receiving data", async () => {
        const store = mockStore({
            userDetails: {
                data: {
                    username: "username",
                    sendReminderEmails: true,
                },
                isLoading: false,
            },
        });

        const wrapper = mount(
            <Provider store={store}>
                <UserSettingsPage isMobile={false} />
            </Provider>,
        );

        expect(wrapper.find("GenericPage").get(0).props.title).toBe("Settings");
        expect(wrapper.find("GenericPage").get(0).props.isMobile).toBe(false);
        expect(wrapper.find("GenericPage UserSettings").length).toBe(1);
        expect(wrapper.find("GenericPage UserSettings").get(0).props.currentEmail).toBe("username");
        expect(wrapper.find("GenericPage UserSettings").get(0).props.currentSendReminderEmails).toBe(true);
    });
});
