import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import waitForExpect from "wait-for-expect";

import Routes from "./Routes";
import store from "./store";

jest.mock("axios");
jest.mock("react-redux");

// TODO: this test doesn't mock out the Redux store in order to
// interact with it. As a result, test runs have a lot of warnings
// similar to:
//      UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'then' of undefined
// Ideally this should be fixed but the tests still pass and work.
describe("Routes", () => {
    beforeEach(() => {
        axios.post.mockRestore();
    });

    it("fetches userDetails on pageload and stores the result with Redux", async () => {
        axios.post.mockResolvedValue({
            data: {
                data: {
                    userDetails: {
                        username: "username",
                        rating: 4.321,
                        notifications: 2,
                    },
                },
            },
        });

        const wrapper = mount(
            <MemoryRouter initialEntries={["/"]}>
                <Routes />
            </MemoryRouter>,
        );

        await waitForExpect(() => {
            wrapper.update();
            expect(axios.post).toHaveBeenCalled();
            expect(store.getState()).toEqual({
                userDetails: {
                    data: {
                        username: "username",
                        rating: 4.321,
                        notifications: 2,
                    },
                    isLoading: false,
                },
            });
        });
    });

    it("renders the HomePage at /", async () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/"]}>
                <Routes />
            </MemoryRouter>,
        );

        expect(wrapper.find("HomePage").length).toBe(1);
    });

    it("renders the FaqPage at /faq", async () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/faq"]}>
                <Routes />
            </MemoryRouter>,
        );

        expect(wrapper.find("FaqPage").length).toBe(1);
    });

    it("renders the TrackUrlHelpPage at /trackurlhelp", async () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/trackurlhelp"]}>
                <Routes />
            </MemoryRouter>,
        );

        expect(wrapper.find("TrackUrlHelpPage").length).toBe(1);
    });

    it("renders a FeedbackGroupsPage at /groups", async () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/groups"]}>
                <Routes />
            </MemoryRouter>,
        );

        expect(wrapper.find("FeedbackGroupsPage").length).toBe(1);
    });

    it("renders a FeedbackGroupPage at /group/:id", async () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/group/1901"]}>
                <Routes />
            </MemoryRouter>,
        );

        expect(wrapper.find("FeedbackGroupPage").length).toBe(1);
        expect(wrapper.find("FeedbackGroupPage").get(0).props.feedbackGroupId).toBe("1901");
    });

    it("renders a UserSettingsPage at /settings", async () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/settings"]}>
                <Routes />
            </MemoryRouter>,
        );

        expect(wrapper.find("UserSettingsPage").length).toBe(1);
    });
});
