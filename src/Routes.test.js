import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Routes from "./Routes";

describe("App", () => {
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
