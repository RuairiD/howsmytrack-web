import React from "react";
import { mount } from "enzyme";
import axios from "axios";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import waitForExpect from "wait-for-expect";
import HomePage from "./HomePage";

jest.mock("axios");

const mockStore = configureStore();

describe("HomePage", () => {
    afterEach(() => {
        axios.post.mockRestore();
    });

    it("renders a LoadingSpinner while loading", async () => {
        const store = mockStore({
            userDetails: {
                data: null,
                isLoading: true,
            },
        });

        const wrapper = mount(
            <Provider store={store}>
                <HomePage />
            </Provider>,
        );

        // Loading spinner will be present before POST request resolves.
        expect(wrapper.find("LoadingSpinner").length).toBe(1);
    });

    it("renders a FeedbackGroupsPage for logged in users", async () => {
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
                <HomePage />
            </Provider>,
        );

        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.find("FeedbackGroupsPage").length).toBe(1);
        });
    });

    it("renders a LandingPitch and Faq for logged out users", async () => {
        const store = mockStore({
            userDetails: {
                data: {
                    username: null,
                },
                isLoading: false,
            },
        });

        const wrapper = mount(
            <Provider store={store}>
                <HomePage />
            </Provider>,
        );

        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.find("LandingPitch").length).toBe(1);
            expect(wrapper.find("Faq").length).toBe(1);
        });
    });
});
