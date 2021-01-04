import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import RoutesContainer from "./RoutesContainer";

jest.mock("axios");
jest.mock("react-redux");

describe("RoutesContainer", () => {
    it("renders the HomePage at /", async () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/"]}>
                <RoutesContainer />
            </MemoryRouter>,
        );

        expect(wrapper.find("HomePage").length).toBe(1);
    });

    it("renders the FaqPage at /faq", async () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/faq"]}>
                <RoutesContainer />
            </MemoryRouter>,
        );

        expect(wrapper.find("FaqPage").length).toBe(1);
    });

    it("renders the TrackUrlHelpPage at /trackurlhelp", async () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/trackurlhelp"]}>
                <RoutesContainer />
            </MemoryRouter>,
        );

        expect(wrapper.find("TrackUrlHelpPage").length).toBe(1);
    });

    it("renders a FeedbackGroupsPage at /groups", async () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/groups"]}>
                <RoutesContainer />
            </MemoryRouter>,
        );

        expect(wrapper.find("FeedbackGroupsPage").length).toBe(1);
    });

    it("renders a FeedbackGroupPage at /group/:id", async () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/group/1901"]}>
                <RoutesContainer />
            </MemoryRouter>,
        );

        expect(wrapper.find("FeedbackGroupPage").length).toBe(1);
        expect(wrapper.find("FeedbackGroupPage").get(0).props.feedbackGroupId).toBe("1901");
    });

    it("renders a UserSettingsPage at /settings", async () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/settings"]}>
                <RoutesContainer />
            </MemoryRouter>,
        );

        expect(wrapper.find("UserSettingsPage").length).toBe(1);
    });
});
